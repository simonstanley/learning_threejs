// GUIDE 3 for three.js - Shaders

// In guide 2 we built and displayed a cube. We learnt that objects (meshes) in Three.js need 
// geometry and material. Three.js has built in geometries and materials. In guide 2 we
// built our own geometry and used a built in material. In this guide we will do the 
// opposite, use a built in geometry and explore how materials can be made, namely, using
// shaders.

// This is our initialization from guide 1.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 300;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

// Here we use the built in box geometry (which does the same thing as what we did ourselves 
// in guide 2).
var geometry = new THREE.BoxGeometry(100, 100, 100);

// Everthing within the *'s is the subject of this guide.
//********************************************************************************************//

// For general purpose meshes, Three.js provides various materials with lots of flexibility
// built in. This guide looks at shaders which are a seperate subject in themselves but are 
// essential if you want to build your own material.

// To start with lets forget about materials and just look at the concept of shaders.
// Shaders allow you to manipulate how your mesh looks, e.g. change its colour, move vertices 
// around etc.
// These operations can be done within the javascript file but what's special about shaders is 
// that the operations you ask them to do get calculated on the GPU (the graphics processing unit) 
// which is optimised for these types of calculations as opposed to the CPU which is not.

// There are two types of shaders:
// -Vertex shader   - This opperates on each vertex, its main function is to set the position of 
//                    each vertex (which is why shaders are more than just our tradional idea of 
//                    material). This comes in very useful when animating a mesh.
// -Fragment shader - This opperates on each fragment of your mesh (a fragment is a pixel on 
//                    the screen), its main function is to set the colour of each fragment. To 
//                    know where each fragment is, this shader needs to know where each vertex
//                    is (the fragments lie inbetween the vertices, they are basically each pixel
//                    on a face). For this reason the fragment shader is always run after the
//                    vertex shader.

// As hinted above, the shaders are not written in the javascript file and they are not written 
// in javascript! They are written in GLSL which is a graphics language very similar to C/C++, and
// are placed in the html file, within a <script> tag. Go to three_guide3.html to continue and see 
// how shaders are written...


// Once we have the shaders in place we have to import them and give them to Three.js to handle.
// This is done by passing them into ShaderMaterial where they are used to create our material.
var material = new THREE.ShaderMaterial( 
    {
        vertexShader:   $('#vertexshader').text(),
        fragmentShader: $('#fragmentshader').text()
    });

// Running this, we see that we've actually gone back a step, our cube is now solid white with 
// no shadows or sense of depth. As we saw in the html file, the fragment shader handles the
// colour of each pixel and we set every pixel to white. To get shadows and such, each fragment
// colour must be adjusted according to the direction it faces with relation to the light source.
// The built in materials (which we used before) have all this coded for us but we're going to 
// learn how to do it ourselves because shaders are very powerful.

//********************************************************************************************//

// Here is the final creation step of the mesh covered in guide 2.
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// So we can see the cube is a cube and not just a flat square!..
cube.rotation.y = 1.2
cube.rotation.x = 1

// Note, we don't need the light we used in guide 2 anymore because the colouring is done by the
// fragment shader. We'll see how to use lights with our shader in guide 5. 

// Here are the final steps which render everthing, covered in guide 1.
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);
renderer.render(scene, camera);



