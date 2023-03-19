# General purpose engine-3D
## Includes:

- Documentation (Discontinued versions)

- Extension Programs (OpenWorldDemo, Flappybird)

- Engine src files (Latest) (↓ Usage Documentation ↓)

## Use of Engine:

HTML - You may use the JS GP-Engine folder
(CURRENTLY OUTDATED)

VUE - You may use the premade GP-Engine component
(The Component is a compilation of all JS functions from GP-Engine folder)


### Adding Objects:

- **Add Cube:** AddCubeObject(X-Position, Y-Position, Z-Position, Size) (necessary params)

**All params:** (X-Position, Y-Position, Z-Position, Size, HitboxSizeX1, HitboxSizeY1, HitboxSizeZ1, HitboxSizeX2, HitboxSizeY2, HitboxSizeZ2, ObjectType, VelocityX, VelocityY, VelocityZ, Mass,    DeleteOnCollision, ConstantForceX, ConstantForceY, ConstantForceZ)

- **Add Custom Object:**

1. Export an **.obj** file from blender (check **"triangulate mesh"**, uncheck all other boxes)

2. Input the **.obj** file into the engine (button)

3. Call the **AddCubeObject** function (It will use the **.obj** file data as a mesh) (All parameters mentioned above are applicable)

4. Color and Opacity have to be added in the program (see **Object Properties**)


### Simulation Events:

These **functions** will be triggered by the engine during program ***run time***

- **OnStart**()
- **OnDeleteFoundObject**(FoundObjectNumber)
- **OnDeleteObject**(ObjectNumber)
- **OnKeyPress**(PressedKey)
- **OnDoScaling**()
- **OnNewFrame**()
- **OnScroll**(ScrollValue)
- **EventResolve**(X/Y/Z)(Object1, Object2)
- **OnCollision**(Object1, Object2)
- **OnObjFileLoad**(CreateIndex)


### Object Properties:

- All objects will be added to RegObjects[] ([object1, object2, object3...])

- Access an object property with RegObjects[***ObjectIndex***].***ObjectProperty***

#### Physics:

- **ConstantForce(X/Y/Z)** - Works like gravity
- **Velocity(X/Y/Z)**
- **Mass**

- **HitboxSize(X1,X2,Y1,Y2,Z1,Z2)** - Define the hitbox borders

- **DeleteOnCollision** - Describes if this object should automatically delete itself on collision
- **DeleteOTHERonCollision** - Describes if this object should automatically delete any other collided objects

#### Animation:

- **AnimationInstructions(X/Y/Z)** - An array describing object animation (each stage is **100** frames)
- **AnimationStages** - describes the amount stages before repeating from start)

#### Rendering:

- **FillColor** - Object color (does not affect surface edges)
- **Opacity** - 0-1 (0 -> Full transparency, 1-> No transparency)

#### Position:

- **Leader(X/Y/Z)** - Object position

#### Engine (Should only be used in rare cases):

- **Tag** - This can be used to set and identify objects (for example at run time **events**)
- **IsMarked** - This is true if the object is selected by the mouse cursor
- **PointsMarked** - An array with all triangle vertices. The verticee selected by the mouse curser will be true

- **Shell(X/Y/Z)** - An array with arrays of triangle vertex & face data
- **ObjectType** - An object can either be bound to the **physics** engine module or the **animation** module

- **AnimationFrame** - Describes the current frame in animation (see Properties - **Animation**)

- **TriDist(X/Y/Z)** - (Rendering - **Ray Casting**)
- **TriTotLength** - (Rendering - **Ray Casting**)
- **TriSorted** - (Rendering - **Ray Casting**)
- **TriDistCameraUnitVector(X/Y/Z)** - (Rendering - **Ray Casting**)
- **TriCameraDotProduct** - (Rendering - **Ray Casting**)
- **TriangleCrossProductUnitVector(X/Y/Z)** - (Rendering - **Ray Casting**)

- **ShellProjected(X/Y)** - (Rendering - **Draw Final Calculated Object 2D Position**)
- **HitboxProjected(X/Y)** - (Rendering - **Draw Final Calculated Object 2D Position**)


### Technicalities & Engine Settings:

- **Canvas(Width/Heigth)**
- **ProgramHertz** - Maximum allowed **hertz**
- **ProgramIncrementHertz** - **Change** / **frame**
- **ShowHitboxes**
- **ShowAnimationPathing**
- **RenderShading**

- **Elasticity**
- **TimeFriction**

- **FocalLength**
- **CameraOffset(X/Y/Z)**

- **Animationspeed** - Animation frame data increase per frame (recommended value: **1**)
