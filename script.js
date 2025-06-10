const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 25);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.minDistance = 10;
controls.maxDistance = 150;

// Ambient Light (dim for contrast)
scene.add(new THREE.AmbientLight(0x404040, 1));

// sun
const sunRadius = 5;
// const sunGeometry = new THREE.SphereGeometry(sunRadius, 32, 32);
// const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// scene.add(sun);
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load("./res/2k_sun.jpg");

const sunMaterial = new THREE.MeshStandardMaterial({
  map: sunTexture,
  emissive: 0xffff00,
  emissiveMap: sunTexture,
  emissiveIntensity: 1,
  metalness: 0,
  roughness: 1,
});
const sunGeometry = new THREE.SphereGeometry(sunRadius, 64, 64);

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Sun Lighting
const positionAttribute = sunGeometry.attributes.position;
const numLights = 50;
for (
  let i = 0;
  i < positionAttribute.count;
  i += Math.floor(positionAttribute.count / numLights)
) {
  const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
  const yNormalized = vertex.y / sunRadius; // normalize Y [-1, 1]

  // Skip if near the poles (top or bottom)
  if (Math.abs(yNormalized) > 0.85) continue;

  vertex.normalize().multiplyScalar(sunRadius); // move to surface

  const light = new THREE.PointLight(0xffffaa, 2, 100, 1);
  light.position.copy(vertex);
  sun.add(light);

  //   const lightHelper = new THREE.PointLightHelper(light, 1);
  //   scene.add(lightHelper);
}

// Planet data
const planets = [];
const planetData = [
  { name: "Mercury", color: 0xaaaaaa, size: 0.4, distance: 8, defaultSpeed:0.04, speed: 0.04 },
  { name: "Venus", color: 0xffcc99, size: 0.9, distance: 11, defaultSpeed:0.015, speed: 0.015 },
  { name: "Earth", color: 0x3366ff, size: 1, distance: 14, defaultSpeed:0.01, speed: 0.01 },
  { name: "Mars", color: 0xff3300, size: 0.7, distance: 17, defaultSpeed:0.008, speed: 0.008 },
  { name: "Jupiter", color: 0xff9966, size: 2.5, distance: 21, defaultSpeed:0.005, speed: 0.005 },
  { name: "Saturn", color: 0xffff99, size: 2, distance: 26, defaultSpeed:0.003, speed: 0.003 },
  { name: "Uranus", color: 0x66ffff, size: 1.5, distance: 30, defaultSpeed:0.002, speed: 0.002 },
  { name: "Neptune", color: 0x3333ff, size: 1.5, distance: 34, defaultSpeed:0.0015, speed: 0.0015 },
];

// Create planets
planetData.forEach((data) => {
  // Orbit path
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * data.distance,
        0,
        Math.sin(angle) * data.distance
      )
    );
  }
  const orbit = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  scene.add(orbit);

  // Planet mesh
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(data.size, 16, 16),
    new THREE.MeshStandardMaterial({
      color: data.color,
      metalness: -0.05,
      roughness: 1,
    })
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  planets.push({ ...data, mesh, angle: Math.random() * Math.PI * 2 });
});

// sky texture
const starTexture = new THREE.TextureLoader().load("./res/8k_stars.jpg");

const skyGeometry = new THREE.SphereGeometry(500, 64, 64); // Big sphere
const skyMaterial = new THREE.MeshBasicMaterial({
  map: starTexture,
  side: THREE.BackSide, // Render inside of sphere
});
const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skySphere);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (!isPaused) {
    planets.forEach((planet) => {
      planet.angle += planet.speed;
      planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
      planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
    });

    sun.rotation.y += 0.001; // Slow spin
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();
