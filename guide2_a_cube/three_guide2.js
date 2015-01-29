// GUIDE 2 for three.js - A cube

// In guide 1 we built the platform on which to build and display actual things. In this guide we'll
// learn the basics about creating "things", namely, we'll build a cube.

// This is our initialization from guide 1 (without the comments, see guide 1 for info).
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 300;
camera.position.x = 50;
camera.position.y = 100;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');


// Everthing within the *'s is the subject of this guide.
//********************************************************************************************//

// So we want something to look at. The make this (like with most things) there are a few things
// we need:
// -Geometry - Objects are formed using verticies (a vertex is a single point whose position is 
//             represented by 3 coordinate values in the x, y and z dimensions) and faces (a 
//             face is always a triangle and is built by specifing the 3 vertices that make it). 
//             The collection of these is the object geometry.
// -Material - The coordinates on their own are like the blue print. To actually give the object
//             substance it needs material (creating material is a whole subject in itself).
// -Mesh     - This is the class which combines the geometry and the material creating our final 
//             object (and I mean object in the normal sense, not the javascript object sense).
// -Light    - Now we have an oject, but we have to shine a light on it to actually see it.

// Let's look at each of these.

// THE GEOMETRY
// This is simple to initialise.
var geometry = new THREE.Geometry();
// The geometry has an attribute called 'vertices'. To make something we must first fill this 
// attribute with vertex coordinates. As mentioned above, these coordinates are 3 dimensional. 
// Three.js has a built in Vector3 class into which we put our coordinates, and then feed to 
// the verticies attribute.
// So lets start building our cube.
geometry.vertices.push(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(100, 0, 0),
    new THREE.Vector3(0, 100, 0),
    new THREE.Vector3(100, 100, 0),
    new THREE.Vector3(0, 0, -100),
    new THREE.Vector3(100, 0, -100),
    new THREE.Vector3(0, 100, -100),
    new THREE.Vector3(100, 100, -100)
);
// Now we need to tell Three.js which vertices make up a face (a surface of the cube). The 
// natural answer is that there are 6 faces (1 for each side of the cube) each defined by the
// 4 corners (vertices) that encompass it. However, Three.js only deals in triangles, therefore
// each square face must be built with 2 triangles.
// The geometry has an attribute called 'faces' to which we push these face definitions. There 
// are certain rules to define a face:
// - The 3 vertices you must reference to define a face, are referenced by their index in the 
//   geometry.vertices array. In this example, 0 refers to THREE.Vector3(0, 0, 0), the first
//   vertex of the above array.
// - A face can only be seen from one side (bit like a one way mirror, it is see through one way 
//   and visable the other). The visable side is determined by the direction around the face in 
//   which the vertices are specified. To clarify, imagine a single triangle with 3 vertices, call 
//   them vertex 1, 2 and 3. Lets say that the positions of these vertices are such that going 
//   from vertex 1, to vertex 2, to vertex 3 moves you round the triangle in a clockwise direction.
//   If you then walked around the trianle and looked at the other side of the face, going from
//   vertex 1, to 2, to 3 now moves you round the triangle in an anit-clockwise direction. In 
//   Three.js, the side that is seen is side where the vertices are in an anti-clockwise direction.
//
// Here are the faces, this is not very understandable and if you want to follow it you may need to
// draw a labeled diagram!
geometry.faces.push(
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(1, 3, 2),
    new THREE.Face3(1, 5, 3),
    new THREE.Face3(3, 5, 7),
    new THREE.Face3(4, 7, 5),
    new THREE.Face3(4, 6, 7),
    new THREE.Face3(0, 2, 4),
    new THREE.Face3(2, 6, 4),
    new THREE.Face3(2, 3, 7),
    new THREE.Face3(2, 7, 6),
    new THREE.Face3(0, 4, 1),
    new THREE.Face3(1, 4, 5)
);
// Clearly, doing this manually gets very complicated, very quickly which is basically why Three.js
// exists, it does alot of this work for you. Three.js comes with lots of built in geometries for 
// the basic shapes, spheres, cylinders etc. as well as methods for automatically doing the above.
// We will go into more detail of these later.

// Here is a line which is not covered in this guide but is nesseracy. Basically, because we are 
// using a 'proper' material (one which responds to light) the geometry also needs to know which
// direction the faces are facing (their normals) so the shading in relation to the light source 
// can be computed. Three.js has a built in method for this.
geometry.computeFaceNormals();


// THE MATERIAL
// As stated, this is a big subject in itself and is covered in later guides. Like with geometry
// Three.js comes with built in materials. For now, we'll use one of these.
var material = new THREE.MeshPhongMaterial();
// Note, this has lots of attributes (like color) which can be changed but we'll keep it simple.


// THE MESH
// This is a simple step but important, it puts our cube together using the geometry and the material.
var cube = new THREE.Mesh(geometry, material);
// Note, I've used the word object, in the normal sense, to desribe things like our cube (this was
// to keep it in plain English) but this terminally will quickly get confusing when we start talking 
// about javascript objects. The proper term for a traditional object (like a cube) in Three.js is a 
// Mesh.
// Like with all things we need to add it to the scene.
scene.add(cube);


// THE LIGHT
// The light is like the camera, you create it, choose its location (if nesseracy, the default 
// position is (0, 0, 0)) and add it to the scene. There are different kinds of lights but we'll 
// use a basic point light.
var light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 10, 130);
scene.add(light);

// So now we're ready to render. Just one thing, currently our cube is in its default position, 
// straight in front of the camera, this means we can only see one side. So to convince you
// we've made a proper cube (not just a square), let's rotate it a bit.
cube.rotation.y = 1.2
cube.rotation.x = 1

//********************************************************************************************//

// As stated in guide 1, here are the final steps which render everthing.
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);
renderer.render(scene, camera);



