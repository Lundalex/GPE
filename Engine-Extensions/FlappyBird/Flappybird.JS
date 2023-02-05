function OnDeleteFoundObject(FoundObjectNumber){return true}
function OnDeleteObject(ObjectNumber){return true}


function OnCollision(Object1,Object2){

    // Default setup
    if(RegObjects[Object1].DeleteOTHERonCollision == true){
        if(RegObjects[Object2].Tag == "PlayerObject"){alert("Game Over")}
        DeleteObject(Object2)
        RunProgram = false
        return 1
    }
    else if(RegObjects[Object2].DeleteOTHERonCollision == true){
        if(RegObjects[Object1].Tag == "PlayerObject"){alert("Game Over")}
        DeleteObject(Object1)
        RunProgram = false
        return 1
    }
    else if(RegObjects[Object1].DeleteOnCollision == true){
        if(RegObjects[Object1].Tag == "PlayerObject"){alert("Game Over")}
        DeleteObject(Object1)
        RunProgram = false
        return 1
    }
    else if(RegObjects[Object2].DeleteOnCollision == true){
        if(RegObjects[Object2].Tag == "PlayerObject"){alert("Game Over")}
        DeleteObject(Object2)
        RunProgram = false
        return 1
    }
    return 3
}



// Start Code:

let FrameCounter = 0
let FrameCounter2 = 0
let ObstacleSpeed = 1

//
function OnStart(){
    
    AddCubeObject(-300,1,1,1)
    RegObjects[0].ConstantForceY = -10
    RegObjects[0].Tag = "PlayerObject"
    CameraOffsetZ = 800

    return true
}

//
function OnNewFrame(){

    FrameCounter++
    FrameCounter2 += ObstacleSpeed
    ObstacleSpeed += 0.0005
    
    if(FrameCounter2 > 300){
        SpawnObstacle()
        FrameCounter2 = 0
    }
    for (let i = 0; i < RegObjects.length; i++) {
        if(RegObjects[i].LeaderX < -700){
            DeleteObject(i)
        }
        
    }
    return true
}

//
function OnKeyPress(PressedKey){

    if(PressedKey == " " && FrameCounter > 30){
        RegObjects[0].VelocityY = -300
        FrameCounter = 0
    }
    else if(PressedKey == "h"){
        ShowHitboxes = !ShowHitboxes
    }
    else if(PressedKey == "r"){
        RenderShading = !RenderShading
    }

    return false
}

//
function OnScroll(ScrollValue){

    return false
}

//
function SpawnObstacle(){

    let random = Math.random()

    let Y1 = random * 800 -400 - 200
    let Y2 = random * 800  -200

    for (let i = -1000; i < Y1; i+=100) {
        AddCubeObject(700,-i,0,1)

        RegObjects[RegObjects.length-1].VelocityX = -100
        RegObjects[RegObjects.length-1].ConstantForceX = 1
        RegObjects[RegObjects.length-1].DeleteOTHERonCollision = true
        
    }

    for (let i = 1000; i > Y2; i-=100) {
        AddCubeObject(700,-i,0,1)

        RegObjects[RegObjects.length-1].VelocityX = -100
        RegObjects[RegObjects.length-1].ConstantForceX = 1
        RegObjects[RegObjects.length-1].DeleteOTHERonCollision = true
    }
}