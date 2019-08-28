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