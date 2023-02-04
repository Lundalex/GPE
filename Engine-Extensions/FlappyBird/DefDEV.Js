// Parameters - AddCubeObject/AddSphereObject:
// (Necessary) INLeaderX, INLeaderY, INLeaderZ, Size, 
// (Optional)InShellX, InShellY, InShellZ, HitboxSizeX1, HitboxSizeY1, HitboxSizeZ1, HitboxSizeX2, HitboxSizeY2, HitboxSizeZ2, ObjectType, VelocityX, VelocityY, VelocityZ, Mass, DeleteOnCollision, ConstantForceX, ConstantForceY, ConstantForceZ

// Parameters - new NewSpawnerObject:
// (Necessary) SpawnSpaceX1, SpawnSpaceY1, SpawnSpaceZ1, SpawnSpaceX2, SpawnSpaceY2, SpawnSpaceZ2, SpawnedLeaderX, SpawnedLeaderY, SpawnedLeaderZ, SpawnedSize, SpawnedHitboxSizeX1, SpawnedHitboxSizeY1, SpawnedHitboxSizeZ1, SpawnedHitboxSizeX2, SpawnedHitboxSizeY2, SpawnedHitboxSizeZ2, SpawnedVelocityX, SpawnedVelocityY, SpawnedVelocityZ, SpawnedMass, SpawnedDeleteOnCollision, SpawnedObjectCubeSphere, SpawnedConstantForceX, SpawnedConstantForceY, SpawnedConstantForceZ

// Default OBJ-data
let Textdata = "# Blender v3.3.1 OBJ File: ''# www.blender.orgo Cubev -78.750534 12.625371 12.625371v -78.750534 -12.625371 12.625371v -78.750534 12.625371 -12.625371v -78.750534 -12.625371 -12.625371v 78.750534 12.625371 12.625371v 78.750534 -12.625371 12.625371v 78.750534 12.625371 -12.625371v 78.750534 -12.625371 -12.625371s offf 5 3 1f 3 8 4f 7 6 8f 2 8 6f 1 4 2f 5 2 6f 5 7 3f 3 7 8f 7 5 6f 2 4 8f 1 3 4f 5 1 2"

// return "bool(false) to cancel function of origin"
function OnStart(){return true}
function OnDeleteFoundObject(FoundObjectNumber){return true}
function OnDeleteObject(ObjectNumber){return true}
function OnKeyPress(PressedKey){return true}
function OnNewFrame(){return true}
function OnScroll(ScrollValue){return true}

// "Eventlisteners" for X/Y/Z resolved by ResolveCollisionWithSolid()
// return "bool(false) to cancel function of origin"
function EventResolveX(Object1, Object2){}
function EventResolveY(Object1, Object2){}
function EventResolveZ(Object1, Object2){}

// return 1 => (Cancel function of origin)
// return 2 => (ResolveCollisionWithSolid)
// return 3 => (ResolveCollisionElasticity)
// return 4 => (Don't resolve collision)
function OnCollision(Object1,Object2){

    // Default setup
    if(RegObjects[Object1].DeleteOTHERonCollision == true){
        DeleteObject(Object2)
        return 1
    }
    else if(RegObjects[Object2].DeleteOTHERonCollision == true){
        DeleteObject(Object1)
        return 1
    }
    else if(RegObjects[Object1].DeleteOnCollision == true){
        DeleteObject(Object1)
        return 1
    }
    else if(RegObjects[Object2].DeleteOnCollision == true){
        DeleteObject(Object2)
        return 1
    }
    return 3
}