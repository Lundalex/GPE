var Inputdata = []
var Procdata = new Array

function InputCoords(){
    Inputdata.length = 0
    Coordamount = +prompt("insert amount of coordinates")
    for (let i = 0; i < Coordamount; i++) {
        Inputdata.push(prompt("X:"))
        Inputdata.push(prompt("Y:"))
    }
    Procdata = Inputdata.map(function Procfunc(num) {
        return num * 1;
      })}

function Load() {
    for (let i = 0; i < Procdata.length; i+=2) {
        ctx.moveTo(Number(Procdata[i]), Number(Procdata[i+1]));
        ctx.lineTo(Number(Procdata[i+2]), Number(Procdata[i+3]));
        ctx.stroke();
    }}

// [[0,0],[0,0],[0,0],[0,0]]
function DrawDots(Dots, zoomX, zoomY){
    for (let i = 0; i < Dots.length; i++) {
        ctx.moveTo(Number(Dots[i][0]*zoomX+400), Number(Dots[i][1]*zoomX+400));
        ctx.lineTo(Number(Dots[i][0]*zoomY+1+400), Number(Dots[i][1]*zoomY+1+400));
        ctx.stroke();

    }
}

let DotArray

function recursion(recursevalue,c,x){
    if(recursevalue == 0){return x}

    const newX = Math.pow(x,2) + c

    return recursion(recursevalue-1,c,newX)
}

function generateDots(acc, arrEnd){
    let returnArr = []
    for (let i = 0.2; i > arrEnd; i-=0.01) {
        for (let o = 0; o < 20; o++) {
            returnArr.push([i,recursion(acc+o,i,i)])
        }
    }
    return returnArr
}
console.log(generateDots(2000, -2))

DrawDots(generateDots(2000, -10), 160, 160)

