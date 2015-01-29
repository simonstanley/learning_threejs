// GUIDE 6 for three.js - Animation

// A quick note. In previous guides we have been building up code on top of itself so to focus on
// one bit at a time. We have actually touched on some quite advanced stuff, with the intention to
// learn a little about how WebGL works and thinks. Here is where we begin again(ish) and start using
// Three.js for what it was made for, simplicity! We're going to stop building shaders, materials, 
// geometries, lights etc. for ourselves because Three.js has put a lot of effort into making these
// for us, and it is this reason we are learning Three.js instead of direct WebGL! However, I hope 
// knowing a little about what each of these things actually are (under the hood) helps with future 
// progression.

// Animation, like with a lot topics in Three.js, opens up at lot of possibilities. There are lots of 
// different ways you can make something animate, it can grow, change colour, change shape, move around, 
// etc. so learning it all would take a while. In this guide we will simply cover the princple of how 
// it is possible to make something move/change on it own. And its not very hard.

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 300;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

// Use Three.js built ins.
var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshPhongMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(40, 20, 130);
scene.add(light);

// Here are the initial rendering steps, covered in guide 1.
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);

// Everthing within the *'s is the subject of this guide.
//********************************************************************************************//

// If you remember in the previous guides, we changed the rotation of the cube after we created
// it, simply so we could see more than one side, proving it was a cube and not just a square! 
// As I mentioned, there are lots of animtions you can do but to keep it simple, and focus more 
// on the theory of animation, we are going use the same code we used before (cube.rotation) but
// turn it into continous (animated) rotation.

// So, the theory of animation! Its very simple, to make something move around the screen we have
// to show a series of still images. Now, in normal situations, the browser reads the html (and
// javascript) file once, and then displays it. Importantly, it doesn't (by default) read the 
// file(s) again. For us to show a series of still images, we need the broweser to read the file(s)
// over and over, updating what it displays with each iteration. To do this we set up an infinite 
// loop called a rendering loop. Once again, Three.js has made this easy for us.

// Lets create a function called animate which describes how to change our cube with each animation 
// step (it is this function which is run each time in our infinate loop).
function animate() {
    // Increase the rotation parameters by 0.01 which each step.
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // That was easy! Now we need to do a couple of important steps. Firstly, we need to render 
    // our image. This is done the same way as before with the line...
    renderer.render(scene, camera);

    // ..then we set up our infinate loop. We do this by calling the function within itself (so 
    // everytime the function runs it calls itself at the end, creating the loop). However, for 
    // this to work properly, other stuff needs to happen which I don't know too much about, but 
    // I do know that I don't need to know because Three.js have wrapped it all up in a function 
    // called requestAnimationFrame. It is actually this function which calls our function 
    // (creating the loop) and not us. So we need to pass our function to it. This is done like 
    // so...
    requestAnimationFrame(animate);
}
// And there we have it. We just need to kick start the whole thing we an intial call to our 
// function.
animate();

//********************************************************************************************//
