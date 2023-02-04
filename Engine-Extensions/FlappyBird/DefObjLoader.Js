// let Textdata = "# Blender v3.3.1 OBJ File: ''# www.blender.orgmtllib exptest.mtlo ImportCube_Cubev -90.731163 26.990868 26.558798v -90.731163 -26.990868 26.558798v -90.731163 26.990868 -26.558798v -90.731163 -26.990868 -26.558798v 90.731163 26.990868 26.558798v 90.731163 -26.990868 26.558798v 90.731163 26.990868 -26.558798v 90.731163 -26.990868 -26.558798usemtl Materials offf 5 3 1f 3 8 4f 7 6 8f 2 8 6f 1 4 2f 5 2 6f 5 7 3f 3 7 8f 7 5 6f 2 4 8f 1 3 4f 5 1 2"


function LoadFile (){

    let TestArr = Textdata.split("Cube")
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

    AddCubeObject(0,0,0,1)

}

// 0 ['78.750534', '12.625371', '12.625371']     5 XYZ
// 1 ['-78.750534', '12.625371', '-12.625371']   3 XYZ
// 2 ['-78.750534', '12.625371', '12.625371']    1 XYZ




// # Blender v3.3.1 OBJ File: ''
// # www.blender.org
// o Cube

// v -78.750534 12.625371 12.625371                 1

// v -78.750534 -12.625371 12.625371                2

// v -78.750534 12.625371 -12.625371                3

// v -78.750534 -12.625371 -12.625371               4

// v 78.750534 12.625371 12.625371                  5

// v 78.750534 -12.625371 12.625371                 6

// v 78.750534 12.625371 -12.625371                 7

// v 78.750534 -12.625371 -12.625371                8

// s off
// f 5 3 1                1
// f 3 8 4                2
// f 7 6 8                3
// f 2 8 6                4
// f 1 4 2                5
// f 5 2 6                6
// f 5 7 3                7
// f 3 7 8                8
// f 7 5 6                9
// f 2 4 8                10
// f 1 3 4                11
// f 5 1 2                12



// # Blender v3.3.1 OBJ File: ''
// # www.blender.org
// mtllib exptest.mtl
// o ImportCube_Cube
// v -90.731163 26.990868 26.558798
// v -90.731163 -26.990868 26.558798
// v -90.731163 26.990868 -26.558798
// v -90.731163 -26.990868 -26.558798
// v 90.731163 26.990868 26.558798
// v 90.731163 -26.990868 26.558798
// v 90.731163 26.990868 -26.558798
// v 90.731163 -26.990868 -26.558798
// usemtl Material
// s off
// f 5 3 1
// f 3 8 4
// f 7 6 8
// f 2 8 6
// f 1 4 2
// f 5 2 6
// f 5 7 3
// f 3 7 8
// f 7 5 6
// f 2 4 8
// f 1 3 4
// f 5 1 2
