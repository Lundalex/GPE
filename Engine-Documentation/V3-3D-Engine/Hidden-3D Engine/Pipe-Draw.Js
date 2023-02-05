// Reset Canvas Function
function ResetCanvas(){
    ctx.beginPath();
    ctx.rect(00, 00, CanvasWidth, CanvasHeigth);
    ctx.fillStyle = "#00BFFF";
    ctx.fill();
}
// Reset Canvas Function



// Draw Line Function
function DrawLine(X1,X2,Y1,Y2,Color,Thickness){
    ctx.beginPath()
    ctx.moveTo(((CanvasWidth/2+(+X1))),(CanvasHeigth/2+(+Y1)));
    ctx.lineTo(((CanvasWidth/2+(+X2))),(CanvasHeigth/2+(+Y2)));
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
    ctx.moveTo(X1+CanvasWidth/2, Y1+CanvasHeigth/2);  //Startpoint (x, y)
    ctx.lineTo(X2+CanvasWidth/2, Y2+CanvasHeigth/2); //Point 1    (x, y)
    ctx.lineTo(X3+CanvasWidth/2, Y3+CanvasHeigth/2);  //Point 2    (x, y)
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


    // Canvas Draw Object Shells with Marking Function
    function CanvasDrawObjectShells(){

        for (let i = 0; i < TriSorted.length; i++) {

            const Obj = TriSorted[i].ObjNumber
            const Tri = TriSorted[i].TriNumber


            if(RegObjects[Obj].TriCameraDotProduct[Tri] < 0){

                if(RegObjects[Obj].Marked == true){

                    DrawLine(RegObjects[Obj].ShellprojectedX[Tri][0],RegObjects[Obj].ShellprojectedX[Tri][1],RegObjects[Obj].ShellprojectedY[Tri][0],RegObjects[Obj].ShellprojectedY[Tri][1],"orange",3)
                    DrawLine(RegObjects[Obj].ShellprojectedX[Tri][1],RegObjects[Obj].ShellprojectedX[Tri][2],RegObjects[Obj].ShellprojectedY[Tri][1],RegObjects[Obj].ShellprojectedY[Tri][2],"orange",3)
                    DrawLine(RegObjects[Obj].ShellprojectedX[Tri][2],RegObjects[Obj].ShellprojectedX[Tri][0],RegObjects[Obj].ShellprojectedY[Tri][2],RegObjects[Obj].ShellprojectedY[Tri][0],"orange",3)
                    if(RenderShading){FillTriangle(RegObjects[Obj].ShellprojectedX[Tri][0],RegObjects[Obj].ShellprojectedX[Tri][1],RegObjects[Obj].ShellprojectedX[Tri][2],RegObjects[Obj].ShellprojectedY[Tri][0],RegObjects[Obj].ShellprojectedY[Tri][1],RegObjects[Obj].ShellprojectedY[Tri][2],RegObjects[Obj].TriCameraDotProduct[Tri],RegObjects[Obj].FillColor,RegObjects[Obj].Opacity)}

                }

                else{

                    DrawLine(RegObjects[Obj].ShellprojectedX[Tri][0],RegObjects[Obj].ShellprojectedX[Tri][1],RegObjects[Obj].ShellprojectedY[Tri][0],RegObjects[Obj].ShellprojectedY[Tri][1],"black",2)
                    DrawLine(RegObjects[Obj].ShellprojectedX[Tri][1],RegObjects[Obj].ShellprojectedX[Tri][2],RegObjects[Obj].ShellprojectedY[Tri][1],RegObjects[Obj].ShellprojectedY[Tri][2],"black",2)
                    DrawLine(RegObjects[Obj].ShellprojectedX[Tri][2],RegObjects[Obj].ShellprojectedX[Tri][0],RegObjects[Obj].ShellprojectedY[Tri][2],RegObjects[Obj].ShellprojectedY[Tri][0],"black",2)
                    if(RenderShading){FillTriangle(RegObjects[Obj].ShellprojectedX[Tri][0],RegObjects[Obj].ShellprojectedX[Tri][1],RegObjects[Obj].ShellprojectedX[Tri][2],RegObjects[Obj].ShellprojectedY[Tri][0],RegObjects[Obj].ShellprojectedY[Tri][1],RegObjects[Obj].ShellprojectedY[Tri][2],RegObjects[Obj].TriCameraDotProduct[Tri],RegObjects[Obj].FillColor,RegObjects[Obj].Opacity)}
                
                }
            }
        }
    }
    // Canvas Draw Object Shells with Marking Function



    // Canvas draw Animation Pathing Visualisation Function
    function CanvasDrawAnimationPathing(){
        if(ShowAnimationPathing == true){
            
            for (let i = 0; i < RegObjects.length; i++) {
                
                if(RegObjects[i].ObjectType == "Animated"){
                    
                    for (let o = 0; o < RegObjects[i].AnimationPathProjectedX.length; o++) {
                        
                        DrawLine(RegObjects[i].AnimationPathProjectedX[o],RegObjects[i].AnimationPathProjectedX[o+1],RegObjects[i].AnimationPathProjectedY[o],RegObjects[i].AnimationPathProjectedY[o+1],"purple",3)
                    }
                }
            }
        }
    }
    // Canvas draw Animation Pathing Visualisation Function



    // Canvas draw Animation Pathing Visualisation Function
    function CanvasDrawHitboxes(){
        if(ShowHitboxes == true){
            
            for (let i = 0; i < RegObjects.length; i++) {
                
                if(RegObjects[i].ShellprojectedX.length > 1) {
                    
                    for (let o = 0; o < RegObjects[i].HitboxProjectedX.length; o++) {
                        DrawLine(RegObjects[i].HitboxProjectedX[o],RegObjects[i].HitboxProjectedX[o+1],RegObjects[i].HitboxProjectedY[o],RegObjects[i].HitboxProjectedY[o+1],"#FF007F",2)
                    }
                }
            }
        }
    }
    // Canvas draw Animation Pathing Visualisation Function