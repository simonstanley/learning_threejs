// GUIDE 4 for three.js - Adding colour

// In guide 3 we created the simplist shaders possible and now we're going to extend on this.

// Our initialization from guide 1.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);
camera.position.z = 300;
var renderer = new THREE.WebGLRenderer();
var $container = $('#container');

// Our cube geometry (using Three.js built in)
var geometry = new THREE.BoxGeometry(100, 100, 100);

// Everthing within the *'s is the subject of this guide.
//********************************************************************************************//

// In guide 3 it was mentioned that Three.js provides the shaders with variables for us to use,
// for example projectionMatrix, modelViewMatrix and position. As it happens, shaders take
// 3 types of variable: uniforms, attributes and varyings. I should state at this point that this
// is a strange (and maybe confusing) concept, shaders effectively have their own unique types.
// Here are the variable types explained:
// -Uniforms   - These are variables which are the same for all vertices, for example the position
//               of the light source. They are available in both vertex and fragment shaders.
// -Attributes - These are variables which are associated with each vertex, for example the position
//               of the vertex. These are available to the vertex shader only.
// -Varyings   - These are variables which are passed from the vertex shader to the fragment 
//               shader, for example, we could pass the normal attribute (provided by Three.js) to 
//               the fragment shader so it can work out the fragments normal and hence how much it 
//               faces the light (don't worry if that doesn't make sense, we will do exactly this
//               in the next guide).
// 
// As for the variables provided by Three.js that we know already, projectionMatrix and modelViewMatrix 
// are uniforms, and position is an attribute. There is a list of all Three.js variables provided 
// online here, http://threejs.org/docs/#Reference/Renderers.WebGL/WebGLProgram 
// but importantly we can make our own, and that's exactly what we're going to do!
//
// Our mission is to create a cube which is coloured nicely.
// Lets assign each vertex a unique colour and demonstrate how the attribute variable can be used. Now 
// the actual system of how you want to colour each vertex is written in the shader, but in short, we're 
// going to have varying amounts of red for each vertex. So lets create an "amount_of_red" attribute.
// Note, the name "amount_of_red" isn't special, you can call uniforms and attributes what you like.

var attributes = {
    amount_of_red: {
        type: 'f',
        value: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
    }
};

// There are a few important things going on here:
// -The variable 'attributes' is an object (in the javascript sense) which contains all the attributes 
//  you want to create. We've just created 1, "amount_of_red".
// -Each attribute itself is an (js) object with 2 entries, type and value (these are called properties 
//  in javascript land). "value" gives us our array of values and "type" tells the shader the type of 
//  values in the array. 'f' means float here. A list of the different types can be found online, 
//  http://threejs.org/docs/#Reference/Materials/ShaderMaterial.
// -The array of values contains, and must contain, the same number of values as there are vertices, 8
//  for a cube. Simply, each value in the array refers to each vertex, they are mapped one to one to the 
//  geometry.vertices array (In guide 2 we built this vertices array ourselves if you need to see
//  this more clearly).

// Ok, now we will make a uniforms variable. Again for the sake of simplicity we'll stick to colour.
// We only want red to vary with vertex but keep green and blue the same.

var uniforms = {
    amount_of_blue: {
        type: 'f',
        value: 0.5
    },
    amount_of_green: {
        type: 'f',
        value: 0.4
    }
};

// As you can see the set up is very similar. The major difference is that 'value' is, and has to be, a
// single value (not an array). This makes sense because uniforms are the same for all vertices.

// Now we need to pass these to the shaders.

var material = new THREE.ShaderMaterial( 
    {
        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   $('#vertexshader').text(),
        fragmentShader: $('#fragmentshader').text()
    });

// Note, in case you were wondering, varyings don't get defined here. Varyings are created in the 
// vertex shader (they are just re-assigned attributes as we'll see) and are passed to the 
// fragment shader (this defines them as varyings). We'll see this in the shaders code.

// Now let's look at the shaders in the file three_guide4.html...

//********************************************************************************************//

// Here is the final creation step of the object covered in guide 2.
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



