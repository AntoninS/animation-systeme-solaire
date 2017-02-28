// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;




// FUNCTIONS

	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.z = 10;
	camera.position.y = 5;
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
	light.position.set(0,0,0);
	scene.add(light);

	var ambient = new THREE.AmbientLight( 0x555555 );
	scene.add(ambient);

	// SKYBOX/FOG
	var imagePrefix = "images/skybox-";
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
	var pivotMercury = new THREE.Object3D();
	var pivotVenus = new THREE.Object3D();
	var pivotEarth = new THREE.Object3D();
	var pivotMoon = new THREE.Object3D();
	var pivotMars = new THREE.Object3D();
	var pivotJupiter = new THREE.Object3D();
	var pivotSaturn = new THREE.Object3D();
	var pivotUranus = new THREE.Object3D();
	var pivotNeptune = new THREE.Object3D();
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
	sunMaterial.side = THREE.BackSide;
	pivotSun.add(sun);

	// EARTH
	var earthMaterial = new THREE.MeshPhongMaterial( { } );
	var earth = new THREE.Mesh(ball, earthMaterial);
	earthMaterial.map = THREE.ImageUtils.loadTexture('images/earthmap.jpg')
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
	marsMaterial.map = THREE.ImageUtils.loadTexture('images/marsmap.jpg')
	mars.scale.set(0.045*zoom, 0.045*zoom, 0.045*zoom);
	mars.position.x = 3.2*zoom;
	mars.castShadow = true; //default is false
	mars.receiveShadow = true;
	pivotMars.add(mars);


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
	sun.rotation.y -= 0.01 *speed;

	pivotEarth.rotation.y += 0.06 *speed;			// Pivot = rotation around the sun
	earth.rotation.y += 0.03 * speed;

	pivotMoon.rotation.y += 0.1*speed;

	mars.rotation.y += 0.03 *speed;
	pivotMars.rotation.y += 0.05 *speed;
	//pivotSun.rotation.y += 0.005 *speed;


	renderer.render( scene, camera );
}

animate();
