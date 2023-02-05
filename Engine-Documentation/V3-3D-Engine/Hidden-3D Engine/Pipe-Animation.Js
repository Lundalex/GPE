    // Calculate Animation Values per Frame Function
    function DoCalculateAnimation(){
        
        for (let i = 0; i < RegObjects.length; i++) {
            if(RegObjects[i].ObjectType == "Animated"){
                if(RegObjects[i].AnimationFrame > RegObjects[i].AnimationStages * 100){
                    RegObjects[i].AnimationFrame = 1
                }
                else{
                    RegObjects[i].AnimationFrame += 2 * ProgramIncrementHertz
                }
            }
        }
        
        for (let i = 0; i < RegObjects.length; i++) {
            if(RegObjects[i].ObjectType == "Animated"){
                let CurrentAnimationStage = Math.floor(RegObjects[i].AnimationFrame/100)
                let FrameInAnimationStage = RegObjects[i].AnimationFrame % 100
                
                
                RegObjects[i].TotalAnimationDeviationX = 0
                RegObjects[i].TotalAnimationDeviationY = 0
                RegObjects[i].TotalAnimationDeviationZ = 0
                
                for (let o = 0; o < CurrentAnimationStage; o++) {
                    
                    RegObjects[i].TotalAnimationDeviationX += Number(RegObjects[i].AnimationInstructionsX[o])
                    RegObjects[i].TotalAnimationDeviationY += Number(RegObjects[i].AnimationInstructionsY[o])
                    RegObjects[i].TotalAnimationDeviationZ += Number(RegObjects[i].AnimationInstructionsZ[o])
                }
                
                RegObjects[i].TotalAnimationDeviationX += Number(RegObjects[i].AnimationInstructionsX[CurrentAnimationStage]) * 0.01 * FrameInAnimationStage
                RegObjects[i].TotalAnimationDeviationY += Number(RegObjects[i].AnimationInstructionsY[CurrentAnimationStage]) * 0.01 * FrameInAnimationStage
                RegObjects[i].TotalAnimationDeviationZ += Number(RegObjects[i].AnimationInstructionsZ[CurrentAnimationStage]) * 0.01 * FrameInAnimationStage
            }
        }
        
        if(ShowAnimationPathing == true){
            
            
            for (let i = 0; i < RegObjects.length; i++) {
                
                if(RegObjects[i].ObjectType == "Animated"){
                    
                    
                    RegObjects[i].AnimationPathCoordsX = []
                    RegObjects[i].AnimationPathCoordsY = []
                    RegObjects[i].AnimationPathCoordsZ = []
                    
                    
                    RegObjects[i].AnimationPathCoordsX[0] = Number(RegObjects[i].AnimationInstructionsX[0])
                    RegObjects[i].AnimationPathCoordsY[0] = Number(RegObjects[i].AnimationInstructionsY[0])
                    RegObjects[i].AnimationPathCoordsZ[0] = Number(RegObjects[i].AnimationInstructionsZ[0])
                    
                    
                    for (let o = 1; o < RegObjects[i].AnimationInstructionsX.length; o++) {
                        
                        RegObjects[i].AnimationPathCoordsX[o] = Number(RegObjects[i].AnimationPathCoordsX[o-1]) + Number(RegObjects[i].AnimationInstructionsX[o])
                        RegObjects[i].AnimationPathCoordsY[o] = Number(RegObjects[i].AnimationPathCoordsY[o-1]) + Number(RegObjects[i].AnimationInstructionsY[o])
                        RegObjects[i].AnimationPathCoordsZ[o] = Number(RegObjects[i].AnimationPathCoordsZ[o-1]) + Number(RegObjects[i].AnimationInstructionsZ[o])
                    }
                }
            }
        }
    }
    // Calculate Animation Values per Frame Function