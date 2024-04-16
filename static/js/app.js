var node = document.getElementById('dom');
var btn = document.querySelector("button");
let container = document.querySelector("div.container")
let img_div = document.createElement('div')
let uid = document.querySelector("p#uid")
let student_name = document.querySelector("p#name")

// Convert DOM to Image
btn.addEventListener("click", () => {
    domtoimage
        .toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            //download
            let link = document.createElement('a');
            link.innerText = 'Download'
            link.href = dataUrl;
            link.download = 'download.png'  // download file name
            img_div.append(img, link);
            container.append(img_div);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
})

// When the page is loaded generate the barcode
window.addEventListener("load", () => {
    let val = uid.value + " " + student_name.value;
    JsBarcode("#barcode", val, {
        displayValue: false
    })
})