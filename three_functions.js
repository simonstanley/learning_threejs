//var scene, camera, renderer;
//var geometry, material, mesh;
//
//init();
//animate();
//
//function init() {
//
//    scene = new THREE.Scene();
//
//    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
//    camera.position.z = 1000;
//
//    geometry = new THREE.BoxGeometry( 200, 200, 200 );
//    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
//
//    mesh = new THREE.Mesh( geometry, material );
//    scene.add( mesh );
//
//    renderer = new THREE.WebGLRenderer();
//    renderer.setSize( window.innerWidth, window.innerHeight );
//
//    document.body.appendChild( renderer.domElement );
//
//}
//
//function animate() {
//
//    requestAnimationFrame( animate );
//
//    mesh.rotation.x += 0.01;
//    mesh.rotation.y += 0.02;
//
//    renderer.render( scene, camera );
//
//}





// set the scene size
var WIDTH = 800,
  HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 40,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
var scene = new THREE.Scene();


// add the camera to the scene
scene.add(camera);
// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;
camera.position.x = 100;


//var attributes = {
//
//		};
//
//var uniforms = {
//		amplitude: {    
//			type: 'f', // a float
//			value: 0
//		},
//		displacement: {
//		    type: 'f', // a float
//		    value: 10
//		  }
//};
//
////create the sphere's material
//var sphereMaterial =
//  new THREE.ShaderMaterial(
//    {
//	uniforms:       uniforms,
//	attributes:	attributes,
//	vertexShader:   $('#vertexshader').text(),
//	fragmentShader: $('#fragmentshader').text()
//    });
//
//
//
//
////create a new mesh with
////sphere geometry - we will cover
////the sphereMaterial next!
//var sphere = new THREE.Mesh(
//	new THREE.BoxGeometry(
//	100,
//	100,
//	100),
//	sphereMaterial);
//
//
//// add the sphere to the scene
//scene.add(sphere);
//
////create a point light
//var pointLight =
//  new THREE.PointLight(0xFFFFFF);
//
//// set its position
//pointLight.position.x = 50;
//pointLight.position.y = 50;
//pointLight.position.z = 50;
//
//// add to the scene
//scene.add(pointLight);
//
//start the renderer
renderer.setSize(WIDTH, HEIGHT);
//
//var frame = 0;
//
//function update() {
//	uniforms.amplitude.value = Math.sin(frame);
//	frame += 0.1;
//	//draw!
//	renderer.render(scene, camera);
//	
//	// set up the next call
//	requestAnimationFrame(update);
//}
//
//requestAnimationFrame(update);
//
//
//




// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vertex(
        new THREE.Vector3(pX, pY, pZ)
      );

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.addChild(particleSystem);


renderer.render(scene, camera);


//attach the render-supplied DOM element
$container.append(renderer.domElement);

