let file = document.getElementById("readfile");
file.addEventListener("change", function () {
var reader = new FileReader();
  reader.onload = function (progressEvent) {

Textdata.push(this.result)
alert(Textdata.length)


  };
  reader.readAsText(this.files[0]);
});


let Textdata = []


function LoadFiles(Size, ObjArr){
    
    for (let ObjIndex = 0; ObjIndex < ObjArr.length; ObjIndex++) {
        
        const ObjData = ObjArr[ObjIndex]
        
        let TestArr = ObjData.split("Cube")
        let Test2Arr = TestArr[1]
        AlldataArr = Test2Arr.split("s off")
        
        let VertexArr = AlldataArr[0].split("v ")
        VertexArr.shift()
        let FacesArr = AlldataArr[1].split("f ")
        FacesArr.shift()
        
        for (let i = 0; i < VertexArr.length; i++) {
            
            VertexArr[i] = VertexArr[i].split(" ")
            
        }
        for (let i = 0; i < FacesArr.length; i++) {
            
            FacesArr[i] = FacesArr[i].split(" ")
            
        }
        
        CUSTOMObjtriDataX = []
        CUSTOMObjtriDataY = []
        CUSTOMObjtriDataZ = []
        
        for (let i = 0; i < FacesArr.length; i++) {
            CUSTOMObjtriDataX[i] = []
            CUSTOMObjtriDataY[i] = []
            CUSTOMObjtriDataZ[i] = []
            for (let o = 0; o < 3; o++) {
                
                CUSTOMObjtriDataX[i][o] = +VertexArr[FacesArr[i][o]-1][0]
                CUSTOMObjtriDataY[i][o] = +VertexArr[FacesArr[i][o]-1][1]
                CUSTOMObjtriDataZ[i][o] = +VertexArr[FacesArr[i][o]-1][2]
                
            }
        }
        console.log(CUSTOMObjtriDataX)
        console.log(CUSTOMObjtriDataY)
        console.log(CUSTOMObjtriDataZ)
        
        AddCubeObject(0,0,0,Size)

        OnObjFileLoad(ObjIndex)
        
    }
    
}