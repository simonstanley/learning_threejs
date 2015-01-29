// GUIDE 7 for three.js - Exploration

// The conceptional world in Three.js is very good, we have a scene (a 3D space) into which we can 
// put (scene.add) things. As we've seen, we've added a camera, a cube and a light. We've also
// touched upon the idea that we put these things into a position within the scene (using xyz 
// coordinates). In guide 6 we showed that we can change the cube's rotation continuously to create
// animation, well it would have been just as easy to change its position to make it move around.
// Three.js allows us to think of the camera as just another "thing" in the scene, and just like 
// with the cube, we can move the camera round and hence explore the scene! The major difference 
// is that we want to have control, and this is what we'll be learning here.

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 300;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshPhongMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(40, 20, 130);
scene.add(light);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Everthing within the *'s is the subject of this guide.
//********************************************************************************************//



//********************************************************************************************//
