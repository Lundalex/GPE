   // Start Main Loop Function
   function Start() {
    OnStart()

    // Clear graph(fill)
    ctx.beginPath();
    ctx.rect(00, 00, 800, 800);
    ctx.fillStyle = "white";
    ctx.fill();
    
    RunProgram = true

    if(RegObjects.length == 0){
        AddCubeObject(0,0,0,1)
    }
    
    setTimeout(MainLoop, 20)
}
// Start Main Loop Function





// CONSTRUCTOR - RegObjects
function NewRegularObject(INShellXArr, INShellYArr, INShellZArr, INLeaderX, INLeaderY, INLeaderZ,      HitboxSizeX1, HitboxSizeY1, HitboxSizeZ1, HitboxSizeX2, HitboxSizeY2, HitboxSizeZ2,    ObjectType,    VelocityX, VelocityY, VelocityZ,    Mass,    DeleteOnCollision, ConstantForceX, ConstantForceY, ConstantForceZ, ObjectTag) {
    
    if(ObjectTag){
        this.Tag = ObjectTag
    }

    this.FillColor = "#555555"
    this.Opacity = 1

    this.TriDistX = []
    this.TriDistY = []
    this.TriDistZ = []

    this.TriTotlength = []

    this.TriSorted = []

    this.TriDistCameraUnitVectorX = []
    this.TriDistCameraUnitVectorY = []
    this.TriDistCameraUnitVectorZ = []

    this.TriCameraDotProduct = []


    this.TriangleCrossProductUnitVectorX = []
    this.TriangleCrossProductUnitVectorY = []
    this.TriangleCrossProductUnitVectorZ = []

    this.ShellX = INShellXArr;
    this.ShellY = INShellYArr;
    this.ShellZ = INShellZArr;


    this.LeaderX = INLeaderX;
    this.LeaderY = INLeaderY;
    this.LeaderZ = INLeaderZ;

        
    this.ShellprojectedX = [0];
    this.ShellprojectedY = [0];


        this.AnimationInstructionsX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.AnimationInstructionsY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.AnimationInstructionsZ = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        this.AnimationStages = 1
        this.AnimationFrame = Framestage

    // FILL LATER

    this.AnimationPathCoordsX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.AnimationPathCoordsY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.AnimationPathCoordsZ = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    this.AnimationPathProjectedX = [0]
    this.AnimationPathProjectedY = [0]

    this.TotalAnimationDeviationX = 0
    this.TotalAnimationDeviationY = 0
    this.TotalAnimationDeviationZ = 0

    this.DeleteOTHERonCollision = false

    if(ConstantForceX){
        this.ConstantForceX = ConstantForceX}
    else{
        this.ConstantForceX = 0}

    if(ConstantForceY){
        this.ConstantForceY = ConstantForceY}
    else{
        this.ConstantForceY = 0}

    if(ConstantForceZ){
        this.ConstantForceZ = ConstantForceZ}
    else{
        this.ConstantForceZ = 0}

    if(HitboxSizeX1){
        this.HitboxSizeX1 = HitboxSizeX1}
    else{
        this.HitboxSizeX1 = -50}
        
    if(HitboxSizeY1){
        this.HitboxSizeY1 = HitboxSizeY1}
    else{
        this.HitboxSizeY1 = -50}

    if(HitboxSizeZ1){
        this.HitboxSizeZ1 = HitboxSizeZ1}
    else{
        this.HitboxSizeZ1 = -50}

    if(HitboxSizeX2){
        this.HitboxSizeX2 = HitboxSizeX2}
    else{
        this.HitboxSizeX2 = 50}

    if(HitboxSizeY2){
        this.HitboxSizeY2 = HitboxSizeY2}
    else{
        this.HitboxSizeY2 = 50}

    if(HitboxSizeZ2){
        this.HitboxSizeZ2 = HitboxSizeZ2}
    else{
        this.HitboxSizeZ2 = 50}


    this.HitboxProjectedX = [0]
    this.HitboxProjectedY = [0]

    if(ObjectType){
        this.ObjectType = ObjectType}
    else{
        this.ObjectType = ChosenRegObjectType}
    // Animated, Physics

    if(VelocityX){
        this.VelocityX = VelocityX}
    else{
        this.VelocityX = 0}


    if(VelocityY){
        this.VelocityY = VelocityY}
    else{
        this.VelocityY = 0}


    if(VelocityZ){
        this.VelocityZ = VelocityZ}
    else{
        this.VelocityZ = 0}
    

    if(Mass){
        this.Mass = Mass}
    else{
        this.Mass = 100}


    if(DeleteOnCollision){
        this.DeleteOnCollision = true}
    else{
        this.DeleteOnCollision = false}


    this.IsMarked = false;

    this.PointsMarked = [];


    this.RelativePointPositionX = function(PointNumber){
        return this.ShellX[PointNumber] + this.LeaderX
    }

    this.RelativePointPositionY = function(PointNumber){
        return this.ShellY[PointNumber] + this.LeaderY
    }

    this.RelativePointPositionZ = function(PointNumber){
        return this.ShellZ[PointNumber] + this.LeaderZ
    }



    this.AnimationRelativePathCoordPositionX = function(PointNumber){
        return this.AnimationPathCoordsX[PointNumber] + this.LeaderX
    }

    this.AnimationRelativePathCoordPositionY = function(PointNumber){
        return this.AnimationPathCoordsY[PointNumber] + this.LeaderY
    }

    this.AnimationRelativePathCoordPositionZ = function(PointNumber){
        return this.AnimationPathCoordsZ[PointNumber] + this.LeaderZ
    }

    this.HitboxRelativeBoundraryXYZ = function(){
        let SpanXYZ = []

        SpanXYZ.push(this.TotalAnimationDeviationX + this.HitboxSizeX1 + this.LeaderX)
        SpanXYZ.push(this.TotalAnimationDeviationX + this.HitboxSizeX2 + this.LeaderX)
        SpanXYZ.push(this.TotalAnimationDeviationY + this.HitboxSizeY1 + this.LeaderY)
        SpanXYZ.push(this.TotalAnimationDeviationY + this.HitboxSizeY2 + this.LeaderY)
        SpanXYZ.push(this.TotalAnimationDeviationZ + this.HitboxSizeZ1 + this.LeaderZ)
        SpanXYZ.push(this.TotalAnimationDeviationZ + this.HitboxSizeZ2 + this.LeaderZ)

        return SpanXYZ
    }

    this.NextHitboxRelativeBoundraryXYZ = function(Increment){
        let SpanXYZ = []
        let Modifier = 1

        if(Increment){Modifier = Increment}
                                                                                                                         // *20
        SpanXYZ.push(this.TotalAnimationDeviationX + this.HitboxSizeX1 + this.LeaderX + (this.VelocityX - this.ConstantForceX) * ProgramIncrementHertz * 0.05 * Modifier)
        SpanXYZ.push(this.TotalAnimationDeviationX + this.HitboxSizeX2 + this.LeaderX + (this.VelocityX - this.ConstantForceX) * ProgramIncrementHertz * 0.05 * Modifier)
        SpanXYZ.push(this.TotalAnimationDeviationY + this.HitboxSizeY1 + this.LeaderY + (this.VelocityY - this.ConstantForceY) * ProgramIncrementHertz * 0.05 * Modifier)
        SpanXYZ.push(this.TotalAnimationDeviationY + this.HitboxSizeY2 + this.LeaderY + (this.VelocityY - this.ConstantForceY) * ProgramIncrementHertz * 0.05 * Modifier)
        SpanXYZ.push(this.TotalAnimationDeviationZ + this.HitboxSizeZ1 + this.LeaderZ + (this.VelocityZ - this.ConstantForceZ) * ProgramIncrementHertz * 0.05 * Modifier)
        SpanXYZ.push(this.TotalAnimationDeviationZ + this.HitboxSizeZ2 + this.LeaderZ + (this.VelocityZ - this.ConstantForceZ) * ProgramIncrementHertz * 0.05 * Modifier)

        return SpanXYZ
    }
}
// CONSTRUCTOR - RegObjects





// Add New Cube Object Function
function AddCubeObject(INLeaderX, INLeaderY, INLeaderZ, Size,  HitboxSizeX1, HitboxSizeY1, HitboxSizeZ1, HitboxSizeX2, HitboxSizeY2, HitboxSizeZ2,    ObjectType,    VelocityX, VelocityY, VelocityZ,    Mass,    DeleteOnCollision, ConstantForceX, ConstantForceY, ConstantForceZ){
    
    let CDX = -290
    let CDY = -290
    let CDZ = -290

    if(INLeaderX == 0 && INLeaderY == 0 && INLeaderZ == 0){
    CDX = Math.random() * 100 - 50
    CDY = Math.random() * 100 - 50
    CDZ = Math.random() * 100 - 50
    }

    let NewShellLeaderX = 0
    let NewShellLeaderY = 0
    let NewShellLeaderZ = 0

    let NewShellX1
    let NewShellY1
    let NewShellZ1

    if(CUSTOMObjtriDataX[0][0] != 0.2 && CUSTOMObjtriDataY[0][0] != 0.2 && CUSTOMObjtriDataZ[0][0] != 0.2){

        NewShellX1 = CUSTOMObjtriDataX.slice()
        NewShellY1 = CUSTOMObjtriDataY.slice()
        NewShellZ1 = CUSTOMObjtriDataZ.slice()

    }
    else{

        NewShellX1 = CubePresetX.slice()
        NewShellY1 = CubePresetY.slice()
        NewShellZ1 = CubePresetZ.slice()

    }

    let AllValuesX = 0
    let AllValuesY = 0
    let AllValuesZ = 0


    for (let i = 0; i < NewShellX1.length; i++) {

        NewShellX1[i] = NewShellX1[i].map(function Procfunc(num){return num + CDX})
        NewShellY1[i] = NewShellY1[i].map(function Procfunc(num){return num + CDY})
        NewShellZ1[i] = NewShellZ1[i].map(function Procfunc(num){return num + CDZ})

        AllValuesX += NewShellX1[i].reduce(function RedX(total,value){return Number(total)+Number(value)})
        AllValuesY += NewShellY1[i].reduce(function RedX(total,value){return Number(total)+Number(value)})
        AllValuesZ += NewShellZ1[i].reduce(function RedX(total,value){return Number(total)+Number(value)})

    }

    const TotalValueCount = NewShellX1.length * 3
    
    const AverageX = AllValuesX / TotalValueCount
    const AverageY = AllValuesY / TotalValueCount
    const AverageZ = AllValuesZ / TotalValueCount

    if(INLeaderX != 0 || INLeaderY != 0 || INLeaderZ != 0){

        NewShellLeaderX = INLeaderX
        NewShellLeaderY = INLeaderY
        NewShellLeaderZ = INLeaderZ
    }

    else{

        NewShellLeaderX = AverageX
        NewShellLeaderY = AverageY
        NewShellLeaderZ = AverageZ

    }

    for (let i = 0; i < NewShellX1.length; i++) {
    
    NewShellX1[i] = NewShellX1[i].map(function Procfunc(num){return (num-AverageX)*Size})
    NewShellY1[i] = NewShellY1[i].map(function Procfunc(num){return (num-AverageY)*Size})
    NewShellZ1[i] = NewShellZ1[i].map(function Procfunc(num){return (num-AverageZ)*Size})

    }


    RegObjects.push(new NewRegularObject(NewShellX1, NewShellY1, NewShellZ1, NewShellLeaderX, NewShellLeaderY, NewShellLeaderZ,       HitboxSizeX1, HitboxSizeY1, HitboxSizeZ1, HitboxSizeX2, HitboxSizeY2, HitboxSizeZ2,    ObjectType,    VelocityX, VelocityY, VelocityZ,    Mass,    DeleteOnCollision, ConstantForceX, ConstantForceY, ConstantForceZ))
                                                                                                                             // Extra
document.getElementById("ProjectOverviewObjects").innerHTML = new String(RegObjects.length)
}
// Add New Cube Object Function







    // CONTRUCTOR New Spawner Object
    function NewSpawnerObject(SpawnSpaceX1, SpawnSpaceY1, SpawnSpaceZ1, SpawnSpaceX2, SpawnSpaceY2, SpawnSpaceZ2, SpawnedLeaderX, SpawnedLeaderY, SpawnedLeaderZ, SpawnedSize, SpawnedHitboxSizeX1, SpawnedHitboxSizeY1, SpawnedHitboxSizeZ1, SpawnedHitboxSizeX2, SpawnedHitboxSizeY2, SpawnedHitboxSizeZ2, SpawnedVelocityX, SpawnedVelocityY, SpawnedVelocityZ, SpawnedMass, SpawnedDeleteOnCollision, SpawnedObjectCubeSphere, SpawnedConstantForceX, SpawnedConstantForceY, SpawnedConstantForceZ){
    //                            1             2            3             4                5                 6          7                8         9                 10           11                        12                13                     14                    15                   16                 17               18                   19             20                21                      22                        
        
    document.getElementById("ProjectOverviewSpawners").innerHTML = new String(SpawnerObjects.length + 1)

        this.SpawnSpaceX1 = +SpawnSpaceX1 // Def 0
        this.SpawnSpaceY1 = +SpawnSpaceY1 // Def 0
        this.SpawnSpaceZ1 = +SpawnSpaceZ1 // Def 0

        this.SpawnSpaceX2 = +SpawnSpaceX2 // Def 0
        this.SpawnSpaceY2 = +SpawnSpaceY2 // Def 0
        this.SpawnSpaceZ2 = +SpawnSpaceZ2 // Def 0


        this.SpawnedLeaderX = +SpawnedLeaderX // Def 0
        this.SpawnedLeaderY = +SpawnedLeaderY // Def 0
        this.SpawnedLeaderZ = +SpawnedLeaderZ // Def 0

        this.SpawnedSize = +SpawnedSize // Def 1

        this.SpawnedHitboxSizeX1 = +SpawnedHitboxSizeX1 // Def -100
        this.SpawnedHitboxSizeY1 = +SpawnedHitboxSizeY1 // Def -100
        this.SpawnedHitboxSizeZ1 = +SpawnedHitboxSizeZ1 // Def -100

        this.SpawnedHitboxSizeX2 = +SpawnedHitboxSizeX2 // Def 100
        this.SpawnedHitboxSizeY2 = +SpawnedHitboxSizeY2 // Def 100
        this.SpawnedHitboxSizeZ2 = +SpawnedHitboxSizeZ2 // Def 100

        this.SpawnedObjectType = "Physics"

        this.SpawnedVelocityX = +SpawnedVelocityX // Def 0
        this.SpawnedVelocityY = +SpawnedVelocityY // Def 0
        this.SpawnedVelocityZ = +SpawnedVelocityZ // Def 0

        this.SpawnedMass = +SpawnedMass // Def 100


        this.SpawnedDeleteOnCollision = +SpawnedDeleteOnCollision // Def false


        this.SpawnedObjectCubeSphere = SpawnedObjectCubeSphere // Def "Cube"

        this.SpawnedConstantForceX = SpawnedConstantForceX
        this.SpawnedConstantForceY = SpawnedConstantForceY
        this.SpawnedConstantForceZ = SpawnedConstantForceZ

              
        this.Spawn = function(){

            const LeaderX = this.SpawnSpaceX1 + (Math.random() * this.SpawnSpaceX2 - SpawnSpaceX1)
            const LeaderY = this.SpawnSpaceY1 + (Math.random() * this.SpawnSpaceY2 - SpawnSpaceY1)
            const LeaderZ = this.SpawnSpaceZ1 + (Math.random() * this.SpawnSpaceZ2 - SpawnSpaceZ1)

            AddCubeObject(LeaderX, LeaderY, LeaderZ, this.SpawnedSize,this.SpawnedHitboxSizeX1, this.SpawnedHitboxSizeY1, this.SpawnedHitboxSizeZ1, this.SpawnedHitboxSizeX2, this.SpawnedHitboxSizeY2, this.SpawnedHitboxSizeZ2, this.SpawnedObjectType, this.SpawnedVelocityX, this.SpawnedVelocityY, this.SpawnedVelocityZ, this.SpawnedMass, this.SpawnedDeleteOnCollision, this.SpawnedConstantForceX, this.SpawnedConstantForceY, this.SpawnedConstantForceZ)

        }
    }
    // CONTRUCTOR New Spawner Object




// Camera Perspective Function
function CameraPerpectiveHandling(DownX, DownY, UpX, UpY){
    if( (17 < DownX) && (90 < DownY) && (17 < UpX) && (90 < UpY) && (DownX < 817) && (DownY < 890) && (UpX < 817) && (UpY < 890)){
        
        const ChangeX = DownX - UpX
        const ChangeY = DownY - UpY
        
        if((Math.abs(ChangeX) > 200) || (Math.abs(ChangeY) > 200)){

            let NewCameraDirection1 = 0
            let NewCameraDirection2 = 0
            let NewCameraDirection3 = 0

                // Turn Right
                if(ChangeX < -200){

                    NewCameraDirection1 = -CameraDirection3
                    NewCameraDirection2 = CameraDirection2
                    NewCameraDirection3 = CameraDirection1


                }
                // Turn Up
                else if(ChangeY < -200){

                    NewCameraDirection1 = CameraDirection1
                    NewCameraDirection2 = -CameraDirection3
                    NewCameraDirection3 = CameraDirection2
                }
                // Turn Left
                else if(ChangeX > 200){

                    NewCameraDirection1 = CameraDirection3
                    NewCameraDirection2 = CameraDirection2
                    NewCameraDirection3 = -CameraDirection1
                }
                // Turn Down
                else if(ChangeY > 200){

                    NewCameraDirection1 = CameraDirection1
                    NewCameraDirection2 = CameraDirection3
                    NewCameraDirection3 = -CameraDirection2
                }
                CameraDirection1 = NewCameraDirection1
                CameraDirection2 = NewCameraDirection2
                CameraDirection3 = NewCameraDirection3
        }
    }
}
// Camera Perspective Function





// Delete Found Object Function
function DeleteFoundObject(FoundObjectNumber){
    let Continue = OnDeleteFoundObject(FoundObjectNumber)
    if(!Continue){return}


    let CopyArr = []
    for (let i = 0; i < RegObjects.length; i++) {
        if(i != FoundObjectNumber){

            CopyArr.push(RegObjects[i])

        }    
    }
    RegObjects = CopyArr
    FoundObjectNumber = 0
}
// Delete Found Object Function





// Delete Found Object Function
function DeleteObject(ObjectNumber){
    let Continue = OnDeleteObject(ObjectNumber)
    if(!Continue){return}

    let CopyArr = []
    for (let i = 0; i < RegObjects.length; i++) {
        if(i != ObjectNumber){

            CopyArr.push(RegObjects[i])

        }    
    }
    RegObjects = CopyArr
    FoundObjectNumber = 0
}
// Delete Found Object Function




// Project Function
function Project2D(XY, Z){
    return (XY * FocalLength) / (Z + FocalLength)
}
// Project Function




// Draw Line Function
function DrawLine(X1,X2,Y1,Y2,Color,Thickness){
    ctx.beginPath()
    ctx.moveTo(((290+(+X1))),(290+(+Y1)));
    ctx.lineTo(((290+(+X2))),(290+(+Y2)));
    ctx.strokeStyle = new String(Color)
    ctx.lineWidth = +Thickness
    ctx.stroke()
}
// Draw Line Function




function FillTriangle(X1,X2,X3,Y1,Y2,Y3,Cameralight, FillColorHex, Opacity){

    // Cameralight -1 < C > 0
    let hexR = +hexToRgb(FillColorHex).r
    let hexG = +hexToRgb(FillColorHex).g
    let hexB = +hexToRgb(FillColorHex).b
    
    // Cameralight -1 < C > 0
    hexR = Math.round(hexR * (1 - Cameralight))
    hexG = Math.round(hexG * (1 - Cameralight))
    hexB = Math.round(hexB * (1 - Cameralight))

    // Opacity 1 < O > 1
    // 0 = No opacity
    const filler = "rgba(" + hexR + "," + hexG + "," + hexB + "," + Opacity + ")"

    ctx.fillStyle = filler

    ctx.beginPath();     //Begin a path..
    ctx.moveTo(X1+290, Y1+290);  //Startpoint (x, y)
    ctx.lineTo(X2+290, Y2+290); //Point 1    (x, y)
    ctx.lineTo(X3+290, Y3+290);  //Point 2    (x, y)
    ctx.closePath();     //Close the path.
    //Fill triangle with previous set color.
    ctx.fill()

}



// Import
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }


  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
// Import





// Camera Orientation Function (LOGIC TABLE)
function ApplyCameraPerspective(X, Y, Z){
    
    let NewX = 0
    let NewY = 0
    let NewZ = 0
    
    if(CameraDirection1 == 1){
        NewX = X
    }
    else if(CameraDirection1 == -1){
        NewX = -X
    }
    else if(CameraDirection1 == 2){
        NewX = Y
    }
    else if(CameraDirection1 == -2){
        NewX = -Y
    }
    else if(CameraDirection1 == 3){
        NewX = Z
    }
    else if(CameraDirection1 == -3){
        NewX = -Z
    }
    
    if(CameraDirection2 == 1){
        NewY = X
    }
    else if(CameraDirection2 == -1){
        NewY = -X
    }
    else if(CameraDirection2 == 2){
        NewY = Y
    }
    else if(CameraDirection2 == -2){
        NewY = -Y
    }
    else if(CameraDirection2 == 3){
        NewY = Z
    }
    else if(CameraDirection2 == -3){
        NewY = -Z
    }
    
    if(CameraDirection3 == 1){
        NewZ = X
    }
    else if(CameraDirection3 == -1){
        NewZ = -X
    }
    else if(CameraDirection3 == 2){
        NewZ = Y
    }
    else if(CameraDirection3 == -2){
        NewZ = -Y
    }
    else if(CameraDirection3 == 3){
        NewZ = Z
    }
    else if(CameraDirection3 == -3){
        NewZ = -Z
    }
    return [NewX, NewY, NewZ]
}
// Camera Orientation Function (LOGIC TABLE)




// Physics Functions
function ResolveCollisionWithSolid(Object1, Object2){

    let Hitbox1 = RegObjects[Object1].HitboxRelativeBoundraryXYZ()
    let Hitbox2 = RegObjects[Object2].HitboxRelativeBoundraryXYZ()

    // Resolve X
    if(!(((Hitbox1[0] > Hitbox2[0]) && (Hitbox1[0] < Hitbox2[1])) || ((Hitbox1[1] > Hitbox2[0]) && (Hitbox1[1] < Hitbox2[1])))){
        EventSolidResolveX(Object1, Object2)

        
        let Modifier = 1
        let NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
        let NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        
        while((((NewHitbox1[0] > NewHitbox2[0]) && (NewHitbox1[0] < NewHitbox2[1])) || ((NewHitbox1[1] > NewHitbox2[0]) && (NewHitbox1[1] < NewHitbox2[1])))){
            Modifier -= 0.01
            NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
            NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        }
        RegObjects[Object1].LeaderX += RegObjects[Object1].VelocityX  * ProgramIncrementHertz * 0.05 * (Modifier)
        RegObjects[Object2].LeaderX += RegObjects[Object2].VelocityX  * ProgramIncrementHertz * 0.05 * (Modifier)
        
        RegObjects[Object1].VelocityX = 0
        RegObjects[Object2].VelocityX = 0
    }

    // Resolve Y
    if(!(((Hitbox1[2] > Hitbox2[2]) && (Hitbox1[2] < Hitbox2[3])) || ((Hitbox1[3] > Hitbox2[2]) && (Hitbox1[3] < Hitbox2[3])))){
        EventSolidResolveY(Object1, Object2)

        
        let Modifier = 1
        let NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
        let NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        
        while((((NewHitbox1[2] > NewHitbox2[2]) && (NewHitbox1[2] < NewHitbox2[3])) || ((NewHitbox1[3] > NewHitbox2[2]) && (NewHitbox1[3] < NewHitbox2[3])))){
            Modifier -= 0.01
            NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
            NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        }
        RegObjects[Object1].LeaderY += RegObjects[Object1].VelocityY  * ProgramIncrementHertz * 0.05 * (Modifier)
        RegObjects[Object2].LeaderY += RegObjects[Object2].VelocityY  * ProgramIncrementHertz * 0.05 * (Modifier)

        RegObjects[Object1].VelocityY = 0
        RegObjects[Object2].VelocityY = 0
    }

    // Resolve Z
    if(!(((Hitbox1[4] > Hitbox2[4]) && (Hitbox1[4] < Hitbox2[5])) || ((Hitbox1[5] > Hitbox2[4]) && (Hitbox1[5] < Hitbox2[5])))){
        EventSolidResolveZ(Object1, Object2)

        
        let Modifier = 1
        let NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
        let NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        
        while((((NewHitbox1[4] > NewHitbox2[4]) && (NewHitbox1[4] < NewHitbox2[5])) || ((NewHitbox1[5] > NewHitbox2[4]) && (NewHitbox1[5] < NewHitbox2[5])))){
            Modifier -= 0.01
            NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
            NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        }
        RegObjects[Object1].LeaderZ += RegObjects[Object1].VelocityZ  * ProgramIncrementHertz * 0.05 * (Modifier)
        RegObjects[Object2].LeaderZ += RegObjects[Object2].VelocityZ  * ProgramIncrementHertz * 0.05 * (Modifier)

        RegObjects[Object1].VelocityZ = 0
        RegObjects[Object2].VelocityZ = 0
    }

}

function ResolveCollisionElasticity(Object1, Object2){ // Also uses Global variable "Elasticity"
                                                
                        // Collision X
                        
                        // Elasticity = 0 Method
                        const ForceX1 = RegObjects[Object1].Mass * RegObjects[Object1].VelocityX
                        const ForceX2 = RegObjects[Object2].Mass * RegObjects[Object2].VelocityX
                        
                        const ForceTotalX = ForceX1 + ForceX2
                        
                        const NoneElasticityVelocityX1 = ForceTotalX*0.5 / RegObjects[Object1].Mass
                        const NoneElasticityVelocityX2 = ForceTotalX*0.5 / RegObjects[Object2].Mass
                        
                        
                        // Elasticity = 1 Method
                        
                        const MaxElasticityVelocityX1 = ForceX2 / RegObjects[Object1].Mass
                        const MaxElasticityVelocityX2 = ForceX1 / RegObjects[Object2].Mass
                        
                        // Weighted
                        
                        RegObjects[Object1].VelocityX = ((NoneElasticityVelocityX1 * (1-Elasticity)) + (MaxElasticityVelocityX1 * Elasticity))
                        RegObjects[Object2].VelocityX = ((NoneElasticityVelocityX2 * (1-Elasticity)) + (MaxElasticityVelocityX2 * Elasticity))
                        
                        // Collision Y
                        
                        // Elasticity = 0 Method
                        const ForceY1 = RegObjects[Object1].Mass * RegObjects[Object1].VelocityY
                        const ForceY2 = RegObjects[Object2].Mass * RegObjects[Object2].VelocityY
                        
                        const ForceTotalY = ForceY1 + ForceY2
                        
                        const NoneElasticityVelocityY1 = ForceTotalY*0.5 / RegObjects[Object1].Mass
                        const NoneElasticityVelocityY2 = ForceTotalY*0.5 / RegObjects[Object2].Mass
                        
                        
                        // Elasticity = 1 Method
                        
                        const MaxElasticityVelocityY1 = ForceY2 / RegObjects[Object1].Mass
                        const MaxElasticityVelocityY2 = ForceY1 / RegObjects[Object2].Mass
                        
                        // Weighted
                        
                        RegObjects[Object1].VelocityY = ((NoneElasticityVelocityY1 * (1-Elasticity)) + (MaxElasticityVelocityY1 * Elasticity))
                        RegObjects[Object2].VelocityY = ((NoneElasticityVelocityY2 * (1-Elasticity)) + (MaxElasticityVelocityY2 * Elasticity))
                        
                        // Collision Z
                        
                        // Elasticity = 0 Method
                        const ForceZ1 = RegObjects[Object1].Mass * RegObjects[Object1].VelocityZ
                        const ForceZ2 = RegObjects[Object2].Mass * RegObjects[Object2].VelocityZ
                        
                        const ForceTotalZ = ForceZ1 + ForceZ2
                        
                        const NoneElasticityVelocityZ1 = ForceTotalZ*0.5 / RegObjects[Object1].Mass
                        const NoneElasticityVelocityZ2 = ForceTotalZ*0.5 / RegObjects[Object2].Mass
                        
                        
                        // Elasticity = 1 Method
                        
                        const MaxElasticityVelocityZ1 = ForceZ2 / RegObjects[Object1].Mass
                        const MaxElasticityVelocityZ2 = ForceZ1 / RegObjects[Object2].Mass
                        
                        // Weighted
                        
                        RegObjects[Object1].VelocityZ = ((NoneElasticityVelocityZ1 * (1-Elasticity)) + (MaxElasticityVelocityZ1 * Elasticity))
                        RegObjects[Object2].VelocityZ = ((NoneElasticityVelocityZ2 * (1-Elasticity)) + (MaxElasticityVelocityZ2 * Elasticity))


}








// RENDERING ENGINE FUNCTIONS


function CalculateTriangleCrossproducts(){

    for (let i = 0; i < RegObjects.length; i++) {

        RegObjects[i].TriangleCrossProductUnitVectorX = []
        RegObjects[i].TriangleCrossProductUnitVectorY = []
        RegObjects[i].TriangleCrossProductUnitVectorZ = []

        for (let o = 0; o < RegObjects[i].ShellX.length; o++) {

            let Vector1X = RegObjects[i].ShellX[o][0] - RegObjects[i].ShellX[o][1]
            let Vector2X = RegObjects[i].ShellX[o][0] - RegObjects[i].ShellX[o][2]
            let Vector1Y = RegObjects[i].ShellY[o][0] - RegObjects[i].ShellY[o][1]
            let Vector2Y = RegObjects[i].ShellY[o][0] - RegObjects[i].ShellY[o][2]
            let Vector1Z = RegObjects[i].ShellZ[o][0] - RegObjects[i].ShellZ[o][1]
            let Vector2Z = RegObjects[i].ShellZ[o][0] - RegObjects[i].ShellZ[o][2]

            let CrossProductVectorX = Vector1Y * Vector2Z - Vector2Y * Vector1Z
            let CrossProductVectorY = Vector1Z * Vector2X - Vector2Z * Vector1X
            let CrossProductVectorZ = Vector1X * Vector2Y - Vector2X * Vector1Y

            const XYZArr = ApplyCameraPerspective(CrossProductVectorX, CrossProductVectorY, CrossProductVectorZ)
                
            const X = XYZArr[0]
            const Y = XYZArr[1]
            const Z = XYZArr[2]
                
            let PythPheoremCrossproduct = Math.sqrt(Math.abs(Math.pow(X,2)) + Math.abs(Math.pow(Y,2)) + Math.abs(Math.pow(Z,2)))

            RegObjects[i].TriangleCrossProductUnitVectorX.push(X / PythPheoremCrossproduct)
            RegObjects[i].TriangleCrossProductUnitVectorY.push(Y / PythPheoremCrossproduct)
            RegObjects[i].TriangleCrossProductUnitVectorZ.push(Z / PythPheoremCrossproduct)

        }
    }
}


function CalculateCameraObjectVectorAndSortByDistance(){

    TriSorted = []

    for (let i = 0; i < RegObjects.length; i++) {
        for (let o = 0; o < RegObjects[i].ShellX.length; o++) {

            RegObjects[i].TriDistX[o] = ((RegObjects[i].ShellX[o][0] + RegObjects[i].ShellX[o][1] + RegObjects[i].ShellX[o][2]) / 3) + RegObjects[i].LeaderX + Number(RegObjects[i].TotalAnimationDeviationX) 
            RegObjects[i].TriDistY[o] = ((RegObjects[i].ShellY[o][0] + RegObjects[i].ShellY[o][1] + RegObjects[i].ShellY[o][2]) / 3) + RegObjects[i].LeaderY + Number(RegObjects[i].TotalAnimationDeviationY)
            RegObjects[i].TriDistZ[o] = ((RegObjects[i].ShellZ[o][0] + RegObjects[i].ShellZ[o][1] + RegObjects[i].ShellZ[o][2]) / 3) + RegObjects[i].LeaderZ + Number(RegObjects[i].TotalAnimationDeviationZ)

            const XYZArr = ApplyCameraPerspective(RegObjects[i].TriDistX[o], RegObjects[i].TriDistY[o], RegObjects[i].TriDistZ[o])
                
            const X = XYZArr[0] + CameraOffsetX
            const Y = XYZArr[1] + CameraOffsetY
            const Z = XYZArr[2] + CameraOffsetZ + FocalLength
            // Correct

            RegObjects[i].TriTotlength[o] = Math.sqrt(Math.pow(X,2) + Math.pow(Y,2) + Math.pow(Z,2))

            RegObjects[i].TriDistCameraUnitVectorX[o] = X / RegObjects[i].TriTotlength[o]
            RegObjects[i].TriDistCameraUnitVectorY[o] = Y / RegObjects[i].TriTotlength[o]
            RegObjects[i].TriDistCameraUnitVectorZ[o] = Z / RegObjects[i].TriTotlength[o]

            RegObjects[i].TriCameraDotProduct[o] = RegObjects[i].TriDistCameraUnitVectorX[o] * RegObjects[i].TriangleCrossProductUnitVectorX[o] + RegObjects[i].TriDistCameraUnitVectorY[o] * RegObjects[i].TriangleCrossProductUnitVectorY[o] + RegObjects[i].TriDistCameraUnitVectorZ[o] * RegObjects[i].TriangleCrossProductUnitVectorZ[o]
            // Important

            TriSorted.push({ObjNumber: i, TriNumber: o, DistValue: RegObjects[i].TriTotlength[o]})
        }
    }


    TriSorted = TriSorted.sort(function(a, b){return b.DistValue - a.DistValue})

}