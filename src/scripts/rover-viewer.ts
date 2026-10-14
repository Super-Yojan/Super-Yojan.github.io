/**
 * Hero model. The glTF is loaded only when the stage is near the viewport
 * and the visitor did not ask for reduced motion. No WebGL, or reduced
 * motion, keeps the poster. The URL comes from data-model on the stage.
 */

type Note = (text: string) => void;

export function mountModel(stage: HTMLElement): void {
    const modelUrl = stage.dataset.model;
    if (!modelUrl) return;

    const noteEl = stage.querySelector<HTMLElement>("[data-note]");
    const poster = stage.querySelector<HTMLImageElement>("img");
    const label = stage.dataset.modelLabel ?? "Model";
    const note: Note = (text) => {
        if (noteEl) noteEl.textContent = text;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !canWebGL()) {
        stage.dataset.state = "still";
        note("");
        return;
    }

    stage.dataset.state = "pending";
    note("");

    const io = new IntersectionObserver(
        (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            io.disconnect();
            void start(stage, poster, note, modelUrl, label);
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
    modelUrl: string,
    label: string,
): Promise<void> {
    const canvas = document.createElement("canvas");
    canvas.tabIndex = 0;
    canvas.setAttribute(
        "aria-label",
        `${label}. Drag to orbit, scroll to look closer.`,
    );
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
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.92;
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        scene.background = null;

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

        const media = stage.querySelector(".stage-media") ?? stage;
        let frameCamera = () => {};
        const resize = () => {
            const width = media.clientWidth;
            const height = media.clientHeight;
            if (width === 0 || height === 0) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
            frameCamera();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(media);

        const draco = new DRACOLoader();
        draco.setDecoderPath("/draco/");
        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);

        const gltf = await loader.loadAsync(modelUrl);
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        box.setFromObject(model);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const radius = sphere.radius;
        const viewDir = new THREE.Vector3(0.62, 0.28, 0.78).normalize();
        frameCamera = () => {
            const vFov = (camera.fov * Math.PI) / 180;
            const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
            const dist = (radius / Math.sin(Math.min(vFov, hFov) / 2)) * 1.22;
            camera.near = Math.max(radius / 80, 0.05);
            camera.far = dist * 12;
            camera.position.copy(viewDir).multiplyScalar(dist);
            camera.updateProjectionMatrix();
            controls.target.set(0, 0, 0);
            controls.minDistance = radius * 0.55;
            controls.maxDistance = dist * 2.4;
            controls.update();
        };
        frameCamera();

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
        if (poster) poster.style.visibility = "hidden";
        stage.dataset.state = "live";
        note("Drag to orbit");
        requestAnimationFrame(frame);

        draco.dispose();
    } catch {
        canvas.remove();
        stage.dataset.state = "still";
        note("");
    }
}
