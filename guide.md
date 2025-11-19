This is a very "interactive" portfolio that relies heavily on Client-Side Rendering (JavaScript) to switch tabs and animate the Three.js background.

To make this a **Hugo Theme**, we need to separate the **Data** (your projects, text, links) from the **Logic** (the JS and HTML structure). This allows you to update your portfolio by simply editing a YAML file in Emacs, rather than digging through raw HTML/JS.

Here is the complete file structure and code to turn that HTML file into a working Hugo site.

### 1\. File Structure

Create these files in your Hugo root directory.

```text
.
├── config.toml              <-- Site configuration
├── data
│   └── portfolio.yaml       <-- ALL your projects and content live here
├── layouts
│   ├── index.html           <-- The main homepage structure
│   └── partials
│       ├── head.html        <-- CSS and Meta tags
│       ├── script.html      <-- The Three.js and Logic
│       ├── header.html      <-- Navbar
│       └── footer.html      <-- Footer
```

-----

### 2\. Data Layer (`data/portfolio.yaml`)

*Copy this into `data/portfolio.yaml`. This is now your "Database" that you can edit in Emacs.*

```yaml
hero:
  status: "System Online"
  first_name: "Yojan"
  last_name: "Gautam"
  description: "Computer Engineer. Producer. Athlete.<br/>Synthesizing <span class='text-blue-400 font-semibold'>Embedded Systems</span>, <span class='text-purple-400 font-semibold'>AI</span>, and <span class='text-yellow-500 font-semibold'>Creative Logic</span> to maximize potential."
  button_text: "View Projects"
  github_url: "https://github.com/Super-Yojan"

pillars:
  - title: "The Engineer"
    icon_type: "engineer" # Used to map SVG in logic
    desc: "IoT sensor engineering and autonomous systems. Building the logic that drives machines using Rust, C++, and ROS."
    tags: ["Rust", "Embedded"]
    color_class: "blue"
  - title: "The Artist"
    icon_type: "artist"
    desc: "Finding the rhythm in chaos. Producing beats and lyrics that bridge cultural heritage with futuristic soundscapes."
    tags: ["Logic Pro", "Flow"]
    color_class: "purple"
  - title: "The Athlete"
    icon_type: "athlete"
    desc: "The body is the hardware. Rigorous discipline, hypertrophy training, and nutritional data analysis to maximize output."
    tags: ["Hypertrophy", "Data"]
    color_class: "yellow"

# This structure feeds the JavaScript automatically
projects:
  engineer:
    - title: "Databuoy Embedded Systems"
      role: "IoT Engineering Intern"
      desc: "Engineered fail-safe bootloader logic (U-boot) for network/SD card failover. Architected a full-stack web relay system."
      tags: ["Rust", "Go", "React", "U-boot"]
      color: "blue"
    - title: "Drone Tracking Infrastructure"
      role: "Databuoy"
      desc: "Built custom drone hardware and developed proprietary data labeling tools."
      tags: ["Hardware", "Data Ops", "Embedded"]
      color: "blue"
  artist:
    - title: "Neon Horizon EP"
      role: "Producer"
      desc: "5-track instrumental hip-hop EP fusing traditional Nepali samples with modern trap percussion."
      tags: ["Logic Pro", "Production"]
      color: "purple"
  athlete:
    - title: "Hypertrophy Data Analysis"
      role: "Analyst"
      desc: "A Python script that analyzes 3 years of workout logs to optimize volume."
      tags: ["Data Viz", "Fitness", "Python"]
      color: "yellow"
```

-----

### 3\. Configuration (`config.toml`)

```toml
baseURL = 'http://example.org/'
languageCode = 'en-us'
title = 'Yojan Gautam - Portfolio'
theme = [] 
```

-----

### 4\. The Template Layouts

#### `layouts/partials/head.html`

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ .Site.Title }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        * { scroll-behavior: smooth; }
        .selection\:bg-purple-500\/30::selection { background-color: rgba(168, 85, 247, 0.3); }
    </style>
</head>
```

#### `layouts/partials/header.html`

```html
<nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-300 bg-transparent">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer group" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-300 via-purple-300 to-yellow-200 flex items-center justify-center text-slate-900 shadow-lg group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="flex flex-col leading-none">
                <span id="logo-text" class="text-lg font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r">HUMAN</span>
                <span id="logo-subtext" class="text-xs tracking-widest uppercase">Augmentation</span>
            </div>
        </div>
        
        <div class="flex items-center gap-6">
            <div id="nav-links" class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#pillars" class="transition-colors">Pillars</a>
                <a href="#work" class="transition-colors">Projects</a>
                <a href="#contact" id="nav-connect" class="px-5 py-2 rounded-full border transition-all">Connect</a>
            </div>
            
            <button id="theme-toggle" class="p-2 rounded-full border transition-all duration-300 flex items-center justify-center group" aria-label="Toggle Theme">
                <svg id="sun-icon" class="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display: none;">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <svg id="moon-icon" class="w-4 h-4 group-hover:-rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </button>
        </div>
    </div>
</nav>
```

#### `layouts/index.html` (The Main Structure)

```html
<!DOCTYPE html>
<html lang="en">
{{ partial "head.html" . }}
<body class="font-sans">
    <div id="app" class="min-h-screen selection:bg-purple-500/30 transition-colors duration-500 relative overflow-x-hidden">
        
        <div id="canvas-container" class="fixed inset-0 z-0 h-screen w-full opacity-60 pointer-events-none"></div>

        <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
            <div id="glow-1" class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] animate-pulse transition-colors duration-500"></div>
            <div id="glow-2" class="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full blur-[100px] transition-colors duration-500"></div>
            <div id="glow-3" class="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-colors duration-500"></div>
        </div>

        {{ partial "header.html" . }}

        {{ $data := .Site.Data.portfolio }}

        <header class="relative z-10 pt-44 pb-24 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
            <div id="status-pill" class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 backdrop-blur-sm transition-colors duration-500">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span id="status-text" class="text-xs uppercase tracking-widest font-semibold">{{ $data.hero.status }}</span>
            </div>
            
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                <span id="hero-name-1" class="block transition-colors duration-500">{{ $data.hero.first_name }}</span>
                <span id="hero-name-2" class="block transition-colors duration-500">{{ $data.hero.last_name }}</span>
            </h1>
            
            <p id="hero-desc" class="max-w-2xl text-lg md:text-xl leading-relaxed mb-12 transition-colors duration-500">
                {{ $data.hero.description | safeHTML }}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button onclick="document.getElementById('work').scrollIntoView({behavior: 'smooth'})" class="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
                    {{ $data.hero.button_text }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <a href="{{ $data.hero.github_url }}" target="_blank" id="github-btn" class="px-8 py-4 rounded-xl border transition-colors flex items-center justify-center gap-2 font-medium">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub Profile
                </a>
            </div>
        </header>

        <section id="pillars" class="relative z-10 py-24 px-6 backdrop-blur-sm border-y transition-colors duration-500">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <h2 id="pillars-heading" class="text-3xl md:text-4xl font-bold mb-4">The Three Pillars</h2>
                    <p id="pillars-desc">The intersection of disciplines where innovation happens.</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    {{ range $data.pillars }}
                    <div id="{{ .icon_type }}-card" class="group relative p-8 rounded-3xl bg-gradient-to-b border transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-{{ .color_class }}-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div class="relative z-10">
                            <div id="{{ .icon_type }}-icon" class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                                <span class="font-bold text-xl uppercase">{{ substr .title 4 1 }}</span>
                            </div>
                            <h3 id="{{ .icon_type }}-title" class="text-2xl font-bold mb-3">{{ .title }}</h3>
                            <p id="{{ .icon_type }}-desc" class="leading-relaxed text-sm">{{ .desc }}</p>
                            <div class="mt-8 flex flex-wrap gap-2">
                                {{ range .tags }}
                                <span id="{{ $.icon_type }}-tag" class="text-xs font-medium px-2.5 py-1 rounded-md border">{{ . }}</span>
                                {{ end }}
                            </div>
                        </div>
                    </div>
                    {{ end }}
                </div>
            </div>
        </section>

        <section id="work" class="relative z-10 py-24 px-6 max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 id="work-heading" class="text-4xl font-bold mb-2">Selected Works</h2>
                    <p id="work-desc">A curation of code, composition, and conditioning.</p>
                </div>
                
                <div id="tab-switcher" class="p-1.5 rounded-xl border inline-flex transition-colors duration-500">
                    <button onclick="switchTab('engineer')" id="tab-engineer" class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-blue-500/20 text-blue-400 shadow-sm ring-1 ring-blue-500/20">Engineering</button>
                    <button onclick="switchTab('artist')" id="tab-artist" class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all">Artistry</button>
                    <button onclick="switchTab('athlete')" id="tab-athlete" class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all">Athletics</button>
                </div>
            </div>

            <div id="project-grid" class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"></div>
        </section>

        {{ partial "footer.html" . }}
    </div>

    {{ partial "script.html" . }}
</body>
</html>
```

#### `layouts/partials/script.html` (The Logic)

**Critical:** This is where we inject the Hugo Data into the JS variable.

```html
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
<script>
    // INJECT HUGO DATA HERE
    // We take the YAML data and turn it into a JSON object for the JS to use
    const projects = {{ .Site.Data.portfolio.projects | jsonify }};

    // State
    let isDark = true;
    let activeTab = 'engineer';

    // Initialize theme from localStorage
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('theme');
        isDark = saved ? saved === 'dark' : true;
    }

    // Apply theme on load
    function applyTheme() {
        const app = document.getElementById('app');
        const navbar = document.getElementById('navbar');
        
        if (isDark) {
            app.className = app.className.replace(/bg-slate-\d+/g, '').replace(/text-slate-\d+/g, '') + ' bg-slate-900 text-slate-200';
            document.getElementById('glow-1').className = document.getElementById('glow-1').className.replace(/bg-blue-\d+\/\d+/g, '') + ' bg-blue-500/5';
            document.getElementById('glow-2').className = document.getElementById('glow-2').className.replace(/bg-purple-\d+\/\d+/g, '') + ' bg-purple-500/5';
            document.getElementById('glow-3').className = document.getElementById('glow-3').className.replace(/bg-yellow-\d+\/\d+/g, '') + ' bg-yellow-200/2';
            
            document.getElementById('logo-text').className = 'text-lg font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-white';
            document.getElementById('logo-subtext').className = 'text-xs tracking-widest uppercase text-slate-400';
            
            document.getElementById('nav-links').className = 'hidden md:flex items-center gap-8 text-sm font-medium text-slate-400';
            document.getElementById('nav-connect').className = 'px-5 py-2 rounded-full border transition-all bg-white/5 border-white/10 hover:bg-slate-500/10';
            
            document.getElementById('theme-toggle').className = 'p-2 rounded-full border transition-all duration-300 flex items-center justify-center group bg-slate-800 border-slate-700 text-yellow-300 hover:border-yellow-300/50';
            document.getElementById('sun-icon').style.display = 'block';
            document.getElementById('moon-icon').style.display = 'none';
            
            document.getElementById('status-pill').className = 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 backdrop-blur-sm transition-colors duration-500 bg-white/5 border-white/10';
            document.getElementById('status-text').className = 'text-xs uppercase tracking-widest font-semibold text-slate-400';
            
            document.getElementById('hero-name-1').className = 'block transition-colors duration-500 text-slate-100';
            document.getElementById('hero-name-2').className = 'block transition-colors duration-500 text-slate-100';
            document.getElementById('hero-desc').className = 'max-w-2xl text-lg md:text-xl leading-relaxed mb-12 transition-colors duration-500 text-slate-400';
            
            document.getElementById('github-btn').className = 'px-8 py-4 rounded-xl border transition-colors flex items-center justify-center gap-2 font-medium bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500';
            
            document.getElementById('pillars').className = 'relative z-10 py-24 px-6 backdrop-blur-sm border-y transition-colors duration-500 bg-slate-800/30 border-white/5';
            document.getElementById('pillars-heading').className = 'text-3xl md:text-4xl font-bold mb-4 text-slate-100';
            document.getElementById('pillars-desc').className = 'text-slate-400';
            
            // Dynamic Pillar Styling
            document.querySelectorAll('[id$="-card"]').forEach(el => {
                el.className = el.className.replace(/from-white/g, 'from-slate-800').replace(/to-slate-50/g, 'to-slate-900').replace(/border-slate-200/g, 'border-white/5');
            });
            document.querySelectorAll('[id$="-title"]').forEach(el => el.className = 'text-2xl font-bold mb-3 text-slate-100');
            document.querySelectorAll('[id$="-desc"]').forEach(el => el.className = 'leading-relaxed text-sm text-slate-400');

            document.getElementById('work-heading').className = 'text-4xl font-bold mb-2 text-slate-100';
            document.getElementById('work-desc').className = 'text-slate-400';
            document.getElementById('tab-switcher').className = 'p-1.5 rounded-xl border inline-flex transition-colors duration-500 bg-slate-900 border-white/10';
            
            document.getElementById('contact').className = 'relative z-10 border-t pt-24 pb-12 px-6 transition-colors duration-500 bg-slate-900 border-white/5';
            document.getElementById('footer-heading').className = 'text-4xl md:text-5xl font-black mb-8 tracking-tight text-slate-100';
            document.getElementById('footer-desc').className = 'text-lg mb-12 max-w-xl mx-auto leading-relaxed text-slate-400';
            document.getElementById('contact-btn').className = 'inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl mb-16 bg-white text-slate-950 hover:bg-slate-200';
            document.getElementById('footer-copy').className = 'text-sm font-medium text-slate-400';
            document.getElementById('social-github').className = 'transition-colors transform hover:-translate-y-1 text-slate-400 hover:text-blue-500';
            document.getElementById('social-linkedin').className = 'transition-colors transform hover:-translate-y-1 text-slate-400 hover:text-blue-600';
            document.getElementById('social-instagram').className = 'transition-colors transform hover:-translate-y-1 text-slate-400 hover:text-purple-500';
        } else {
            app.className = app.className.replace(/bg-slate-\d+/g, '').replace(/text-slate-\d+/g, '') + ' bg-slate-50 text-slate-800';
            document.getElementById('glow-1').className = document.getElementById('glow-1').className.replace(/bg-blue-\d+\/\d+/g, '') + ' bg-blue-400/10';
            document.getElementById('glow-2').className = document.getElementById('glow-2').className.replace(/bg-purple-\d+\/\d+/g, '') + ' bg-purple-400/10';
            document.getElementById('glow-3').className = document.getElementById('glow-3').className.replace(/bg-yellow-\d+\/\d+/g, '') + ' bg-yellow-400/5';
            
            document.getElementById('logo-text').className = 'text-lg font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-slate-800';
            document.getElementById('logo-subtext').className = 'text-xs tracking-widest uppercase text-slate-500';
            
            document.getElementById('nav-links').className = 'hidden md:flex items-center gap-8 text-sm font-medium text-slate-500';
            document.getElementById('nav-connect').className = 'px-5 py-2 rounded-full border transition-all bg-slate-100 border-slate-200 hover:bg-slate-500/10';
            
            document.getElementById('theme-toggle').className = 'p-2 rounded-full border transition-all duration-300 flex items-center justify-center group bg-white border-slate-200 text-slate-600 hover:border-blue-400/50';
            document.getElementById('sun-icon').style.display = 'none';
            document.getElementById('moon-icon').style.display = 'block';
            
            document.getElementById('status-pill').className = 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 backdrop-blur-sm transition-colors duration-500 bg-slate-100 border-slate-200';
            document.getElementById('status-text').className = 'text-xs uppercase tracking-widest font-semibold text-slate-500';
            
            document.getElementById('hero-name-1').className = 'block transition-colors duration-500 text-slate-900';
            document.getElementById('hero-name-2').className = 'block transition-colors duration-500 text-slate-900';
            document.getElementById('hero-desc').className = 'max-w-2xl text-lg md:text-xl leading-relaxed mb-12 transition-colors duration-500 text-slate-500';
            
            document.getElementById('github-btn').className = 'px-8 py-4 rounded-xl border transition-colors flex items-center justify-center gap-2 font-medium bg-white border-slate-300 text-slate-700 hover:bg-slate-50';
            
            document.getElementById('pillars').className = 'relative z-10 py-24 px-6 backdrop-blur-sm border-y transition-colors duration-500 bg-slate-100/50 border-slate-200';
            document.getElementById('pillars-heading').className = 'text-3xl md:text-4xl font-bold mb-4 text-slate-900';
            document.getElementById('pillars-desc').className = 'text-slate-500';
            
            document.querySelectorAll('[id$="-card"]').forEach(el => {
                el.className = el.className.replace(/from-slate-800/g, 'from-white').replace(/to-slate-900/g, 'to-slate-50').replace(/border-white\/5/g, 'border-slate-200');
            });
            document.querySelectorAll('[id$="-title"]').forEach(el => el.className = 'text-2xl font-bold mb-3 text-slate-900');
            document.querySelectorAll('[id$="-desc"]').forEach(el => el.className = 'leading-relaxed text-sm text-slate-500');

            document.getElementById('work-heading').className = 'text-4xl font-bold mb-2 text-slate-900';
            document.getElementById('work-desc').className = 'text-slate-500';
            document.getElementById('tab-switcher').className = 'p-1.5 rounded-xl border inline-flex transition-colors duration-500 bg-slate-100 border-slate-200';
            
            document.getElementById('contact').className = 'relative z-10 border-t pt-24 pb-12 px-6 transition-colors duration-500 bg-slate-100 border-slate-200';
            document.getElementById('footer-heading').className = 'text-4xl md:text-5xl font-black mb-8 tracking-tight text-slate-900';
            document.getElementById('footer-desc').className = 'text-lg mb-12 max-w-xl mx-auto leading-relaxed text-slate-500';
            document.getElementById('contact-btn').className = 'inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl mb-16 bg-slate-900 text-white hover:bg-slate-700';
            document.getElementById('footer-copy').className = 'text-sm font-medium text-slate-500';
            document.getElementById('social-github').className = 'transition-colors transform hover:-translate-y-1 text-slate-500 hover:text-blue-500';
            document.getElementById('social-linkedin').className = 'transition-colors transform hover:-translate-y-1 text-slate-500 hover:text-blue-600';
            document.getElementById('social-instagram').className = 'transition-colors transform hover:-translate-y-1 text-slate-500 hover:text-purple-500';
        }
        
        // Update particle sphere color
        if (window.particleMaterial) {
            window.particleMaterial.color.setHex(isDark ? 0xa3d5ff : 0x0369a1);
        }
    }

    // Toggle theme
    function toggleTheme() {
        isDark = !isDark;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        applyTheme();
        renderProjects();
    }

    // Switch tabs
    function switchTab(tab) {
        activeTab = tab;
        
        // Update tab buttons
        const tabs = ['engineer', 'artist', 'athlete'];
        tabs.forEach(t => {
            const btn = document.getElementById('tab-' + t);
            if (t === tab) {
                if (t === 'engineer') {
                    btn.className = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-blue-500/20 text-blue-400 shadow-sm ring-1 ring-blue-500/20';
                } else if (t === 'artist') {
                    btn.className = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-purple-500/20 text-purple-400 shadow-sm ring-1 ring-purple-500/20';
                } else {
                    btn.className = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-yellow-500/20 text-yellow-500 shadow-sm ring-1 ring-yellow-500/20';
                }
            } else {
                btn.className = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-all ' + (isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-slate-900');
            }
        });
        
        renderProjects();
    }

    // Render projects
    function renderProjects() {
        const grid = document.getElementById('project-grid');
        const items = projects[activeTab];
        
        grid.innerHTML = items.map((item, idx) => `
            <div class="rounded-2xl p-6 border transition-all group cursor-pointer backdrop-blur-sm flex flex-col h-full ${isDark ? 'bg-slate-800/50 border-white/5 hover:bg-slate-700/50' : 'bg-white border-slate-200 shadow-sm hover:bg-slate-50 hover:shadow-md'}">
                <div class="h-1.5 w-16 rounded-full mb-6 bg-gradient-to-r ${item.color === 'blue' ? 'from-blue-400 to-cyan-300' : item.color === 'purple' ? 'from-purple-400 to-pink-300' : 'from-yellow-400 to-orange-300'}"></div>
                
                <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-3">
                        <div class="p-2 rounded-lg ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-700'}">
                            ${getIcon(idx, activeTab)}
                        </div>
                        <h3 class="text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}">
                            ${item.title}
                        </h3>
                    </div>
                    <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-slate-400' : 'text-slate-500'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </div>
                
                <span class="text-xs font-bold uppercase tracking-wider mb-4 block ${item.color === 'blue' ? 'text-blue-400' : item.color === 'purple' ? 'text-purple-400' : 'text-yellow-500'}">
                    ${item.role}
                </span>

                <p class="${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm mb-8 leading-relaxed flex-grow">
                    ${item.desc}
                </p>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-6 border-t border-dashed border-white/10">
                    ${item.tags.map(tag => `
                        <span class="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-md border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'}">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Get icon SVG - Simplified for example
    function getIcon(idx, tab) {
         // (Paste the SVG array logic from your original HTML here. 
         // To save space I am abbreviating, but you can copy the exact getIcon function)
         return '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>';
    }

    // Scroll handler for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.className = 'fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b ' + (isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-slate-200');
        } else {
            navbar.className = 'fixed top-0 w-full z-50 transition-all duration-300 bg-transparent';
        }
    });

    // Three.js Scene Setup (EXACTLY AS PROVIDED IN YOUR SOURCE)
    function initThreeJS() {
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const count = 5000;
        const radius = 1.5;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = Math.cbrt(Math.random()) * radius;
            
            const sinPhi = Math.sin(phi);
            const x = r * sinPhi * Math.cos(theta);
            const y = r * sinPhi * Math.sin(theta);
            const z = r * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: isDark ? 0xa3d5ff : 0x0369a1,
            size: 0.005,
            transparent: true,
            depthWrite: false
        });
        
        window.particleMaterial = material;

        const points = new THREE.Points(geometry, material);
        points.rotation.set(0, 0, Math.PI / 4);
        scene.add(points);

        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            points.rotation.x -= 0.001;
            points.rotation.y -= 0.00067;
            points.position.y = Math.sin(time * 0.5) * 0.1;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    function initialize() {
        applyTheme();
        renderProjects();
        if (typeof THREE !== 'undefined') {
            initThreeJS();
        } else {
            setTimeout(() => {
                if (typeof THREE !== 'undefined') initThreeJS();
            }, 100);
        }
    }
    window.addEventListener('load', initialize);
</script>
```