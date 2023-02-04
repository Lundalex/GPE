    // Manipulate Path/Object/Point Function
    function DoManipulation(){
      if(Manipulate == "Path"){
        if(RegObjects[FoundObjectNumber].ObjectType == "Animated"){
          
          switch (KeyPress) {
            case "ArrowDown":
            RegObjects[FoundObjectNumber].AnimationInstructionsZ[ChosenPathStage] -= 40
            
            break;
            case "ArrowUp":
            RegObjects[FoundObjectNumber].AnimationInstructionsZ[ChosenPathStage] += 40
            
            break;
            case "ArrowLeft":
            RegObjects[FoundObjectNumber].AnimationInstructionsX[ChosenPathStage] -= 40
            
            break;
            case "ArrowRight":
            RegObjects[FoundObjectNumber].AnimationInstructionsX[ChosenPathStage] += 40
            
            break;
            case "SpaceBar":
            RegObjects[FoundObjectNumber].AnimationInstructionsY[ChosenPathStage] -= 40
            break;
            
            case "Shift":
            RegObjects[FoundObjectNumber].AnimationInstructionsY[ChosenPathStage] += 40
            break;
            
            default:
            break;
          }
        }
        else if(RegObjects[FoundObjectNumber].ObjectType == "Physics"){
          
          switch (KeyPress) {
            case "ArrowDown":
            RegObjects[FoundObjectNumber].VelocityZ -= 40
            
            break;
            case "ArrowUp":
            RegObjects[FoundObjectNumber].VelocityZ += 40
            
            break;
            case "ArrowLeft":
            RegObjects[FoundObjectNumber].VelocityX -= 40
            
            break;
            case "ArrowRight":
            RegObjects[FoundObjectNumber].VelocityX += 40
            
            break;
            case "SpaceBar":
            RegObjects[FoundObjectNumber].VelocityY -= 40
            break;
            
            case "Shift":
            RegObjects[FoundObjectNumber].VelocityY += 40
            break;
            
            default:
            break;
          }
        }
        
      }
      
      // CHNANGE CAMERAOBJECT POSITION
      
      else if(Manipulate == "Point"){
        
        switch (KeyPress) {
          case "ArrowDown":
          for (let i = 0; i < RegObjects.length; i++) {
            for (let o = 0; o < RegObjects[i].ShellZ.length; o++) {
              for (let p = 0; p < 3; p++) {
                RegObjects[i].ShellZ[o][p] += 20
                
              }
            }
          }
          
          break;
          case "ArrowUp":
          for (let i = 0; i < RegObjects.length; i++) {
            for (let o = 0; o < RegObjects[i].ShellZ.length; o++) {
              for (let p = 0; p < 3; p++) {
                RegObjects[i].ShellZ[o][p] -= 20
                
              }
            }
          }
          
          break;
          case "ArrowLeft":
          for (let i = 0; i < RegObjects.length; i++) {
            for (let o = 0; o < RegObjects[i].ShellX.length; o++) {
              for (let p = 0; p < 3; p++) {
                RegObjects[i].ShellX[o][p] += 20
                
              }
            }
          }
          break;
          case "ArrowRight":
          for (let i = 0; i < RegObjects.length; i++) {
            for (let o = 0; o < RegObjects[i].ShellX.length; o++) {
              for (let p = 0; p < 3; p++) {
                RegObjects[i].ShellX[o][p] -= 20
                
              }
            }
          }
          break;
          case "SpaceBar":
          for (let i = 0; i < RegObjects.length; i++) {
            for (let o = 0; o < RegObjects[i].ShellY.length; o++) {
              for (let p = 0; p < 3; p++) {
                RegObjects[i].ShellY[o][p] += 20
                
              }
            }
          }
          break;
          case "Shift":
          for (let i = 0; i < RegObjects.length; i++) {
            for (let o = 0; o < RegObjects[i].ShellY.length; o++) {
              for (let p = 0; p < 3; p++) {
                RegObjects[i].ShellY[o][p] -= 20
                
              }
            }
          }
          break;
          
          default:
          break;
        }
        
        
      }
      
      else if(Manipulate == "Object"){
        switch (KeyPress) {
          case "ArrowDown":
          RegObjects[FoundObjectNumber].LeaderZ -= 20
          
          break;
          case "ArrowUp":
          RegObjects[FoundObjectNumber].LeaderZ += 20
          
          break;
          case "ArrowLeft":
          RegObjects[FoundObjectNumber].LeaderX -= 20
          
          break;
          case "ArrowRight":
          RegObjects[FoundObjectNumber].LeaderX += 20
          
          break;
          case "SpaceBar":
          RegObjects[FoundObjectNumber].LeaderY -= 20
          
          break;
          case "Shift":
          RegObjects[FoundObjectNumber].LeaderY += 20
          
          break;
          
          default:
          break;
        }
      }
    }
    // Manipulate Path/Object/Point Function
    
    
    
    
    
    // Apply Scaling Function
    function DoScaling(){
      if(ScrollY != "None"){
        
        let Scalefactor = 0
        
        if(ScrollY == "Up"){
          Scalefactor = 1.1
        }
        
        else if (ScrollY == "Down"){
          Scalefactor = 0.9
        }
        
        for (let i = 0; i < RegObjects[FoundObjectNumber].ShellX.length; i++) {
          for (let o = 0; o < 3; o++) {
            
            RegObjects[FoundObjectNumber].ShellX[i][o] *= Scalefactor
            RegObjects[FoundObjectNumber].ShellY[i][o] *= Scalefactor
            RegObjects[FoundObjectNumber].ShellZ[i][o] *= Scalefactor
            
          }
        }
      }
    }
    // Apply Scaling Function
    
    
    
    
    // Select Function -----
    function OnClickFunction(event) {
      // Mouse X/Y coords

      const X = event.clientX - CanvasWidth/2 - 18
      const Y = event.clientY - CanvasHeigth/2 - 18

      console.log(RegObjects[0].ShellprojectedX)
      console.log(RegObjects[0].ShellprojectedY)
      
      let FoundCollision = false
      
      let FoundXcoord = 0
      let FoundYcoord = 0
      let FoundZcoord = 0
      
      for (let i = 0; i < RegObjects.length; i++) {
        RegObjects[i].Marked = false
        
      }
      // Locate Collision
      for (let i = 0; i < RegObjects.length; i++) {
        
        RegObjects[i].PointsMarked = []
        
        for (let o = 0; o < RegObjects[i].ShellX.length; o++) {
          
          for (let p = 0; p < 3; p++) {
            
            if((((Math.abs(X - RegObjects[i].ShellprojectedX[o][p])) < 5) && ((Math.abs(Y - RegObjects[i].ShellprojectedY[o][p])) < 5)) && FoundCollision == false){
              
              FoundXcoord = RegObjects[i].RelativePointPositionX(o)
              FoundYcoord = RegObjects[i].RelativePointPositionY(o)
              FoundZcoord = RegObjects[i].RelativePointPositionZ(o)
              
              FoundObjectNumber = i
              
              FoundCollision = true
            } 
          }
        }
      }
      // Locate Collision
      
      // Locate Points Nearby
      if(FoundCollision == true){
        
        for (let o = 0; o < RegObjects[FoundObjectNumber].ShellX.length; o++) {
          
          RegObjects[FoundObjectNumber].Marked = true
          
          if((Math.abs(FoundXcoord - (RegObjects[FoundObjectNumber].RelativePointPositionX(o))) < 1) && (Math.abs(FoundYcoord - (RegObjects[FoundObjectNumber].RelativePointPositionY(o))) < 1) && (Math.abs(FoundZcoord - (RegObjects[FoundObjectNumber].RelativePointPositionZ(o))) < 1)){
            
            RegObjects[FoundObjectNumber].PointsMarked[o] = true
          }
          else{
            RegObjects[FoundObjectNumber].PointsMarked[o] = false
          } 
        }
      }
      // Locate Points Nearby
      
    }
    // Select Function -----
    
    
    
    
    
    // KeyPress Event Listener -----
    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      let Continue = OnKeyPress(event.key)
      if(!Continue){return}
      switch (event.key) {
        case "ArrowDown":
        KeyPress = "ArrowDown"
        break;
        case "ArrowUp":
        KeyPress = "ArrowUp"
        break;
        case "ArrowLeft":
        KeyPress = "ArrowLeft"
        break;
        case "ArrowRight":
        KeyPress = "ArrowRight"
        break;
        case "Shift":
        KeyPress = "Shift"
        break;
        case " ":
        KeyPress = "SpaceBar"
        break;
        
        case "Backspace":
        DeleteFoundObject(FoundObjectNumber)
        break;
        
        case "a":
        KeyPress = "ArrowLeft"
        break;
        case "d":
        KeyPress = "ArrowRight"
        break;
        case "w":
        KeyPress = "ArrowUp"
        break;
        case "s":
        KeyPress = "ArrowDown"
        break;
        
        ////////////
        case "b":
        ShowAnimationPathing = !ShowAnimationPathing
        break;
        
        case "h":
        ShowHitboxes = !ShowHitboxes
        break;
        case "r":
        RenderShading = !RenderShading
        break;
        ////////////
        
        ////////////
        case "v":
        RunProgram = false
        break;
        ////////////
        
        default:
        return; // Quit when this doesn't handle the key event.
      }
      
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }, true);
    // KeyPress Event Listener -----
    
    
    
    // Scroll Function (Up & Down) -----
    function ScrollFunction(event){
      let Continue = OnScroll(event.deltaY)
      if(!Continue){return}
      
      if(event.deltaY > 0){
        
        ScrollY = "Down"
      }
      else if(event.deltaY < 0){
        
        ScrollY = "Up"
      }
    }
    // Scroll Function (Up & Down) -----
    
    
    
    // Mouse Drag Functions -----
    function MouseDownFunction(event){
      
      LastMouseDownX = event.clientX
      LastMouseDownY = event.clientY
      
    }
    
    function MouseUpFunction(event){
      
      LastMouseUpX = event.clientX
      LastMouseUpY = event.clientY
      
      // Calls Function
      CameraPerpectiveHandling(LastMouseDownX, LastMouseDownY, LastMouseUpX, LastMouseUpY)
    }
    // Mouse Drag Functions -----