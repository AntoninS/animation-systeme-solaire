// Initialisation of the scene / camera / renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

// Initialisation of your objects / materials / light
var solarSystem = new THREE.Object3D();
scene.add(solarSystem);

var ball = new THREE.SphereGeometry(1, 32, 32);

var sunMaterial = new THREE.MeshPhongMaterial( { } );
var sun = new THREE.Mesh(ball, sunMaterial);
sunMaterial.map = THREE.ImageUtils.loadTexture('images/sunmap.jpg')
sun.scale.set(0.7, 0.7, 0.7);

var earthMaterial = new THREE.MeshPhongMaterial( { } );
var earth = new THREE.Mesh(ball, earthMaterial);
earthMaterial.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg')

earth.scale.set(0.3, 0.3, 0.3);
earth.position.x = 3;

var moonMaterial = new THREE.MeshPhongMaterial( { } );
var moon = new THREE.Mesh(ball, moonMaterial);
moonMaterial.map = THREE.ImageUtils.loadTexture('images/moonmap.jpg')
moon.scale.set(0.15, 0.15, 0.15);
moon.position.x = 2;

var marsMaterial = new THREE.MeshPhongMaterial( { } );
var mars = new THREE.Mesh(ball, marsMaterial);
marsMaterial.map = THREE.ImageUtils.loadTexture('images/marsmap2k.jpg')
mars.scale.set(0.3, 0.3, 0.3);
mars.position.x = 5;

solarSystem.add(sun);
sun.add(earth);
sun.add(mars);
earth.add(moon);

var light = new THREE.PointLight( 0xffffff, 2, 100 );
light.position.set( 0, 0, 0 );
scene.add( light );

var ambient = new THREE.AmbientLight( 0x555555 );
scene.add(ambient);

/*
//Skydome, ou plutot stardome

  // create the geometry sphere
  var geometry  = new THREE.SphereGeometry(90, 32, 32);
  // create the material, using a texture of startfield
  var material  = new THREE.MeshBasicMaterial();
  material.map   = THREE.ImageUtils.loadTexture('images/starstexture.jpg');
  material.side  = THREE.BackSide;
  // create the mesh based on geometry and material
  var mesh  = new THREE.Mesh(geometry, material);
*/

// Test TP2 sur les matrices
var followMaterial = new THREE.MeshBasicMaterial( { color : 0xffffff } );

// This is executed for each frames
function render() {
    requestAnimationFrame( render );

    sun.rotation.y += 0.01;
    earth.rotation.y += 0.03;
    moon.rotation.y += 0.01;
    mars.rotation.y += 0.01;

    //Trace de passage de la lune
    var moonFollow = new THREE.Mesh(ball, followMaterial);
    moonFollow.scale.set(0.01, 0.01, 0.01 );

    var p = new THREE.Vector3();
    var m = moon.matrixWorld;
    p.applyMatrix4(m);
    moonFollow.position.copy(p);
    solarSystem.add(moonFollow);
    //---------------------------


    renderer.render( scene, camera );
}

render();
