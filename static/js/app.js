var node = document.getElementById('dom');
var btn = document.querySelector("button");
let container = document.querySelector("div.container")
let img_div = document.createElement('div')

// Convert DOM to Image
btn.addEventListener("click", () => {
    domtoimage
        .toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            let link = document.createElement('a');
            link.innerText = 'Download'
            link.href = dataUrl;
            link.download = 'download.png'
            img_div.append(img, link);
            container.append(img_div);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
})
