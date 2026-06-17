import * as THREE from "../vendor/three/three.module.js";

const mount = document.querySelector("[data-energy-flow]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (mount && !reduceMotion) {
  /* ============================================================
   * Renderer + scene
   * ========================================================== */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x0B2F1A, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0B2F1A, 16, 46);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 120);

  /* ============================================================
   * Lighting
   * ========================================================== */
  scene.add(new THREE.AmbientLight(0xF3F8F2, 0.58));
  scene.add(new THREE.HemisphereLight(0xF3F8F2, 0x0B2F1A, 1.05));

  const sunLight = new THREE.DirectionalLight(0xD7A900, 3.0);
  sunLight.position.set(-9, 9, 4);
  scene.add(sunLight);

  const greenLight = new THREE.PointLight(0xB6D72A, 3.8, 34);
  greenLight.position.set(-2, 4, 6);
  scene.add(greenLight);

  const cyanLight = new THREE.PointLight(0x1F6B3A, 3.0, 28);
  cyanLight.position.set(6, 3, 2);
  scene.add(cyanLight);

  /* ============================================================
   * Materials
   * ========================================================== */
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1F6B3A, metalness: 0.18, roughness: 0.52, emissive: 0x123C24, emissiveIntensity: 0.44 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x123C24, metalness: 0.45, roughness: 0.28, emissive: 0x1F6B3A, emissiveIntensity: 0.5 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x1F6B3A, metalness: 0.28, roughness: 0.46, emissive: 0x123C24, emissiveIntensity: 0.28 });
  const glowGreen = 0xB6D72A;

  /* ============================================================
   * Root group (everything that orbits)
   * ========================================================== */
  const root = new THREE.Group();
  scene.add(root);

  // ground
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(22, 64),
    new THREE.MeshStandardMaterial({ color: 0x0B2F1A, roughness: 0.95, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.2;
  root.add(ground);

  const grid = new THREE.GridHelper(40, 40, 0x1F6B3A, 0x123C24);
  grid.position.y = -2.18;
  root.add(grid);

  /* ---- Stage anchors (focus targets for fly-to) ---- */
  const STAGE_KEYS = ["opwek", "opslag", "gebruik", "monitoring"];
  const stagePositions = {
    opwek: new THREE.Vector3(-6.4, 2.0, 0),
    opslag: new THREE.Vector3(-1.7, 0.2, 0),
    gebruik: new THREE.Vector3(3.0, 0.0, 0),
    monitoring: new THREE.Vector3(6.8, 1.4, 0)
  };

  // map of stageKey -> meshes that should pulse when active
  const stageMeshes = {};
  const pickable = []; // meshes hit-testable by raycaster; carry userData.stage

  const registerPick = (mesh, stage) => {
    mesh.userData.stage = stage;
    pickable.push(mesh);
  };

  /* ---- 1. SUN (opwek) ---- */
  const sunGroup = new THREE.Group();
  sunGroup.position.copy(stagePositions.opwek).add(new THREE.Vector3(0, 1.4, 0));
  const sunCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xD7A900, emissive: 0xD7A900, emissiveIntensity: 1.6, roughness: 0.4 })
  );
  sunGroup.add(sunCore);
  registerPick(sunCore, "opwek");

  // glow sprite
  const glowTex = makeGlowTexture();
  const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xD7A900, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
  sunGlow.scale.set(5.5, 5.5, 1);
  sunGroup.add(sunGlow);

  // rays
  const rays = new THREE.Group();
  for (let i = 0; i < 12; i += 1) {
    const ray = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, 1.1),
      new THREE.MeshBasicMaterial({ color: 0xD7A900, transparent: true, opacity: 0.64, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
    );
    const a = (i / 12) * Math.PI * 2;
    ray.position.set(Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0);
    ray.rotation.z = a + Math.PI / 2;
    rays.add(ray);
  }
  sunGroup.add(rays);
  root.add(sunGroup);
  stageMeshes.opwek = [sunCore];

  // solar panel array on the ground under the sun
  const panelArray = new THREE.Group();
  panelArray.position.copy(stagePositions.opwek).add(new THREE.Vector3(0, -1.4, 0));
  for (let r = 0; r < 2; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.6), panelMat.clone());
      panel.position.set(-1 + c * 1.0, 0.2 + r * 0.02, -0.5 + r * 0.75);
      panel.rotation.x = -0.5;
      panelArray.add(panel);
      registerPick(panel, "opwek");
    }
  }
  root.add(panelArray);

  /* ---- 2. BATTERY (opslag) ---- */
  const batteryGroup = new THREE.Group();
  batteryGroup.position.copy(stagePositions.opslag);
  const batteryShell = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.6, 1.1), bodyMat.clone());
  batteryGroup.add(batteryShell);
  registerPick(batteryShell, "opslag");
  // charge bars
  const chargeBars = [];
  for (let i = 0; i < 4; i += 1) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.42, 0.06),
      new THREE.MeshStandardMaterial({ color: glowGreen, emissive: glowGreen, emissiveIntensity: 0.82, roughness: 0.34 })
    );
    bar.position.set(0, -0.95 + i * 0.55, 0.57);
    batteryGroup.add(bar);
    chargeBars.push(bar);
  }
  root.add(batteryGroup);
  stageMeshes.opslag = [batteryShell, ...chargeBars];

  /* ---- 3. HOUSE (gebruik) ---- */
  const houseGroup = new THREE.Group();
  houseGroup.position.copy(stagePositions.gebruik);
  const houseBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.9, 2.0), bodyMat.clone());
  houseBody.position.y = 0.05;
  houseGroup.add(houseBody);
  registerPick(houseBody, "gebruik");
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.9, 1.2, 4),
    frameMat.clone()
  );
  roof.position.y = 1.6;
  roof.rotation.y = Math.PI / 4;
  houseGroup.add(roof);
  registerPick(roof, "gebruik");
  // windows that glow
  const windows = [];
  const winMat = () => new THREE.MeshStandardMaterial({ color: 0xD7A900, emissive: 0xD7A900, emissiveIntensity: 1.12, roughness: 0.28 });
  [[-0.6, 0.1], [0.6, 0.1], [0, -0.55]].forEach(([x, y]) => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.05), winMat());
    w.position.set(x, y, 1.02);
    houseGroup.add(w);
    windows.push(w);
  });
  root.add(houseGroup);
  stageMeshes.gebruik = [houseBody, roof, ...windows];

  /* ---- 4. MONITORING (inzicht) ---- */
  const monitorGroup = new THREE.Group();
  monitorGroup.position.copy(stagePositions.monitoring);
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.6, 12), frameMat.clone());
  stand.position.y = -0.8;
  monitorGroup.add(stand);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.2, 0.12), bodyMat.clone());
  monitorGroup.add(screen);
  registerPick(screen, "monitoring");
  // canvas-texture graph on the screen face
  const graph = makeGraphTexture();
  const screenFace = new THREE.Mesh(
    new THREE.PlaneGeometry(1.74, 1.04),
    new THREE.MeshBasicMaterial({ map: graph.texture, toneMapped: false })
  );
  screenFace.position.z = 0.07;
  monitorGroup.add(screenFace);
  registerPick(screenFace, "monitoring");
  root.add(monitorGroup);
  stageMeshes.monitoring = [screen, screenFace];

  /* ============================================================
   * Energy flow tube + particles (sun -> battery -> house -> monitor)
   * ========================================================== */
  const pathPoints = [
    new THREE.Vector3(-6.4, 1.4, 0.2),
    new THREE.Vector3(-4.0, 0.7, 0.1),
    new THREE.Vector3(-1.7, 0.4, 0),
    new THREE.Vector3(0.6, 0.1, 0),
    new THREE.Vector3(3.0, 0.4, 0.1),
    new THREE.Vector3(5.2, 1.0, 0.1),
    new THREE.Vector3(6.8, 1.4, 0.1)
  ];
  const curve = new THREE.CatmullRomCurve3(pathPoints);

  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 160, 0.045, 10, false),
    new THREE.MeshBasicMaterial({ color: glowGreen, transparent: true, opacity: 0.56 })
  );
  root.add(tube);

  const PARTICLE_COUNT = 34;
  const particleMat = new THREE.MeshBasicMaterial({ color: 0xB6D72A, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(i % 6 === 0 ? 0.1 : 0.06, 12, 12), particleMat);
    p.userData.offset = i / PARTICLE_COUNT;
    root.add(p);
    return p;
  });

  // floating ambient dust
  const dust = new THREE.Group();
  for (let i = 0; i < 80; i += 1) {
    const d = new THREE.Mesh(
      new THREE.SphereGeometry(0.015 + Math.random() * 0.02, 6, 6),
      new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0x1F6B3A : 0xF3F8F2, transparent: true, opacity: 0.15 + Math.random() * 0.3, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    d.position.set(-14 + Math.random() * 28, -1.5 + Math.random() * 10, -10 + Math.random() * 14);
    dust.add(d);
  }
  scene.add(dust);

  /* ============================================================
   * Custom orbit controller (spherical, with damping + inertia)
   * ========================================================== */
  const target = new THREE.Vector3(0, 0.3, 0);
  const sph = { radius: 17, theta: 0.5, phi: 1.15 }; // theta=azimuth, phi=polar
  const goal = { radius: 17, theta: 0.5, phi: 1.15 };
  const targetGoal = target.clone();
  const MIN_R = 7, MAX_R = 30;
  const MIN_PHI = 0.35, MAX_PHI = 1.48;

  let dragging = false;
  let lastX = 0, lastY = 0;
  let velTheta = 0, velPhi = 0;
  let idleTimer = 0;
  let userActive = false;

  const el = renderer.domElement;
  el.style.touchAction = "none";

  const markActiveInput = () => {
    userActive = true;
    idleTimer = 0;
    hideHint();
  };

  el.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    velTheta = 0;
    velPhi = 0;
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-grabbing");
    markActiveInput();
    flying = false;
  });

  el.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = (e.clientX - lastX) / el.clientWidth;
    const dy = (e.clientY - lastY) / el.clientHeight;
    lastX = e.clientX;
    lastY = e.clientY;
    velTheta = -dx * 3.4;
    velPhi = -dy * 3.0;
    goal.theta += velTheta;
    goal.phi = clamp(goal.phi + velPhi, MIN_PHI, MAX_PHI);
    markActiveInput();
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    try { el.releasePointerCapture(e.pointerId); } catch (_) {}
    el.classList.remove("is-grabbing");
  };
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);

  el.addEventListener("wheel", (e) => {
    e.preventDefault();
    goal.radius = clamp(goal.radius + e.deltaY * 0.012, MIN_R, MAX_R);
    markActiveInput();
    flying = false;
  }, { passive: false });

  // touch pinch zoom
  let pinchDist = 0;
  el.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) pinchDist = touchDist(e);
  }, { passive: true });
  el.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      const d = touchDist(e);
      if (pinchDist) {
        goal.radius = clamp(goal.radius - (d - pinchDist) * 0.03, MIN_R, MAX_R);
        markActiveInput();
        flying = false;
      }
      pinchDist = d;
    }
  }, { passive: true });

  /* ============================================================
   * Fly-to-stage + raycaster picking
   * ========================================================== */
  let flying = false;
  let activeStage = null;
  const raycaster = new THREE.Raycaster();
  const ptr = new THREE.Vector2();

  // azimuth chosen per stage so the camera frames it nicely
  const stageView = {
    opwek: { theta: 0.9, phi: 1.0, radius: 11 },
    opslag: { theta: 0.4, phi: 1.1, radius: 10 },
    gebruik: { theta: -0.2, phi: 1.05, radius: 11 },
    monitoring: { theta: -0.7, phi: 1.0, radius: 10 }
  };

  const focusStage = (stage, fromUser) => {
    if (!stageView[stage]) return;
    activeStage = stage;
    const v = stageView[stage];
    goal.theta = v.theta;
    goal.phi = v.phi;
    goal.radius = v.radius;
    targetGoal.copy(stagePositions[stage]).add(new THREE.Vector3(0, 0.4, 0));
    flying = true;
    userActive = true;
    idleTimer = 0;
    hideHint();
    updateHUD(stage);
  };

  // expose to HUD buttons
  window.__energyFocusStage = focusStage;

  let downX = 0, downY = 0;
  el.addEventListener("pointerdown", (e) => { downX = e.clientX; downY = e.clientY; });
  el.addEventListener("pointerup", (e) => {
    const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (moved > 6) return; // it was a drag, not a click
    const rect = el.getBoundingClientRect();
    ptr.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    ptr.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ptr, camera);
    const hits = raycaster.intersectObjects(pickable, false);
    if (hits.length) {
      const stage = hits[0].object.userData.stage;
      if (stage) focusStage(stage, true);
    }
  });

  /* ---- HUD wiring ---- */
  const stageButtons = Array.from(document.querySelectorAll("[data-stage]"));
  const panel = document.querySelector("[data-stage-panel]");
  const STAGE_COPY = readStageCopy();

  stageButtons.forEach((btn) => {
    btn.addEventListener("click", () => focusStage(btn.getAttribute("data-stage"), true));
  });

  function updateHUD(stage) {
    stageButtons.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-stage") === stage));
    if (panel && STAGE_COPY[stage]) {
      panel.classList.remove("is-in");
      // force reflow then animate in
      void panel.offsetWidth;
      panel.querySelector("[data-panel-eyebrow]").textContent = STAGE_COPY[stage].eyebrow;
      panel.querySelector("[data-panel-title]").textContent = STAGE_COPY[stage].title;
      panel.querySelector("[data-panel-text]").textContent = STAGE_COPY[stage].text;
      panel.classList.add("is-in");
    }
  }

  const hint = document.querySelector("[data-drag-hint]");
  let hintHidden = false;
  function hideHint() {
    if (hintHidden || !hint) return;
    hintHidden = true;
    hint.classList.add("is-hidden");
  }

  /* ============================================================
   * Resize (ResizeObserver) + visibility / in-view gating
   * ========================================================== */
  const wrap = mount.closest(".energy-canvas-wrap") || mount;
  const resize = () => {
    const w = wrap.clientWidth || window.innerWidth;
    const h = wrap.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(wrap);
  resize();

  let inView = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
    }, { threshold: 0.01 }).observe(wrap);
  }
  let pageVisible = !document.hidden;
  document.addEventListener("visibilitychange", () => { pageVisible = !document.hidden; });

  /* ============================================================
   * Animation loop
   * ========================================================== */
  let rafId = null;
  let last = performance.now();

  // start framed on the whole system
  focusStage("opwek", false);
  flying = false; // don't snap-zoom on load; let it ease from default
  goal.theta = 0.5; goal.phi = 1.12; goal.radius = 17;
  targetGoal.set(0, 0.3, 0);
  activeStage = "opwek";
  updateHUD("opwek");

  const animate = (now) => {
    rafId = requestAnimationFrame(animate);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!pageVisible || !inView) return; // pause work, keep loop cheap

    const time = now / 1000;

    // idle auto-rotate
    if (!dragging) {
      idleTimer += dt;
      if (idleTimer > 3 && !flying) {
        userActive = false;
      }
    }
    if (!userActive && !dragging && !flying) {
      goal.theta += dt * 0.12;
    }

    // inertia after drag
    if (!dragging && Math.abs(velTheta) > 0.0001) {
      goal.theta += velTheta;
      goal.phi = clamp(goal.phi + velPhi, MIN_PHI, MAX_PHI);
      velTheta *= 0.92;
      velPhi *= 0.92;
      if (Math.abs(velTheta) < 0.0002) velTheta = 0;
    }

    // damping toward goal
    sph.theta += (goal.theta - sph.theta) * Math.min(dt * 6, 1);
    sph.phi += (goal.phi - sph.phi) * Math.min(dt * 6, 1);
    sph.radius += (goal.radius - sph.radius) * Math.min(dt * 4, 1);
    target.lerp(targetGoal, Math.min(dt * 4, 1));

    if (flying && Math.abs(goal.radius - sph.radius) < 0.05 && target.distanceTo(targetGoal) < 0.05) {
      flying = false;
    }

    // position camera from spherical coords around target
    const sinPhi = Math.sin(sph.phi);
    camera.position.set(
      target.x + sph.radius * sinPhi * Math.sin(sph.theta),
      target.y + sph.radius * Math.cos(sph.phi),
      target.z + sph.radius * sinPhi * Math.cos(sph.theta)
    );
    camera.lookAt(target);

    // scene life
    sunGroup.rotation.z = time * 0.25;
    rays.children.forEach((r, i) => { r.scale.y = 1 + Math.sin(time * 2 + i) * 0.18; });
    sunGlow.material.opacity = 0.75 + Math.sin(time * 1.4) * 0.12;

    // battery charge bars cycle
    chargeBars.forEach((bar, i) => {
      const lvl = (Math.sin(time * 0.6) * 0.5 + 0.5) * 4;
      const on = i < lvl;
      bar.material.emissiveIntensity += ((on ? 0.9 : 0.12) - bar.material.emissiveIntensity) * 0.1;
    });

    // window flicker
    windows.forEach((w, i) => { w.material.emissiveIntensity = 0.7 + Math.sin(time * 3 + i * 1.7) * 0.25; });

    // monitor graph scroll
    graph.update(time);

    // pulse active stage
    STAGE_KEYS.forEach((key) => {
      const meshes = stageMeshes[key];
      if (!meshes) return;
      const isActive = key === activeStage;
      const pulse = isActive ? 0.5 + Math.sin(time * 4) * 0.25 : 0;
      meshes.forEach((m) => {
        if (!m.material || m.material.emissive === undefined) return;
        if (key === "opslag" && chargeBars.includes(m)) return; // bars animate separately
        const base = m === sunCore ? 1.75 : 0.44;
        m.material.emissiveIntensity += (base + pulse - m.material.emissiveIntensity) * 0.12;
      });
    });

    // flowing energy particles
    particles.forEach((p) => {
      const prog = (time * 0.08 + p.userData.offset) % 1;
      curve.getPoint(prog, p.position);
      const s = 0.8 + Math.sin(time * 5 + p.userData.offset * 25) * 0.2;
      p.scale.setScalar(s);
    });

    dust.rotation.y = time * 0.02;

    renderer.render(scene, camera);
  };
  rafId = requestAnimationFrame(animate);

  /* ============================================================
   * Helpers
   * ========================================================== */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function touchDist(e) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  function makeGlowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(215,169,0,0.9)");
    g.addColorStop(0.4, "rgba(182,215,42,0.4)");
    g.addColorStop(1, "rgba(182,215,42,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }

  function makeGraphTexture() {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 150;
    const ctx = c.getContext("2d");
    const texture = new THREE.CanvasTexture(c);
    const update = (time) => {
      ctx.fillStyle = "#0B2F1A";
      ctx.fillRect(0, 0, 256, 150);
      // grid
      ctx.strokeStyle = "rgba(182,215,42,0.14)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= 256; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 150); ctx.stroke(); }
      for (let y = 0; y <= 150; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke(); }
      // line
      ctx.strokeStyle = "#B6D72A";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x <= 256; x += 4) {
        const y = 75 + Math.sin(x * 0.05 + time * 2) * 30 + Math.sin(x * 0.13 + time) * 12;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // glowing dot
      const dotY = 75 + Math.sin(256 * 0.05 + time * 2) * 30 + Math.sin(256 * 0.13 + time) * 12;
      ctx.fillStyle = "#B6D72A";
      ctx.beginPath(); ctx.arc(252, dotY, 4, 0, Math.PI * 2); ctx.fill();
      texture.needsUpdate = true;
    };
    update(0);
    return { texture, update };
  }

  function readStageCopy() {
    const copy = {};
    document.querySelectorAll("[data-stage-copy]").forEach((node) => {
      copy[node.getAttribute("data-stage-copy")] = {
        eyebrow: node.getAttribute("data-eyebrow") || "",
        title: node.getAttribute("data-title") || "",
        text: node.textContent.trim()
      };
    });
    return copy;
  }
}
