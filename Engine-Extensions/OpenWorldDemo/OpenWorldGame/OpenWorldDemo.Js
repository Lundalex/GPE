// Parameters - AddCubeObject/AddSphereObject:
// (Necessary) INLeaderX, INLeaderY, INLeaderZ, Size, 
// (Optional)InShellX, InShellY, InShellZ, HitboxSizeX1, HitboxSizeY1, HitboxSizeZ1, HitboxSizeX2, HitboxSizeY2, HitboxSizeZ2, ObjectType, VelocityX, VelocityY, VelocityZ, Mass, DeleteOnCollision, ConstantForceX, ConstantForceY, ConstantForceZ

// Parameters - new NewSpawnerObject:
// (Necessary) SpawnSpaceX1, SpawnSpaceY1, SpawnSpaceZ1, SpawnSpaceX2, SpawnSpaceY2, SpawnSpaceZ2, SpawnedLeaderX, SpawnedLeaderY, SpawnedLeaderZ, SpawnedSize, SpawnedHitboxSizeX1, SpawnedHitboxSizeY1, SpawnedHitboxSizeZ1, SpawnedHitboxSizeX2, SpawnedHitboxSizeY2, SpawnedHitboxSizeZ2, SpawnedVelocityX, SpawnedVelocityY, SpawnedVelocityZ, SpawnedMass, SpawnedDeleteOnCollision, SpawnedObjectCubeSphere, SpawnedConstantForceX, SpawnedConstantForceY, SpawnedConstantForceZ

// Default OBJ-data
let Textdata = "# Blender v3.3.1 OBJ File: ''# www.blender.orgo Cubev -78.750534 12.625371 12.625371v -78.750534 -12.625371 12.625371v -78.750534 12.625371 -12.625371v -78.750534 -12.625371 -12.625371v 78.750534 12.625371 12.625371v 78.750534 -12.625371 12.625371v 78.750534 12.625371 -12.625371v 78.750534 -12.625371 -12.625371s offf 5 3 1f 3 8 4f 7 6 8f 2 8 6f 1 4 2f 5 2 6f 5 7 3f 3 7 8f 7 5 6f 2 4 8f 1 3 4f 5 1 2"

// return "bool(false) to cancel function of origin"
function OnDeleteFoundObject(FoundObjectNumber){return true}
function OnDeleteObject(ObjectNumber){return true}
function OnScroll(ScrollValue){return true}

// "Eventlisteners" for X/Y/Z resolved by ResolveCollisionWithSolid()
// return "bool(false) to cancel function of origin"
function EventResolveX(Object1, Object2){}
function EventResolveY(Object1, Object2){
    JumpAvailable = true
    // Might couse bugs!!!
    // if(Object1 == PlayerObj || Object2 == PlayerObj){JumpAvailable = true}
}
function EventResolveZ(Object1, Object2){}

// return 1 => (Cancel function of origin)
// return 2 => (ResolveCollisionWithSolid)
// return 3 => (ResolveCollisionElasticity)
// return 4 => (Don't resolve collision)
function OnCollision(Object1,Object2){
    return 2
}
let RegObjectsBank = []

let PlayerObj = 0

let WorldTileMap = []

let JumpAvailable = true


// (2 ^ 5 = 32)
let WorldSizePow = 6

let WorldHeight = 6

let ChunkSizePow = 1

// r. Ex: 1 => Show only PlayerPosChunk, 2 => Also show adjacent chunks(5 tot)
let ChunkRenderDistance = 5


let truecounter = 0

// let FrameCounter = 5



// let WorldSize = Math.pow(2,WorldSizePow)

// Def 2
// Lower Value => Higher impact by higher pitches
let PitchWeight = 0.5

WorldTileMap = Create3DPerlinNoise(WorldSizePow, PitchWeight, WorldHeight, 6, 5, 4, 2)
// console.log(WorldTileMap)
// console.log(RegObjects)

// Places ALL EngineObjects in 3D space. Some for later use - thus not by chunk proximity
ConstructTileMap(WorldTileMap)

let WorldChunkTileMap = ConstructTileMapChunkConverted(WorldTileMap, ChunkSizePow)






let emptycopyarr = []
for (let ChunkXCounter = 0; ChunkXCounter < WorldChunkTileMap.length; ChunkXCounter++) {
    emptycopyarr[ChunkXCounter] = []
    for (let ChunkYCounter = 0; ChunkYCounter < WorldChunkTileMap[ChunkXCounter].length; ChunkYCounter++) {
        emptycopyarr[ChunkXCounter][ChunkYCounter] = "Not Rendered"

    }
}

let ChunkTileMapProximityFiltered =
{

    FilteredChunkTileMap: emptycopyarr,

    AddChunk: function (ChunkX, ChunkY) {

        this.FilteredChunkTileMap[ChunkX][ChunkY] = WorldChunkTileMap[ChunkX][ChunkY].slice()

    },

    RemoveChunk: function (ChunkX, ChunkY) {
        
        this.FilteredChunkTileMap[ChunkX][ChunkY] = "Not Rendered"

    },
}
// Optimise Rendering routine
// CHANGE INPUT LATER


// ChunkTileMapProximityFiltered.AddChunk(0, 0, WorldSizePow, ChunkSizePow)
// ChunkTileMapProximityFiltered.AddChunk(0, 1, WorldSizePow, ChunkSizePow)
// ChunkTileMapProximityFiltered.AddChunk(1, 0, WorldSizePow, ChunkSizePow)
// ChunkTileMapProximityFiltered.AddChunk(1, 1, WorldSizePow, ChunkSizePow)


function UpdateChunkMap(WorldSizePow, ChunkSizePow, ChunkMap){


    const WorldSize = Math.pow(2,WorldSizePow)

    const ChunkSize = Math.pow(2,ChunkSizePow)

    let ReturnArr = []

    for (let X = 0; X < WorldSize; X++) {
        ReturnArr[X] = []
        for (let Y = 0; Y < WorldSize; Y++) {
            ReturnArr[X][Y] = []
        //                    (Z)
        }
    }

    for (let CX = 0; CX < ChunkMap.length; CX++) {
        for (let CY = 0; CY < ChunkMap[CX].length; CY++) {
            if(ChunkMap[CX][CY] == "Not Rendered"){continue}
            for (let X = 0; X < ChunkMap[CX][CY].length; X++) {
                for (let Y = 0; Y < ChunkMap[CX][CY][X].length; Y++) {

                    ReturnArr[CX * ChunkSize + X][CY * ChunkSize + Y] = WorldChunkTileMap[CX][CY][X][Y]

                }
            }
        }
    }
    // console.log("NewFiltered-RemovedChunk")
    // console.log(ReturnArr)

    // Instead of return
    OptimiseVisibility(ReturnArr)
}





function OnStart(){
    AddCubeObject(4,500,13,0.6)
    // Size *0 temporary
    PlayerObj = RegObjectsBank.length-1
    RegObjectsBank[PlayerObj].HitboxSizeX1 = -30
    RegObjectsBank[PlayerObj].HitboxSizeX2 = 30
    RegObjectsBank[PlayerObj].HitboxSizeY1 = -30
    RegObjectsBank[PlayerObj].HitboxSizeY2 = 30
    RegObjectsBank[PlayerObj].HitboxSizeZ1 = -30
    RegObjectsBank[PlayerObj].HitboxSizeZ2 = 30
    RegObjectsBank[PlayerObj].FillColor = "#000073"
    RegObjectsBank[PlayerObj].ConstantForceY = -100
    RegObjectsBank[PlayerObj].Visible = true
    return true
}
 
function OnNewFrame(){
    

    RegObjects[PlayerObj] = RegObjectsBank[PlayerObj]

    const PerspectiveArr = ApplyCameraPerspective(RegObjects[PlayerObj].LeaderX, RegObjects[PlayerObj].LeaderY, RegObjects[PlayerObj].LeaderZ)
    CameraOffsetX = -PerspectiveArr[0]
    CameraOffsetY = -PerspectiveArr[1] + 50       +400
    CameraOffsetZ = -PerspectiveArr[2] - 700      +2000
    // +400, +2000 temporary - removal might couse rendering bugs!
    

    // Update ChunkLoading

    // if(FrameCounter < 4){
    const ChunkSize = Math.pow(2,ChunkSizePow)
    PlayerChunkPosX = Math.floor(((RegObjects[PlayerObj].LeaderX + 50) + (Math.pow(2,WorldSizePow)/2)*100) / (100*ChunkSize))
    PlayerChunkPosY = Math.floor(((RegObjects[PlayerObj].LeaderZ + 50) + (Math.pow(2,WorldSizePow)/2)*100) / (100*ChunkSize))
    // +(50*Math.pow(2,ChunkSizePow)+50)
    for (let CX = 0; CX < WorldChunkTileMap.length; CX++) {
        for (let CY = 0; CY < WorldChunkTileMap[CX].length; CY++) {
            ChunkPlayerDistance = Math.abs(CX-PlayerChunkPosX) + Math.abs(CY-PlayerChunkPosY)

            if(ChunkPlayerDistance < ChunkRenderDistance){ChunkTileMapProximityFiltered.AddChunk(CX, CY)}
            else{ChunkTileMapProximityFiltered.RemoveChunk(CX, CY)}
        }
    }

    UpdateChunkMap(WorldSizePow, ChunkSizePow, ChunkTileMapProximityFiltered.FilteredChunkTileMap)

    
    // Update ChunkLoading
    // console.log(PlayerChunkPosX)
    // FrameCounter = 0
    // }
    // else{FrameCounter++}


    return true
}




function OnKeyPress(PressedKey){

    let VelocityX = 0
    let VelocityY = 0
    let VelocityZ = 0
 
    switch (PressedKey) {
        case " ":
            if(JumpAvailable == true){
                VelocityY = 800
            JumpAvailable = false}

            break;
        case "a":
            VelocityX = -50
            // if(LeaderX < -400){LeaderX = -400}

            break;
        case "d":
            VelocityX = 50
            // if(LeaderX > 400){LeaderX = 400}

            break;

        case "s":
            VelocityZ = -50
            // if(LeaderZ < -400){LeaderZ = -400}

            break;
        case "w":
            VelocityZ = 50
            // if(LeaderZ > 400){LeaderZ = 400}

            break;
            
    
        default:
            return true
    }

    const PerspectiveArr = ApplyCameraPerspectivePLAYERMODIFIED(VelocityX, VelocityY, VelocityZ)

    RegObjectsBank[PlayerObj].VelocityX += PerspectiveArr[0]
    RegObjectsBank[PlayerObj].VelocityY += PerspectiveArr[1]
    RegObjectsBank[PlayerObj].VelocityZ += PerspectiveArr[2]

    if(RegObjectsBank[PlayerObj].VelocityX > 400){RegObjectsBank[PlayerObj].VelocityX = 400}
    if(RegObjectsBank[PlayerObj].VelocityX < -400){RegObjectsBank[PlayerObj].VelocityX = -400}

    if(RegObjectsBank[PlayerObj].VelocityZ > 400){RegObjectsBank[PlayerObj].VelocityZ = 400}
    if(RegObjectsBank[PlayerObj].VelocityZ < -400){RegObjectsBank[PlayerObj].VelocityZ = -400}

    return false
}



function ConstructTileMapChunkConverted(WorldTileMap, ChunkSizePow){

    const ChunkSize = Math.pow(2, ChunkSizePow)

    let ReturnedChunkTileMap = []

    for (let ChunkX = 0; ChunkX < WorldTileMap.length / ChunkSize; ChunkX++) {
        ReturnedChunkTileMap[ChunkX] = []

        for (let ChunkY = 0; ChunkY < WorldTileMap[1].length / ChunkSize; ChunkY++) {

            // Necessary?
            ReturnedChunkTileMap[ChunkX][ChunkY] = []

              // newChunkXFOCUS t.ex = 12-16 (Chunk X4 pos)
            for (let NewChunkXFocus = ChunkSize * ChunkX; NewChunkXFocus < ChunkSize * (ChunkX+1); NewChunkXFocus++) {
                ReturnedChunkTileMap[ChunkX][ChunkY][NewChunkXFocus % ChunkSize] = []

                for (let NewChunkYFocus = ChunkSize * ChunkY; NewChunkYFocus < ChunkSize * (ChunkY+1); NewChunkYFocus++) {
                    // ReturnedChunkTileMap[ChunkX][ChunkY][NewChunkXFocus][NewChunkYFocus] = []
                    console.log(ReturnedChunkTileMap)

                    ReturnedChunkTileMap[ChunkX][ChunkY][NewChunkXFocus % ChunkSize][NewChunkYFocus % ChunkSize] = WorldTileMap[NewChunkXFocus][NewChunkYFocus]
                    // ReturnedChunkTileMap[all ChunkX][all ChunkY][all x][all y] =  z arr[] with:                               X                Y             (Complete Z Tiles arr)
                }
            }
        }
    }

// console.log("ReturnedChunkTileMap:")
// console.log(ReturnedChunkTileMap)

    return ReturnedChunkTileMap
}

function OptimiseVisibility(TileMap3D){

    // for (let i = 0; i < RegObjects.length; i++) {
    //     RegObjects[i].Visible = false
        
    // }
    // RegObjects[PlayerObj].Visible = true

    RegObjects = []

    RegObjects[0] = RegObjectsBank[PlayerObj]

    const ChunkSize = Math.pow(2, ChunkSizePow)

    for (let x = 0; x < TileMap3D.length; x++) {
        for (let y = 0; y < TileMap3D[x].length; y++) {

            for (let z = 0; z < TileMap3D[x][y].length; z++) {

                if(TileMap3D[x][y][z] != undefined){

                    // Change (x+1 > TileMap3D.length-1) to (x+1 > TileMap3D.length-1) (- "-1") for visualisation
                    // Changed (z-1 < 0) to (z < 0) for removal of world floor
                    if((x-1 < 0)||(x+1 > TileMap3D.length-1)||(y-1 < 0)||(y+1 > TileMap3D[x].length-1)||(z < 0)||(z+1 > TileMap3D[x][y].length-1)){
                        if(TileMap3D[x][y][z]){
                            RegObjects.push(RegObjectsBank.find((Object) => ((Object.GridXPos == x) && (Object.GridYPos == y) && (Object.GridZPos == z))))
                        truecounter++
                        }
                        // else{RegObjects.find((Object) => ((Object.GridXPos == x) && (Object.GridYPos == y) && (Object.GridZPos == z))).Visible = false}
                    }
                    // removed (TileMap3D[x][y][z-1] == undefined)||
                    else if(((TileMap3D[x-1][y][z] == undefined)||(TileMap3D[x+1][y][z] == undefined)||(TileMap3D[x][y-1][z] == undefined)||(TileMap3D[x][y+1][z] == undefined)||(TileMap3D[x][y][z+1] == undefined)) || ((TileMap3D[x-1][y][z] == "Water")||(TileMap3D[x+1][y][z] == "Water")||(TileMap3D[x][y-1][z] == "Water")||(TileMap3D[x][y+1][z] == "Water")||(TileMap3D[x][y][z-1] == "Water")||(TileMap3D[x][y][z+1] == "Water"))){
                        if(TileMap3D[x][y][z]){
                            RegObjects.push(RegObjectsBank.find((Object) => ((Object.GridXPos == x) && (Object.GridYPos == y) && (Object.GridZPos == z))))
                            truecounter++
                        }
                        // else{RegObjects.find((Object) => ((Object.GridXPos == x) && (Object.GridYPos == y) && (Object.GridZPos == z))).Visible = false}

                    }
                }
            }
        }
    }
}





function ConstructTileMap(Arr3D){
    let Import3DArr = Arr3D

    for (let x = 0; x < Import3DArr.length; x++) {
        for (let y = 0; y < Import3DArr[x].length; y++) {
            for (let z = 0; z < Import3DArr[x][y].length; z++) {

                AddCubeObject(x*100-Import3DArr.length*50, -z*100+WorldHeight*100+500, y*100-Import3DArr[x].length*50, 1)
                const ObjIndex = RegObjectsBank.length-1

                RegObjectsBank[ObjIndex].GridXPos = x
                RegObjectsBank[ObjIndex].GridYPos = y
                RegObjectsBank[ObjIndex].GridZPos = z

                if(Import3DArr[x][y][z] == "SnowCapped"){RegObjectsBank[ObjIndex].FillColor = "#e6e6e6"}
                else if(Import3DArr[x][y][z] == "Rocky"){RegObjectsBank[ObjIndex].FillColor = "#4d4d4d"}
                else if(Import3DArr[x][y][z] == "Grass"){RegObjectsBank[ObjIndex].FillColor = "#1fd655"}
                else if(Import3DArr[x][y][z] == "Beach"){RegObjectsBank[ObjIndex].FillColor = "#e6cc00"}
                else if(Import3DArr[x][y][z] == "Water"){
                    RegObjectsBank[ObjIndex].FillColor = "#000073"
                    RegObjectsBank[ObjIndex].Opacity = 0.3
                }
            
            }
        }
    }
}





// features: SnowCapped, Rocky, Grass, Beach, (Fill empty with Water)
function Create3DPerlinNoise(WorldSizePow, PitchWeight, WorldHeight, SnowCappedHeight, RockyHeight, GrassHeigth, WaterHeight){

    let WorldSpan = Math.pow(2, WorldSizePow)

    let Perlin2DArr = PerlinNoise2DArray(WorldSizePow, PitchWeight, WorldHeight)

    let World3DTileMapArray = []

    for (let x = 0; x < WorldSpan; x++) {
        World3DTileMapArray[x] = []

        for (let y = 0; y < WorldSpan; y++) {
            World3DTileMapArray[x][y] = []

            const TileHeightValue = Perlin2DArr[x][y]

            let HeightGroup = ""

            if(TileHeightValue > SnowCappedHeight){HeightGroup = "SnowCapped"}
            else if(TileHeightValue > RockyHeight){HeightGroup = "Rocky"}
            else if(TileHeightValue > GrassHeigth){HeightGroup = "Grass"}
            else{HeightGroup = "Beach"}

            World3DTileMapArray[x][y][TileHeightValue-1] = HeightGroup

            for (let z = 0; z < TileHeightValue-1; z++) {

                World3DTileMapArray[x][y][z] = "Rocky"

            }

            if(TileHeightValue > WaterHeight){continue}

            for (let z = TileHeightValue; z <= WaterHeight; z++) {

                World3DTileMapArray[x][y][z] = "Water"

            }

        }
        
    }

    return World3DTileMapArray


}




function PerlinNoise2DArray(WorldSizePow, PerlinPitchWeight, WorldHeight){

    const PerlinArrXLow = PerlinNoiseArray(WorldSizePow, PerlinPitchWeight)
    const PerlinArrXHigh = PerlinNoiseArray(WorldSizePow, PerlinPitchWeight)

    const PerlinArrYLow = PerlinNoiseArray(WorldSizePow, PerlinPitchWeight)
    const PerlinArrYHigh = PerlinNoiseArray(WorldSizePow, PerlinPitchWeight)

    // [x][y]
    let PerlinNoise2DArray = []

    for (let x = 0; x < PerlinArrYHigh.length; x++) {
        PerlinNoise2DArray[x] = []
        for (let y = 0; y < PerlinArrXHigh.length; y++) {
            // X coord value
            const LinearInterpolateXValue = PerlinArrYLow[x] + ((y / (PerlinArrXLow.length)) * (PerlinArrYHigh[x] - PerlinArrYLow[x]))

            // Y coord value
            const LinearInterpolateYValue = PerlinArrXLow[y] + ((x / (PerlinArrYLow.length)) * (PerlinArrXHigh[y] - PerlinArrXLow[y]))

            PerlinNoise2DArray[x][y] = (LinearInterpolateXValue + LinearInterpolateYValue) / 2
        }
    }

    for (let i = 0; i < PerlinNoise2DArray.length; i++) {

        PerlinNoise2DArray[i] = PerlinNoise2DArray[i].map(function (num){return Math.ceil(num * WorldHeight)})

    }

    return PerlinNoise2DArray

}



function PerlinNoiseArray(ArrSizePow, PitchWeight){

    const ArrLength = Math.pow(2, ArrSizePow)

    let SeedArray = RandomArray(ArrLength)

    let Multiplier = 1

    let TotDivide = 0

    // Prepare Perlin Array
    let PerlinArray = []
    for (let i = 0; i < ArrLength; i++) {PerlinArray[i] = 0}

    for (let i = 1; i <= ArrSizePow; i++) {

        const PitchDiv = ArrLength / (Math.pow(2,i))

        Multiplier /= PitchWeight

        TotDivide += Multiplier

        let PitchArr = []

        for (let o = 0; o < (Math.pow(2,i)); o++) {

            // PerlinArray[PitchDiv * o] += SeedArray[PitchDiv * o] * Multiplier

            PitchArr[PitchDiv * o] = SeedArray[PitchDiv * o]
        }

        // Går igenom varje indexvärde i Pitcharr för att söka efter närmaste värden och linear interpolate:a
        for (let o = 0; o < ArrLength; o++) {
            if(PitchArr[o]){continue}

            let IndexLow = o
            let IndexLowIndexOffsetTracker = 0

            while(PitchArr[IndexLow] == undefined){
                IndexLow--
                IndexLowIndexOffsetTracker--
                if(IndexLow < 0){IndexLow = ArrLength-1}
            }

            let IndexHigh = o
            let IndexHighIndexOffsetTracker = 0

            while(PitchArr[IndexHigh] == undefined){
                IndexHigh++
                IndexHighIndexOffsetTracker++
                if(IndexHigh > ArrLength){IndexHigh = 0}
            }

            const IndexHighIndexOffset = o - IndexHighIndexOffsetTracker
            const IndexLowIndexOffset = o - IndexLowIndexOffsetTracker

            const IndexLowVal = PitchArr[IndexLow]
            const IndexHighVal = PitchArr[IndexHigh]

            const CalculatedValueO = IndexLowVal + ((IndexHighVal - IndexLowVal) * ((o - IndexLowIndexOffset) / (IndexHighIndexOffset - IndexLowIndexOffset)))

            PitchArr[o] = CalculatedValueO

        }

        for (let o = 0; o < ArrLength; o++) {

            PerlinArray[o] += PitchArr[o] * Multiplier
            
        }

        

    }

    PerlinArray = PerlinArray.map(function (num){return (num / TotDivide)})

    return PerlinArray

}



function RandomArray(ArrLength){
    let RandArr = []
    for (let i = 0; i < ArrLength; i++) {
        RandArr.push(Math.random())
    }
    return RandArr
}