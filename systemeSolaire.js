// Initialisation of the scene / camera / renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );
var speed = 0.1;
var zoom = 2;
camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(new THREE.Vector3(0,0,0)); //We set the camera up on the y axis, and make it look the origin

// Initialisation of objects / materials / light
var solarSystem = new THREE.Object3D();
var pivotSun = new THREE.Object3D();
var pivotMercury = new THREE.Object3D();
var pivotVenus = new THREE.Object3D();
var pivotEarth = new THREE.Object3D();
var pivotMoon = new THREE.Object3D();
var pivotMars = new THREE.Object3D();
var pivotJupiter = new THREE.Object3D();
var pivotSaturn = new THREE.Object3D();
var pivotUranus = new THREE.Object3D();
var pivotNeptune = new THREE.Object3D();
var pivotSun = new THREE.Object3D();
scene.add(solarSystem);
scene.add(pivotSun);
scene.add(pivotMercury);
scene.add(pivotVenus);
scene.add(pivotEarth);
scene.add(pivotMoon);
scene.add(pivotMars);
scene.add(pivotJupiter);
scene.add(pivotSaturn);
scene.add(pivotUranus);
scene.add(pivotNeptune);
solarSystem.scale.set(0.4*zoom, 0.4*zoom, 0.4*zoom);
solarSystem.add(pivotSun);
solarSystem.add(pivotMercury);
solarSystem.add(pivotVenus);
solarSystem.add(pivotEarth);
solarSystem.add(pivotMars);
solarSystem.add(pivotJupiter);
solarSystem.add(pivotSaturn);
solarSystem.add(pivotUranus);
solarSystem.add(pivotNeptune);
var ball = new THREE.SphereGeometry(1, 32, 32);
var ring = new THREE.RingGeometry( 3.5, 5, 32 );

// SUN
var sunMaterial = new THREE.MeshPhongMaterial( { } );
var sun = new THREE.Mesh(ball, sunMaterial);
sunMaterial.map = THREE.ImageUtils.loadTexture('images/sunmap.jpg')
sun.scale.set(1*zoom, 1*zoom, 1*zoom);
sunMaterial.side  = THREE.BackSide;
pivotSun.add(sun);

// EARTH
var earthMaterial = new THREE.MeshPhongMaterial( { } );
var earth = new THREE.Mesh(ball, earthMaterial);
earthMaterial.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg')
earth.scale.set(0.09*zoom, 0.09*zoom, 0.09*zoom);
earth.position.x = 2.7*zoom;
earth.castShadow = true; //default is false
earth.receiveShadow = true;
pivotEarth.add(earth);

// MOON
var moonMaterial = new THREE.MeshPhongMaterial( { } );
var moon = new THREE.Mesh(ball, moonMaterial);
moonMaterial.map = THREE.ImageUtils.loadTexture('images/moonmap.jpg')
moon.scale.set(0.1*zoom, 0.1*zoom, 0.1*zoom);
moon.position.x = 1.5*zoom;
moon.castShadow = true; //default is false
moon.receiveShadow = true;
pivotMoon.add(moon);
earth.add(pivotMoon);

// MARS
var marsMaterial = new THREE.MeshPhongMaterial( { } );
var mars = new THREE.Mesh(ball, marsMaterial);
marsMaterial.map = THREE.ImageUtils.loadTexture('images/marsmap2k.jpg')
mars.scale.set(0.045*zoom, 0.045*zoom, 0.045*zoom);
mars.position.x = 3.2*zoom;
mars.castShadow = true; //default is false
mars.receiveShadow = true;
pivotMars.add(mars);

// LIGHT
var light = new THREE.PointLight( 0xffffff, 2, 100 );
light.position.set( 0, 0, 0 );
scene.add(light);

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

// Moon's following trace material
var followMaterial = new THREE.MeshBasicMaterial( { color : 0xffffff } );
var countFollow = 0;
// This is executed for each frames
function render() {
    requestAnimationFrame( render );
/*
    sun.rotation.y += 0.01;
    earth.rotation.y += 0.03;
    moon.rotation.y += 0.01;
    mars.rotation.y += 0.01;
*/
    pivotEarth.rotation.y += 0.06 *speed;
    pivotMoon.rotation.y += 0.05*speed;
    pivotMars.rotation.y += 0.05 *speed;
    pivotSun.rotation.y += 0.005 *speed;
    earth.rotation.y += 0.03 * speed;
    sun.rotation.y += 0.001;


    // Moon's following trace
    countFollow += 1;

    window['moonFollow' + countFollow] = new THREE.Mesh(ball, followMaterial);
    window['moonFollow' + countFollow].scale.set(0.01, 0.01, 0.01 );

    var p = new THREE.Vector3();
    var m = earth.matrixWorld;
    p.applyMatrix4(m);
    window['moonFollow' + countFollow].position.copy(p);
    scene.add(window['moonFollow' + countFollow]);
    console.log(countFollow);
    if(countFollow > 100){
      scene.remove(window['moonFollow' + (countFollow-99)]);
    }
    //---------------------------


    renderer.render( scene, camera );
}

render();
