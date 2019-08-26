# 2D shapes in threejs

## Rectangle

The proper term for this is a plane geometry.
ThreeJs already has a generic class for plane geometry.

```js
/**
* Create a plane geometry to add to the scene
* @param width {number} how wide is the plane
* @param height {number} how high is the plane
*/
function createPlane(width, height) {
    new THREE.PlaneGeometry(width, height);
}
```

This will end up creating two triangle faces that makes up the plane.
If you want more faces you can subdivide the plane geometry by defining the number of segments for width and height.
The segments default to 1.

If you set the segments to 2 you will subdivide the object so that you have 4 parts, 2x2 matrix each with it's triangulation.
This will end you up with 8 faces total.

This is only really required when you want to deform the object or improve collision detection by enabling more normals.
For normal use though if you just want a plane, the above example is perfect. 

## Triangle