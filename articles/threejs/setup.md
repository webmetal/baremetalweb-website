# How do you get started in threejs

## Required parts

These are the different parts you need to get your scene started.

1. Scene
1. Renderer
1. Camera
1. Some object to render

## Boilerplate code

### Initializing the scene

```js
function createScene(parentElement) {
    return new Promise(resolve => {
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        parentElement.appendChild(renderer.domElement);

        setTimeout(() => {
            const width = renderer.domElement.offsetWidth;
            const height = renderer.domElement.offsetHeight;

            renderer.setSize(width, height);

            const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000 );
            camera.position.z = 5;
            scene.add(camera);

            resolve({
                scene: scene,
                renderer: renderer,
                camera: camera,
                width: width,
                height: height
            });
        }, 16);
    });
}
```

### Using the scene

```js
createScene(document.body)
    .then(s => {
        const geometry = new THREE.BoxBufferGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( geometry, material );

        s.scene.add(cube);
        s.renderer.render(s.scene, s.camera);
    });
```
