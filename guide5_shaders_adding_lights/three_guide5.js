// GUIDE 5 for three.js - Adding lights

// In guide 4 we created the simple(ish) shaders to colour our cube. Now we are going to add
// some realistic lighting effects.

// Our initialization from guide 1.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 300;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

// Our cube geometry (using the Three.js built in)
var geometry = new THREE.BoxGeometry(100, 100, 100);

// Everthing within the *'s is the subject of this guide.
//********************************************************************************************//

// You may have noticed that when we first started making our own shaders in guide 3, we removed
// the lights. A quick note, the concept of a light is a lot easier to visualise when dealing
// with Three.js's built in materials. They are programmed to respond to light in a realistic
// way by shading areas of our object according to the lights position. Can you guess what is
// used to program this behaviour?... That's right, shaders. It is shaders that determine the
// final colour on the screen, not a light. A light is a concept which the shaders turn into
// something we deem realistic by adjusting those final colours.
// We are now at a point where we want to see a realistic lighting effect but build it ourselves.
// First thing we need to do is specify where in the 3D space our "light" will be.
var light_pos = new THREE.Vector3(-1.5, 2.0, -1.0);

// Our attributes from guide 4.
var attributes = {
    amount_of_red: {
        type: 'f',
        value: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
    }
};

// Seeing as the light position is constant for all vertices, we add it to the uniforms.
var uniforms = {
    amount_of_blue: {
        type: 'f',
        value: 0.5
    },
    amount_of_green: {
        type: 'f',
        value: 0.4
    },
    light: {
        type: 'v3',
        value: light_pos
    }
};

// Our material creation using our shaders. Head over to three_guide5.html to see what the
// shaders are now doing.
var material = new THREE.ShaderMaterial( 
    {
        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   $('#vertexshader').text(),
        fragmentShader: $('#fragmentshader').text()
    });

//********************************************************************************************//

// Here is the final creation step of the mesh covered in guide 2.
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// So we can see the cube is a cube and not just a flat square!..
cube.rotation.y = 2.2
cube.rotation.x = 0.8

// Here are the final steps which render everthing, covered in guide 1.
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);
renderer.render(scene, camera);



