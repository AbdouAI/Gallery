let optinCtnr=document.querySelector(".opt-in-container")
let optinClose=document.querySelector(".opt-in-container img")

optinClose.addEventListener("click",()=>{
    optinCtnr.classList.add("no-display")
})
if(!localStorage.getItem("shown")){
    setTimeout(() => {
        optinCtnr.classList.remove("no-display")
        optinCtnr.firstElementChild.classList.add("full-opacity")
        localStorage.setItem("shown",true)
    }, 9000);
}else{
    setTimeout(() => {
        optinCtnr.classList.remove("no-display")
        optinCtnr.firstElementChild.classList.add("full-opacity")
        localStorage.setItem("shown",true)
    }, 60000);
}



