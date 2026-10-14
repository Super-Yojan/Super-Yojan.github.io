/**
 * Terra hero. The glTF is the full Zorvane CAD mesh (Draco), loaded only
 * when the stage is near the viewport and the visitor did not ask for
 * reduced motion. No WebGL, or reduced motion, keeps the poster.
 */

const MODEL_URL = "/models/terra/rover.glb";

type Note = (text: string) => void;

export function mountRover(stage: HTMLElement): void {
    const noteEl = stage.querySelector<HTMLElement>("[data-note]");
    const poster = stage.querySelector<HTMLImageElement>("img");
    const note: Note = (text) => {
        if (noteEl) noteEl.textContent = text;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !canWebGL()) {
        stage.dataset.state = "still";
        note("Static plate");
        return;
    }

    stage.dataset.state = "pending";
    note("Loading model");

    const io = new IntersectionObserver(
        (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            io.disconnect();
            void start(stage, poster, note);
        },
        { rootMargin: "280px" },
    );
    io.observe(stage);
}

function canWebGL(): boolean {
    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
        return false;
    }
}

async function start(
    stage: HTMLElement,
    poster: HTMLImageElement | null,
    note: Note,
): Promise<void> {
    const canvas = document.createElement("canvas");
    canvas.tabIndex = 0;
    canvas.setAttribute("aria-label", "Terra rover. Drag to orbit, scroll to look closer.");
    stage.querySelector(".stage-media")?.append(canvas);

    try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
        const { DRACOLoader } = await import("three/addons/loaders/DRACOLoader.js");
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        const { RoomEnvironment } = await import(
            "three/addons/environments/RoomEnvironment.js"
        );

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.92;
        renderer.setClearColor(0xffffff, 1);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        scene.add(new THREE.HemisphereLight(0xffffff, 0x4a4a4a, 0.55));
        const key = new THREE.DirectionalLight(0xffffff, 3.6);
        key.position.set(8, 14, 6);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.45);
        fill.position.set(-10, 2, -6);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0xffffff, 1.6);
        rim.position.set(-4, 6, -12);
        scene.add(rim);

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 500);
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.55;
        controls.minPolarAngle = 0.25;
        controls.maxPolarAngle = Math.PI * 0.92;
        controls.listenToKeyEvents(canvas);

        const resize = () => {
            const width = stage.clientWidth;
            const height = stage.clientHeight;
            if (width === 0 || height === 0) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(stage);

        const draco = new DRACOLoader();
        draco.setDecoderPath("/draco/");
        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);

        const gltf = await loader.loadAsync(MODEL_URL);
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        box.setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const radius = Math.max(size.x, size.y, size.z) * 0.5;
        const dist = radius / Math.sin((camera.fov * Math.PI) / 360);
        camera.near = Math.max(radius / 80, 0.05);
        camera.far = dist * 12;
        camera.position.set(dist * 0.62, dist * 0.34, dist * 0.78);
        camera.updateProjectionMatrix();
        controls.target.set(0, size.y * 0.02, 0);
        controls.minDistance = radius * 0.55;
        controls.maxDistance = dist * 2.4;
        controls.update();

        let resume: number | undefined;
        const pauseSpin = () => {
            controls.autoRotate = false;
            if (resume) window.clearTimeout(resume);
        };
        const queueSpin = () => {
            if (resume) window.clearTimeout(resume);
            resume = window.setTimeout(() => {
                controls.autoRotate = true;
            }, 2800);
        };
        canvas.addEventListener("pointerdown", pauseSpin);
        canvas.addEventListener("pointerup", queueSpin);
        canvas.addEventListener("pointercancel", queueSpin);
        canvas.addEventListener("keydown", (event) => {
            if (event.key.startsWith("Arrow") || event.key === " ") {
                event.preventDefault();
                pauseSpin();
                queueSpin();
            }
        });

        let onScreen = true;
        let pageVisible = !document.hidden;
        const visible = new IntersectionObserver((entries) => {
            onScreen = entries.some((entry) => entry.isIntersecting);
        });
        visible.observe(stage);
        document.addEventListener("visibilitychange", () => {
            pageVisible = !document.hidden;
        });

        const frame = () => {
            if (onScreen && pageVisible) {
                controls.update();
                renderer.render(scene, camera);
            }
            requestAnimationFrame(frame);
        };
        renderer.render(scene, camera);
        canvas.classList.add("is-shown");
        poster?.setAttribute("aria-hidden", "true");
        stage.dataset.state = "live";
        note("Drag to orbit");
        requestAnimationFrame(frame);

        draco.dispose();
    } catch {
        canvas.remove();
        stage.dataset.state = "still";
        note("Static plate");
    }
}
