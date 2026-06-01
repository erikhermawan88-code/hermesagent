# Three.js 3D Roti Bakar — Implementation Notes

## CDN
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```
r128 is stable and widely cached. No build step needed.

## Scene Setup Pattern
```javascript
const canvas = document.getElementById('roti-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
camera.position.set(0, 0.5, 4);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
```

## Materials
- Bread: `MeshStandardMaterial` color `#d4a056`, roughness 0.85
- Chocolate: color `#4a2c0a`, roughness 0.7
- Cheese: color `#ffaa00`, emissive 0.05 for glow
- Grill marks: small dark boxes on bottom bread

## Lighting
- AmbientLight 0.5
- Key light: DirectionalLight white 1.2, position (3,5,3)
- Fill light: DirectionalLight tint `#99eedd` 0.4, position (-3,2,-2)
- Rim light: DirectionalLight tint `#ffcc88` 0.3, position (0,-2,-4)

## Mouse Drag Rotation
```javascript
let isDragging = false, rotY = 0, rotX = 0.1, autoRotate = true;
canvas.addEventListener('mousedown', (e) => { isDragging = true; autoRotate = false; });
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  rotY += (e.clientX - prevMouseX) * 0.008;
  rotX += (e.clientY - prevMouseY) * 0.005;
  prevMouseX = e.clientX; prevMouseY = e.clientY;
});
window.addEventListener('mouseup', () => { isDragging = false; setTimeout(() => { autoRotate = true; }, 3000); });
```

## Scroll Zoom
```javascript
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  camera.position.z = Math.max(2.5, Math.min(7, camera.position.z + e.deltaY * 0.005));
}, { passive: false });
```

## Touch Support
Same pattern as mouse but with `e.touches[0].clientX/Y`.

## Auto-rotate and Bob
```javascript
function animate() {
  requestAnimationFrame(animate);
  if (autoRotate) rotY += 0.004;
  rotiGroup.rotation.y = rotY;
  rotiGroup.rotation.x = rotX;
  rotiGroup.position.y = Math.sin(t * 0.8) * 0.06; // gentle bob
  renderer.render(scene, camera);
}
```

## Resize Handler
```javascript
window.addEventListener('resize', () => {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
```

## Sparkle Particles
Float 40 small dots upward, reset when above threshold. Rotate slowly for ambience.

## Pitfalls
- Always use `alpha: true` in WebGLRenderer for transparent background
- Clamp `camera.position.z` to prevent clipping or zooming too far
- Grayscale images render better than colored for roti product shots
- `devicePixelRatio` capped at 2 for performance on retina displays
