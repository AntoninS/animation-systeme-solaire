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

var sunMaterial = new THREE.MeshPhongMaterial( { color: 0xf79336 } );
var sun = new THREE.Mesh(ball, sunMaterial);
sun.scale.set(0.5, 0.5, 0.5);

var earthMaterial = new THREE.MeshPhongMaterial( { color: 0x095993 } );
var earth = new THREE.Mesh(ball, earthMaterial);
earth.scale.set(0.3, 0.3, 0.3);
earth.position.x = 5;

var moonMaterial = new THREE.MeshPhongMaterial( { color: 0xcbcbcb } );
var moon = new THREE.Mesh(ball, moonMaterial);
moon.scale.set(0.15, 0.15, 0.15);
moon.position.x = 2;

var marsMaterial = new THREE.MeshPhongMaterial( { color: 0xff4500 } );
var mars = new THREE.Mesh(ball, marsMaterial);
mars.scale.set(0.3, 0.3, 0.3);
mars.position.x = 7;

solarSystem.add(sun);
sun.add(earth);
sun.add(mars);
earth.add(moon);

var light = new THREE.PointLight( 0xffffff, 20, 100 );
light.position.set( 0, 0, 0 );
scene.add( light );

var ambient = new THREE.AmbientLight( 0x555555 );
scene.add(ambient);

// This is executed for each frames
function render() {
    requestAnimationFrame( render );

    // Animation code goes here
    //sun.position.x += 0.001;
    sun.rotation.z += 0.01;
    earth.rotation.z += 0.01;

    renderer.render( scene, camera );
}

render();
