const productImg=document.getElementById("productImg")

const leftArrow=document.querySelectorAll(".left-arrow")
const rightArrow=document.querySelectorAll(".right-arrow")

let currentImgNum=1
let numImgsAvailable=9
changeImg(currentImgNum)
setInterval(() => {
    currentImgNum++   
    if(currentImgNum>numImgsAvailable){currentImgNum=1}
    changeImg(currentImgNum)
}, 8000);


rightArrow.forEach(e=>e.addEventListener("click",()=>{
    currentImgNum++   
    if(currentImgNum>numImgsAvailable){currentImgNum=1}
    changeImg(currentImgNum)
 }))
 leftArrow.forEach(e=>e.addEventListener("click",()=>{
    currentImgNum--   
    if(currentImgNum<1){currentImgNum=numImgsAvailable}
    changeImg(currentImgNum)
 }))




function changeImg(imgNum){
    productImg.classList.add("zero-opacity")
    setTimeout(() => {
        productImg.style.backgroundImage=` url(../images/banner/watch${imgNum}.jpg)`
        productImg.classList.remove("zero-opacity")
    }, 300);

}


