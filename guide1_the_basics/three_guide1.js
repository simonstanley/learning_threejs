// GUIDE 1 for three.js - The basics

// Before we make our 3D object we have to set up a few things, we need:
// -A scene     - A space in which to put our object.
// -A camera    - With which to see the scene (and hence our object)
// -A renderer  - This is the clever thing that turns the numbers (the maths and coordinates that 
//                you give the computer) into the final image.
// -A container - A html container (div) in which to place the rendered images for the brower to
//                show.

// Let's look at how each of these are set up.

// THE SCENE 
// This is simple to initialize. From here, anything we make is added to the scene
var scene = new THREE.Scene();


// THE CAMERA 
// This takes 4 arguments:
// -fov    - Camera frustum vertical field of view, from bottom to top of view, in degrees.
// -aspect - Camera frustum aspect ratio, window width divided by window height.
// -near   - Camera frustum near plane.
// -far    - Camera frustum far plane.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
// The camera requires a couple of extra steps to set up properly. 
// Firstly we need to add it to the scene.
scene.add(camera);
// Secondly, when the camera is added to the scene it is placed in the position (0, 0, 0). This is 
// also where any objects are placed (by default), so we should move the camera back.
camera.position.z = 300;


// THE RENDERER. 
// This now is not used until the end, once we have our object(s) and scene in place.
var renderer = new THREE.WebGLRenderer();


// THE CONTAINER.
// Again this is simple, (this is using jquery), but there must be a div with id='container'
// in the html for this to see.
var $container = $('#container');


// For now we won't make any objects, and just show the blank scene.
// The final steps for any project (as stated) is to render everything, this requires three steps:
// The renderer needs to know the window dimensions.
renderer.setSize(window.innerWidth, window.innerHeight);
// It is then added to the html container (as a DOM element)
$container.append(renderer.domElement);
// Finally, call the renderer to render! It needs the scene and the camera to do this.
renderer.render(scene, camera);



