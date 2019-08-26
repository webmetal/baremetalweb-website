#Orthographic Camera

These cameras can be tricky to set up and the documentation on three is a bit lacking in some places.

A couple of summary notes on orthographic projection as it pertains to webgl.

1. The object appears the same size regardless of the distance to the camera.
1. This uses the projection matrix.
1. You are working with pixels per unit.
1. The camera defines a cube like frustum. 

## Example

```js
/**
* Create a orthographic camera and add it to the scene
* @param width {number}: use the canvas offsetWidth
* @param height {number}: use the canvas offsetHeight
* @param scene {THREE.Scene}: the scene to add the camera too
* @returns {THREE.OrthographicCamera}
*/
function createOrthographicCamera(width, height, scene) {
    const viewSize = height;
    const aspectRatio = width / height;

    const viewport = {
        aspectRatio: aspectRatio,
        viewSize: viewSize,
        left: (-aspectRatio * viewSize) / 2,
        right: (aspectRatio * viewSize) / 2,
        top: viewSize / 2,
        bottom: -viewSize / 2,
        near: -100,
        far: 100
    };

    const camera = new THREE.OrthographicCamera (
        viewport.left,
        viewport.right,
        viewport.top,
        viewport.bottom,
        viewport.near,
        viewport.far
    );

    scene.add(camera);
    return camera;
}
```

## Object

If you created a cube of Vector3(1, 1, 1) you will notice that you see a what looks like a single pixel on the screen center.
When you use a perspective camera, the object's size is relative to the position of the camera.
To avoid confusion here you can try and think of your object in pixel terms and define it's size in pixel terms.

Alternatively you can use the zoom on the camera to affect the render size.

## Zoom

```js
/**
* Function to zoom orthographic camera
* @param camera {Three.OrthographicCamera}: camera to zoom
* @param zoomOffset {number}: the amount to zoom it by
*/
function zoomOrthographicCamera(camera, zoomOffset) {
    camera.zoom += zoomOffset;
    camera.updateProjectionMatrix();
}
```

Since the project has changed it is important you don't forget to update the projection matrix.

## Finding your place on screen

In this section we will look at absolute placement of an object in screen space.
There are two things you need to understand when moving the object.

1. What is the size of the object I am moving.
1. What is the bounds that I can move the object in but still be on screen (frustum space).

To find out the size of the object you can use the bounding box.
If you are going to use it often, you might want to cache the bounding box.

```js
/**
* Get the bounding box of a mesh. 
* If it does not yet exist, create it for next time
* @param mesh {Three.Mesh}
* @returns {Three.Box3};
*/
function getBoundingBox(mesh) {
    let bb = mesh.geometry.boundingBox;
    if (bb == null) {
        bb = new THREE.Box3().setFromObject(mesh);
        mesh.geometry.boundingBox = bb;        
    }
    return bb;
}
    
```

Note that if you are using 3d meshes use Box3.
If you are using 2d meshes use Box2.

### Left

By default if you set the object's x to the camera left you will only see half of your object.
This is because by default the object origin is at the center of the object.
Fortunately for us the bounding box already deals with this by giving us the appropriate value on the max x and min x.

```js
// shift the object to the right by the max x value
mesh.position.x = camera.left + box.max.x;
```

The same concept would apply if you wanted to place the object on the right, top or bottom.

### Top left example

```js
/**
* Set the mesh to the top left corner of the screen
* @param mesh {Three.Mesh}: the object to move 
* @param camera {Three.OrthographicCamera}: camera that defines the frustum
*/
function topLeft(mesh, camera) {
    const box = getBoundingBox(mesh);
    
    mesh.position.x = camera.left + box.max.x;
    mesh.position.y = camera.top - box.max.x;    
}
```

###