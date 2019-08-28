# Basic maths

There are some basic math that you will need when working with graphics.
This document describes some of the basics you need as a quick reference.

## Degrees and Radian

### Degree to radian

```js
function degToRad(deg) {
    return deg * (Math.PI / 180)
}
```

### Radian to degree

```js
function radToDeg(rad) {
    return rad * (180 / Math.PI);
}
```

### Vector Angle from origin 0, 0

```js
/***
* Give the degree angle of a vector based on the origin 0, 0
* @param vector {Vector2}: Vector2
* @returns {number}: Result in degrees
*/
function vDeg(vector)
{
    return Math.atan(vector.y / vector.x) * (180/Math.PI);
}
```

## Vectors

### Get center between 2 Vector2

```js
/***
* Get the center between two vectors
* @param v1 {Vector2}: Vector 1 on line segment
* @param v2 {Vector2}: Vector 2 on line segment
* @returns {Vector2}: Center point of the two vectors
*/
function center(v1, v2) {
    const cx = (v1.x + v2.x) / 2;
    const cy = (v1.y + v2.y) / 2;
    return {
        x: cx,
        y: cy
    }
}
```

### Move x units in the same direction as vector

```js
function moveOn(vector, length) {
    return {
        x: v.x + length,
        y: v.y + length
    }
}
```