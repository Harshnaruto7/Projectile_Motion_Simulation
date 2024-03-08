
import * as THREE from 'three';

let scene, camera, renderer, projectile;
let isSimulating = false; // Control the simulation state
let elapsedTime = 0; // Time since the start of the simulation

const initialVelocity = 20;
const launchAngleDegrees = 45;
const launchAngleRadians = launchAngleDegrees * (Math.PI / 180);
const gravity = 9.81;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 30);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1200, 600);
    document.body.appendChild(renderer.domElement);

    // Projectile Geometry
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    projectile = new THREE.Mesh(geometry, material);
    projectile.position.set(0, 0, 0); // Starting position of the projectile
    scene.add(projectile);

    // Start the animation loop
    animate();

    // Event listeners for controlling the simulation
    document.addEventListener('keydown', (event) => {
        if (event.key === ' '){ // Spacebar to toggle simulation
            isSimulating = !isSimulating;
            if (isSimulating) {
                // Reset simulation if it was paused and projectile is on the ground
                if (projectile.position.y <= 0) {
                    elapsedTime = 0;
                    projectile.position.set(0, 0, 0);
                }
            }
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (isSimulating) {
        // Assuming 60 FPS for simplicity; for more accuracy, use actual elapsed time
        const deltaTime = 0.016; // Roughly 1/60th of a second
        elapsedTime += deltaTime;

        // Calculate new positions
        const x = initialVelocity * Math.cos(launchAngleRadians) * elapsedTime;
        const y = (initialVelocity * Math.sin(launchAngleRadians) * elapsedTime) - (0.5 * gravity * elapsedTime * elapsedTime);

        // Update projectile position
        projectile.position.x = x;
        if (y > 0) {
            projectile.position.y = y;
        } else {
            // Optionally, stop the simulation when the projectile hits the ground
            isSimulating = false;
            elapsedTime = 0;
            projectile.position.set(0, 0, 0);
        }
    }

    renderer.render(scene, camera);
}

init();












































