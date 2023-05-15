let popup=document.querySelector(".popup")
let closeP=document.querySelector(".popup .close")
setTimeout(() => {
    popup.classList.add("slide-right")
}, 2000);
closeP.addEventListener("click",()=>{
    popup.classList.remove("slide-right")
})



