let file = document.getElementById("readfile");
file.addEventListener("change", function () {
var reader = new FileReader();
  reader.onload = function (progressEvent) {

Textdata = (this.result);
alert("OBJ file loaded:" + Textdata)


  };
  reader.readAsText(this.files[0]);
});