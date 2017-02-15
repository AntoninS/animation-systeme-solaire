// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS
function init()
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,100,400);
	camera.lookAt(scene.position);
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	var speed = 0.1;
	var zoom = 2;
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.TrackballControls( camera );
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	//scene.add(floor);


	// PLANETS



	// SKYBOX/FOG
	var imagePrefix = "images/moondust-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );

	////////////
	// CUSTOM //
	////////////

	var sphereGeo = new THREE.SphereGeometry(100, 32, 16);

	var moonTexture = THREE.ImageUtils.loadTexture( 'images/moon.jpg' );
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
    var moon = new THREE.Mesh(sphereGeo, moonMaterial);
    //scene.add(moon);

	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var customMaterial = new THREE.ShaderMaterial(
	{
	    uniforms: {  },
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );

	var ballGeometry = new THREE.SphereGeometry( 2, 32, 16 ); //De base c'est 120, 32, 16
	var ball = new THREE.Mesh( ballGeometry, customMaterial );
	scene.add( ball );


	var solarSystem = new THREE.Object3D();
	var pivotSun = new THREE.Object3D();
	scene.add(solarSystem);
	scene.add(pivotSun);
	solarSystem.scale.set(0.4*zoom, 0.4*zoom, 0.4*zoom);
	solarSystem.add(pivotSun);
	var ball = new THREE.SphereGeometry(1, 32, 32);
	var ring = new THREE.RingGeometry( 3.5, 5, 32 );

	var sunMaterial = new THREE.MeshPhongMaterial( { } );
	var sun = new THREE.Mesh(ball, sunMaterial);
	sunMaterial.map = THREE.ImageUtils.loadTexture('images/sunmap.jpg')
	sun.scale.set(1*zoom, 1*zoom, 1*zoom);
	sunMaterial.side = THREE.BackSide;
	pivotSun.add(sun);


}

function animate()
{
  requestAnimationFrame( animate );
	render();
	update();
}

function update()
{
	if ( keyboard.pressed("z") )
	{
		// do something
	}
	var delta = clock.getDelta();
	controls.update();
	stats.update();
}

function render()
{
	renderer.render( scene, camera );
}
