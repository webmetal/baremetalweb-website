# 2D shapes in threejs

## Basics

Keep in mind the following:

1. These examples assume using a OrthographicCamera.
1. All meshes are made up of triangles.
1. Faces are defined counter clockwise.
1. Meshes are typically made up of vertices, faces, normals, uv and materials.
1. BufferGeometry in threejs is the most efficient way to define a geometry and worth taking a closer look at.

If any of the above does not make sense please first get comfortable with those terms before continuing.

## Triangle

This is the most basic shape and a good place to start practicing since all meshes are made out of triangles.
For this example we will use the BufferGeometry to define our mesh structure.
https://threejs.org/docs/#api/en/core/BufferGeometry

### Example

```js
/**
 * Given the width and height, draw a triangle
 * @param width
 * @param height
 * @returns {THREE.Mesh}
 */
function createTriangle(width, height) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
        0, height,
        -width, -height,
        width, -height
    ] );

    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 2));
    return new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0xff0000}));
}
```


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

## Round Rect

A round rectangle is a rectangle that has it's corers rounded.
To try and draw something like this with the traditional vertex methods will drive you nuts.
A simpler way of doing this is by using the Shape class three provides.
This allows you to use path syntax to define the shape.

```js
function roundRect(width, height, r) {
    const x = width / 2;
    const y = height / 2;

    const shape = new THREE.Shape();

    shape.moveTo(-x, y - r);
    shape.bezierCurveTo(-x, y, -x, y, -x + r, y);

    shape.lineTo(x - r, y);
    shape.bezierCurveTo(x, y, x, y, x, y -r);

    shape.lineTo(x, -y + r);
    shape.bezierCurveTo(x, -y, x, -y,  x - r, -y);

    shape.lineTo(-x + r, -y);
    shape.bezierCurveTo(-x, -y, -x, -y, -x, -y + r);

    return shape;
}
```

Now that you have the shape information you need to enable drawing it.

The sequence for this is as follows:

1. Define the shape using THREE.Shape
1. Create a geometry object using THREE.ShapeBufferGeometry
1. Create the material to be used in the rendering
1. Create the mesh using THREE.mesh that will be added to the scene

```js
const geometry = new THREE.ShapeBufferGeometry(roundRect(200, 100, 20));
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const mesh = new THREE.Mesh(geometry, material) ;

scene.add(mesh);
```

##Diamond

A diamond is a fairly simple object and you can easily draw it using BufferGeometry.
Drawing it with a shape is easier though but will cost you on resources and performance.

```js
function diamond(r) {
    const shape = new THREE.Shape();

    shape.moveTo(0, r);
    shape.lineTo(r, 0);
    shape.lineTo(0, -r);
    shape.lineTo(-r, 0);

    return shape;
}
```

##Circles and semi circles

There are two functions you can use:

1. arc
1. absarc

I suggest you use absarc because the results are more predictable.
This does not mean you can ignore arc, it has it's uses but you need to be careful when using it as it is "less forgiving" when combined with moveTo and lineTo.
There is one catch you need to keep in mind.

1. Direction matters, counter clock for positive values, clock for negative.
1. When working in degrees, you need to convert them to radians first.
1. 0 degrees is at the center right position moving counter clock wise thus 90 deg is top center.
1. If you want to draw a circle set the from angle to 0 and the to angle as Math.PI * 2.

##Smoothing out your shape

Lets say you are using a arc and drawing a circle, by default it will look a bit rough.

```js
function createCircle(radius, scene) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, 2 * Math.PI);
    const points = shape.getPoints();
    const geoPoints = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geoPoints, new THREE.LineBasicMaterial({color: 0xff0000}));
    scene.add(line);
}
```

The following code you can use to either make it smoother or make other circular type shapes.

```js
function createCircle(radius, scene, divisions) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, 2 * Math.PI);
    const points = shape.getPoints(divisions);
    const geoPoints = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geoPoints, new THREE.LineBasicMaterial({color: 0xff0000}));
    scene.add(line);
}
```

By changing the divisions you can manipulate the shape of the circle.

Please note that this is only really needed depending on the size of the curve / circle.
If the shape is small, you may get away with using less divisions for the +- same pixel result.
You may want to consider adding a LOD logic in your circle / curve function that will vary the division depending on the size.
The larger the shape, you will need more divisions for smoother edges.

## Border vs Fill

border width?