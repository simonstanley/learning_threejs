// GUIDE 7 for three.js - Beautify and explore

// In guide 6 we moved towards using Three.js built-ins to make our life easier (what Three.js is 
// designed for). This guide focuses on the type of stuff you can do with the built-ins to make 
// our scene more interesting and beautiful! There is no one focus here, we will look at building
// a basic world which we can move around.

// Initialisations are the same.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 30;
camera.position.y = 20;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

// Here's a new feature, we can set the background colour like so...
renderer.setClearColor(0x3BB9FF, 1);
// I choose a nice sky blue!

// We are going to build our own land. First thing we need is a floor. Three.js has a built-in
// geometry for a plane where we specify the x and y lengths.
var plane_geometry = new THREE.PlaneGeometry(300, 300);
// We will use a basic material, colour it green (like grass) and set it visable from both sides
// (so its not like the default one way mirror).
var plane_material = new THREE.MeshBasicMaterial( {color: 0x88BB22, side: THREE.DoubleSide} );
var plane = new THREE.Mesh(plane_geometry, plane_material);
// As mentioned, we set xy lengths meaning the default is a vertical plane. So we should rotate
// it 90 degrees so its flat.
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


// Lets put some objects on our plane (grass!).
// Lets say we want 5 cubes. They all need a unique size, position and colour.
// The positions need to be within the plane which is 300x300 centred on (0,0,0) (and horizontal).
// We won't them all to sit on top of our plane so they each must be raised from their default
// 0 position in the y axis by half their height. The x and z can be random, so let's choose those.
var cube_xz = [[30,-100], [120,-10], [0,0], [80,70], [-30,-110]];
// Next the sizes. For simplicity we will stick to cubes means height, width and length are equal.
var cube_size = [10,15,6,19,14];
// And finally colours.
var cube_colour = [new THREE.Color(0xFF0088), new THREE.Color(0xEEB2F2), new THREE.Color(0xF00282), 
                   new THREE.Color(0xE2FE39), new THREE.Color(0x9E013F)];


for (i = 0; i < 5; i++) {
    var cube_geometry = new THREE.BoxGeometry(cube_size[i], cube_size[i], cube_size[i]);
    var cube_material = new THREE.MeshPhongMaterial( {color: cube_colour[i]} );
    var cube = new THREE.Mesh(cube_geometry, cube_material);
    // Calculate how much the cube must be raised to be sitting on the plane. And add a bit so
    // its not in the plane.
    var cube_y_pos = (cube_size[i] / 2.) + 0.01;
    cube.position.set(cube_xz[i][0], cube_y_pos, cube_xz[i][1]);
    scene.add(cube);
}


// Lets make a sun by making a yellow sphere and placing it in the same direction as the light.
var sun_geometry = new THREE.SphereGeometry(10, 10, 50);
var sun_material = new THREE.MeshBasicMaterial( {color: 0xFFFF00} );
var sun = new THREE.Mesh(sun_geometry, sun_material);
sun.position.set(100, 100, 100);
scene.add(sun);

var light = new THREE.DirectionalLight(0xFFFFFF);
light.position.set(30, 30, 30);
scene.add(light);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);


function animate() {

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();



