var node = document.getElementById('dom');
var generate_btn = document.querySelector("button#generate");
let container = document.querySelector("div.container")
let img_div = document.querySelector('div#id_download')
let preview_div = document.querySelector('div#card_preview')
let uid = document.querySelector("p#uid")
let student_name = document.querySelector("p#name")

let preview_btn = document.querySelector('button#preview')
let download_btn = document.querySelector('button#download')

// If image is not generated, don't allow the user to go to download section
download_btn.disabled = true
download_btn.style.cursor = 'not-allowed'
// Convert DOM to Image
generate_btn.addEventListener("click", async () => {
    try {
        generate_btn.innerText = "Loading..."
        let dataUrl = await domtoimage.toPng(node);

        download_btn.disabled = false   // After image is generated, allow the user to download
        download_btn.style.cursor = 'pointer'

        generate_btn.innerHTML = `Generate <i class="fa-solid fa-angle-right"></i>`
        img_div.innerHTML = ""   // To clear the image container div every time new image is generated
        var img = new Image();
        img.src = dataUrl;
        //download
        let link = document.createElement('a');
        link.innerHTML = `Download <i class="fa-solid fa-file-arrow-down"></i>`
        link.href = dataUrl;
        link.download = 'download.png'  // download file name
        img_div.append(img, link);
        container.append(img_div);
        first_generate()
    } catch (err) {
        console.log(err)
    }

})

// When the page is loaded generate the barcode
window.addEventListener("load", () => {
    let val = uid.value + " " + student_name.value;
    JsBarcode("#barcode", val, {
        displayValue: false
    })
})


// 
preview_btn.addEventListener("click", () => {
    download_btn.classList.remove('active')
    preview_btn.classList.add('active')
    img_div.style.transform = "translateX(110%)";
    preview_div.style.transform = "translateX(0%)";
    preview_div.style.opacity = 1;
    img_div.style.opacity = 0;
})
first_generate = () => {
    download_btn.classList.add('active')
    preview_btn.classList.remove('active')
    img_div.style.transform = "translateX(0%)";
    // preview_div.style.transform = "translateX(-110%)";
    preview_div.style.opacity = 0;
    img_div.style.opacity = 1;
}
download_btn.addEventListener("click", () => {
    download_btn.classList.add('active')
    preview_btn.classList.remove('active')
    img_div.style.transform = "translateX(0%)";
    preview_div.style.transform = "translateX(-110%)";
    preview_div.style.opacity = 0;
    img_div.style.opacity = 1;
})