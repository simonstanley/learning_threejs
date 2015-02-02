// GUIDE 7 for three.js - Beautify and explore

// In guide 6 we moved towards using Three.js built-ins to make our life easier (what Three.js is
// designed for). This guide focuses on the type of stuff you can do with the built-ins to make
// our scene more interesting and beautiful! There is no one focus here, we will look at building
// a basic world which we can move around.

// Initialisations are the same.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 250;
camera.position.y = 100;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

// Here's a new feature, we can set the background colour like so...
renderer.setClearColor(0x3BB9FF, 1);
// I chose a nice sky blue!

// // We are going to build our own land. First thing we need is a floor. Three.js has a built-in
// // geometry for a plane where we specify the x and y lengths.
// var plane_geometry = new THREE.PlaneGeometry(300, 300);
// // We will use a basic material, colour it green (like grass) and set it visable from both sides
// // (so its not like the default one way mirror).
//
// var plane_material = new THREE.MeshBasicMaterial( {color: 0x88BB22, side: THREE.DoubleSide} );
// var plane = new THREE.Mesh(plane_geometry, plane_material);
// // As mentioned, we set xy lengths meaning the default is a vertical plane. So we should rotate
// // it 90 degrees so its flat.
// plane.rotation.x = -Math.PI / 2;
// // Here's another new feature, we are going to cast shadows. For this there are two properties we
// // need to know about, receiveShadow and castShadow. receiveShadow tells an object (our grass
// // plane in this case) whether to draw shadows on itself and castShadow tells an object whether
// // to cast a shadow (which must be cast onto an object with receiveShadow set to true to be seen).
// // At this point we only need the plane to receiveShadows. You'll see more shadow stuff below.
// plane.receiveShadow = true;
// scene.add(plane);
//
// // Add another plane underneath to cause shadow on top plane
// var plane_geometry2 = new THREE.PlaneGeometry(300, 300);
// var plane_material2 = new THREE.MeshBasicMaterial( {color: 0x663300, side: THREE.DoubleSide} );
// var plane2 = new THREE.Mesh(plane_geometry2, plane_material2);
// plane2.rotation.x = -Math.PI / 2;
// plane2.position.y = -0.1
// plane2.castShadow = true;
// scene.add(plane2);

var ground_geometry = new THREE.BoxGeometry(300, 6, 300);
var ground_material = new THREE.MeshPhongMaterial({color: 0x88BB22, side: THREE.DoubleSide});
var ground = new THREE.Mesh(ground_geometry, ground_material);
ground.receiveShadow = true;
scene.add(ground);

// Lets put some objects on our plane (grass!).
// Lets say we want 5 cubes. They all need a unique size, position and colour.
// The positions need to be within the plane which is 300x300 centred on (0,0,0) (and horizontal).
// We want them all to sit on top of our plane so they each must be raised from their default
// 0 position in the y axis by half their height. The x and z can be random, so let's choose those.
var cube_xz = [[-90,100], [120,-10], [0,0], [80,70], [-30,-110]];
// Next the sizes. For simplicity we will stick to cubes, meaning height, width and length are equal.
var cube_size = [10,15,6,19,14];
// And finally colours.
var cube_colour = [new THREE.Color(0x0000FF), new THREE.Color(0xEEB2F2), new THREE.Color(0xF00282),
                   new THREE.Color(0xFFFF00), new THREE.Color(0xFFFFF8)];

// Now lets build each cube.
for (i = 0; i < 5; i++) {
    var cube_geometry = new THREE.BoxGeometry(cube_size[i], cube_size[i], cube_size[i]);
    var cube_material = new THREE.MeshPhongMaterial( {color: cube_colour[i]} );
    var cube = new THREE.Mesh(cube_geometry, cube_material);
    // Calculate how much the cube must be raised to be sitting on the plane. And add a bit so
    // its not in the plane.
    var cube_y_pos = (cube_size[i] / 2.) + 3.01;
    cube.position.set(cube_xz[i][0], cube_y_pos, cube_xz[i][1]);
    // Back to shadows, we want each of or cubes to cast a shadow on to the plane (which was set
    // to receive shadows).
    cube.castShadow = true;
    // We also want the cubes to receive shadows if one if cast upon it by another cube.
    cube.receiveShadow = true;
    // There's still more to do to make shadows work which we'll see when we make the lights.
    scene.add(cube);
}


// Lets make a sun by making a yellow sphere and placing it in the same position as the light.
// We want to animate our sun (and light), by making it loop round the plane. To make a circle
// path we need trigonometry, and define xyz positions with sines and coses. sine and cos have
// ranges of -1 to 1 making them easy to scale. Forst lets set the size of our sun's path by
// defining the range for each sin and cos value to be scaled up by.
var x_range = 260;
var y_range = 150;
var z_range = 100;
var z_shift = 200;
// We will need a changing value we can use when animating. Lets call it the frame number.
var frame = 0.0;
var sun_pos = [Math.sin(frame) * x_range, Math.cos(frame) * y_range, (Math.sin(frame) * z_range) - z_shift];

var sun_geometry = new THREE.SphereGeometry(10, 10, 50);
var sun_material = new THREE.MeshBasicMaterial( {color: 0xFFFF00} );
var sun = new THREE.Mesh(sun_geometry, sun_material);
sun.position.set(sun_pos[0], sun_pos[1], sun_pos[2]);
scene.add(sun);

var light = new THREE.DirectionalLight(0xFFFFFF);
// Set to same as sun sphere position.
light.position.set(sun_pos[0], sun_pos[1], sun_pos[2]);
// More on shadows. With the cubes, castShadow made the cubes do just that if they get in the
// way of light. Although it is not quite the same concept, we also need to tell the light to
// cast a shadow.
light.castShadow = true;
// Here we can set the darkness of the shadow, 0 being invisible and 1 being black.
light.shadowDarkness = 0.4;
light.shadowMapWidth = 1000;
light.shadowMapHeight = 1000;
scene.add(light);

// The final shadow step is to tell the renderer about it.
renderer.shadowMapEnabled = true;

// Here is a new feature. We want to move around the scene, this is a difficult thing to
// code but luckily Three.js people have written scripts for us. They are seperate to the
// main Three.js library and so need to be imported (in the html file). There are lots of
// different control types and they should come with the downloaded Three.js package in the
// examples/js/controls/ folder. You'll see I've pointed to OrbitControls.js in the html file.
// Note, for controls to work, there must be a render loop running (this is our animate
// function below).
var controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);

// Here we are going to make are sun position go round in a circle. The concept is easy,
// we just update the sun's (and light's) position within this loop.
function animate() {
    // We need to increase the frame number with each iteration.
    if (frame > Math.PI * 2) {
      frame = 0.0;
    }
    else {
      frame += 0.01;
    }
    // Now update the positions of the sun and the light.
    sun_pos = [Math.sin(frame) * x_range, Math.cos(frame) * y_range, (Math.sin(frame) * z_range) - z_shift];
    sun.position.set(sun_pos[0], sun_pos[1], sun_pos[2]);
    light.position.set(sun_pos[0], sun_pos[1], sun_pos[2]);


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
