// Project Function
function Project2D(XY, Z){
    return (XY * FocalLength) / (Z + FocalLength)
}
// Project Function



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



// Project Shell X/Y/Z -> 2D(X, Y) Function
function ProjectShell2D(){
    for (let i = 0; i < RegObjects.length; i++) {
        
        for (let o = 0; o < RegObjects[i].ShellX.length; o++) {
            RegObjects[i].ShellprojectedX[o] = []
            RegObjects[i].ShellprojectedY[o] = []
            
            for (let p = 0; p < 3; p++) {
                
                // Add Animation Frame Values
                const ShellPointX = RegObjects[i].ShellX[o][p] + RegObjects[i].LeaderX + Number(RegObjects[i].TotalAnimationDeviationX)
                const ShellPointY = RegObjects[i].ShellY[o][p] + RegObjects[i].LeaderY + Number(RegObjects[i].TotalAnimationDeviationY)
                const ShellPointZ = RegObjects[i].ShellZ[o][p] + RegObjects[i].LeaderZ + Number(RegObjects[i].TotalAnimationDeviationZ)
                
                const XYZArr = ApplyCameraPerspective(ShellPointX, ShellPointY, ShellPointZ)
                
                const X = XYZArr[0] + CameraOffsetX
                const Y = XYZArr[1] + CameraOffsetY
                const Z = XYZArr[2] + CameraOffsetZ
                if((RegObjects[i].TriCameraDotProduct[o] < 0 && Z+FocalLength > 0)){
                    RegObjects[i].ShellprojectedX[o][p] = Project2D(X,Z)
                    RegObjects[i].ShellprojectedY[o][p] = Project2D(Y,Z)
                    
                }
            }
        }
    }
}
// Project Shell X/Y/Z -> 2D(X, Y) Function


// Project per Object Animation Path X/Y/Z -> 2D(X, Y) Function
function ProjectAnimationPath2D(){
    if(ShowAnimationPathing == true){
        
        for (let i = 0; i < RegObjects.length; i++) {
            
            if(RegObjects[i].ObjectType == "Animated"){
                
                
                RegObjects[i].AnimationPathProjectedX = []
                RegObjects[i].AnimationPathProjectedY = []
                
                for (let o = 0; o < RegObjects[i].AnimationInstructionsX.length; o++) {
                    
                    const TotalAnimationpointX = RegObjects[i].AnimationRelativePathCoordPositionX(o)
                    const TotalAnimationpointY = RegObjects[i].AnimationRelativePathCoordPositionY(o)
                    const TotalAnimationpointZ = RegObjects[i].AnimationRelativePathCoordPositionZ(o)
                    
                    const XYZArr = ApplyCameraPerspective(TotalAnimationpointX, TotalAnimationpointY, TotalAnimationpointZ)
                    
                    const X = XYZArr[0] + CameraOffsetX
                    const Y = XYZArr[1] + CameraOffsetY
                    const Z = XYZArr[2] + CameraOffsetZ
                    
                    if(Z+FocalLength > 0){
                        
                        RegObjects[i].AnimationPathProjectedX[o] = Project2D(X,Z)
                        RegObjects[i].AnimationPathProjectedY[o] = Project2D(Y,Z)
                    }
                }
                
                const TotalAnimationpointX = RegObjects[i].LeaderX
                const TotalAnimationpointY = RegObjects[i].LeaderY
                const TotalAnimationpointZ = RegObjects[i].LeaderZ
                
                const XYZArr = ApplyCameraPerspective(TotalAnimationpointX, TotalAnimationpointY, TotalAnimationpointZ)
                
                const X = XYZArr[0] + CameraOffsetX
                const Y = XYZArr[1] + CameraOffsetY
                const Z = XYZArr[2] + CameraOffsetZ
                
                if(Z+FocalLength > 0){
                    
                    RegObjects[i].AnimationPathProjectedX.unshift(Project2D(X,Z))
                    RegObjects[i].AnimationPathProjectedY.unshift(Project2D(Y,Z))
                    
                }
            }
        }
    }
}
// Project per Object Animation Path X/Y/Z -> 2D(X, Y) Function



// Project per Object Hitbox X/Y/Z -> 2D(X, Y) Function
function ProjectHitboxes2D(){
    
    for (let i = 0; i < RegObjects.length; i++) {
        
        const Hitbox = RegObjects[i].HitboxRelativeBoundraryXYZ()
        
        const HitboxWireFrameX = [Hitbox[0],Hitbox[1],Hitbox[1],Hitbox[0],Hitbox[0],Hitbox[0],Hitbox[1],Hitbox[1],Hitbox[0],Hitbox[0],Hitbox[0],Hitbox[1],Hitbox[1],Hitbox[1],Hitbox[1],Hitbox[0],Hitbox[0]]
        const HitboxWireFrameY = [Hitbox[2],Hitbox[2],Hitbox[3],Hitbox[3],Hitbox[2],Hitbox[2],Hitbox[2],Hitbox[3],Hitbox[3],Hitbox[2],Hitbox[2],Hitbox[2],Hitbox[2],Hitbox[3],Hitbox[3],Hitbox[3],Hitbox[3]]
        const HitboxWireFrameZ = [Hitbox[4],Hitbox[4],Hitbox[4],Hitbox[4],Hitbox[4],Hitbox[5],Hitbox[5],Hitbox[5],Hitbox[5],Hitbox[5],Hitbox[4],Hitbox[4],Hitbox[5],Hitbox[5],Hitbox[4],Hitbox[4],Hitbox[5]]
        
        for (let o = 0; o < HitboxWireFrameX.length; o++) {
            
            const XYZArr = ApplyCameraPerspective(HitboxWireFrameX[o], HitboxWireFrameY[o], HitboxWireFrameZ[o])
            
            const X = XYZArr[0] + CameraOffsetX
            const Y = XYZArr[1] + CameraOffsetY
            const Z = XYZArr[2] + CameraOffsetZ
            
            RegObjects[i].HitboxProjectedX[o] = Project2D(X,Z)
            RegObjects[i].HitboxProjectedY[o] = Project2D(Y,Z)
        }
        
    }
}
// Project per Object Hitbox X/Y/Z -> 2D(X, Y) Function

// Project per Object Animation Path X/Y/Z -> 2D(X, Y) Function
function ProjectAnimationPath2D(){
    if(ShowAnimationPathing == true){
        
        for (let i = 0; i < RegObjects.length; i++) {
            
            if(RegObjects[i].ObjectType == "Animated"){
                
                
                RegObjects[i].AnimationPathProjectedX = []
                RegObjects[i].AnimationPathProjectedY = []
                
                for (let o = 0; o < RegObjects[i].AnimationInstructionsX.length; o++) {
                    
                    const TotalAnimationpointX = RegObjects[i].AnimationRelativePathCoordPositionX(o)
                    const TotalAnimationpointY = RegObjects[i].AnimationRelativePathCoordPositionY(o)
                    const TotalAnimationpointZ = RegObjects[i].AnimationRelativePathCoordPositionZ(o)
                    
                    const XYZArr = ApplyCameraPerspective(TotalAnimationpointX, TotalAnimationpointY, TotalAnimationpointZ)
                    
                    const X = XYZArr[0] + CameraOffsetX
                    const Y = XYZArr[1] + CameraOffsetY
                    const Z = XYZArr[2] + CameraOffsetZ
                    
                    if(Z+FocalLength > 0){
                        
                        RegObjects[i].AnimationPathProjectedX[o] = Project2D(X,Z)
                        RegObjects[i].AnimationPathProjectedY[o] = Project2D(Y,Z)
                    }
                }
                
                const TotalAnimationpointX = RegObjects[i].LeaderX
                const TotalAnimationpointY = RegObjects[i].LeaderY
                const TotalAnimationpointZ = RegObjects[i].LeaderZ
                
                const XYZArr = ApplyCameraPerspective(TotalAnimationpointX, TotalAnimationpointY, TotalAnimationpointZ)
                
                const X = XYZArr[0] + CameraOffsetX
                const Y = XYZArr[1] + CameraOffsetY
                const Z = XYZArr[2] + CameraOffsetZ
                
                if(Z+FocalLength > 0){
                    
                    RegObjects[i].AnimationPathProjectedX.unshift(Project2D(X,Z))
                    RegObjects[i].AnimationPathProjectedY.unshift(Project2D(Y,Z))
                    
                }
            }
        }
    }
}
// Project per Object Animation Path X/Y/Z -> 2D(X, Y) Function



// Project per Object Hitbox X/Y/Z -> 2D(X, Y) Function
function ProjectHitboxes2D(){
    
    for (let i = 0; i < RegObjects.length; i++) {
        
        const Hitbox = RegObjects[i].HitboxRelativeBoundraryXYZ()
        
        const HitboxWireFrameX = [Hitbox[0],Hitbox[1],Hitbox[1],Hitbox[0],Hitbox[0],Hitbox[0],Hitbox[1],Hitbox[1],Hitbox[0],Hitbox[0],Hitbox[0],Hitbox[1],Hitbox[1],Hitbox[1],Hitbox[1],Hitbox[0],Hitbox[0]]
        const HitboxWireFrameY = [Hitbox[2],Hitbox[2],Hitbox[3],Hitbox[3],Hitbox[2],Hitbox[2],Hitbox[2],Hitbox[3],Hitbox[3],Hitbox[2],Hitbox[2],Hitbox[2],Hitbox[2],Hitbox[3],Hitbox[3],Hitbox[3],Hitbox[3]]
        const HitboxWireFrameZ = [Hitbox[4],Hitbox[4],Hitbox[4],Hitbox[4],Hitbox[4],Hitbox[5],Hitbox[5],Hitbox[5],Hitbox[5],Hitbox[5],Hitbox[4],Hitbox[4],Hitbox[5],Hitbox[5],Hitbox[4],Hitbox[4],Hitbox[5]]
        
        for (let o = 0; o < HitboxWireFrameX.length; o++) {
            
            const XYZArr = ApplyCameraPerspective(HitboxWireFrameX[o], HitboxWireFrameY[o], HitboxWireFrameZ[o])
            
            const X = XYZArr[0] + CameraOffsetX
            const Y = XYZArr[1] + CameraOffsetY
            const Z = XYZArr[2] + CameraOffsetZ
            
            RegObjects[i].HitboxProjectedX[o] = Project2D(X,Z)
            RegObjects[i].HitboxProjectedY[o] = Project2D(Y,Z)
        }
        
    }
}
// Project per Object Hitbox X/Y/Z -> 2D(X, Y) Function