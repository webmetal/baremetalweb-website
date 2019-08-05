# Graphics performance

## Data structures
Data structures are used to organise your scene data.  
This allows you to easily query for objects in the vicinity.
This can be used for both visibility detection and also collections.
It is not limited to these features the they are the most common.

1. BSP (binary tree)
1. Quadtree
1. Octree

## Culling
Don't draw what you can't see.  
The following are common culling algorithms used to determine if something should be drawn. 

1. Occlusion culling
1. Portal rendering
1. Frustum culling
1. Z-buffer culling
1. Back face culling
1. Contribution culling

## General

1. Limit state changes in draw calls
1. Group similar objects for drawing
1. Limit the number of vertices by using billboards where you can (render to texture).
