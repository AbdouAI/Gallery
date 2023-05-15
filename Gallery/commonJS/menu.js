const menu=document.getElementById("menu")
const closeMenu=document.getElementById("closeMenu")
const menuBox=document.getElementById("menuBox")
const curtain=document.getElementById("curtain")
const menuLinks=document.querySelectorAll("#menuList a")
const html=document.getElementsByTagName("html")


menu.addEventListener("click",()=>{
    curtain.classList.remove("no-display")
    menuBox.style.left="0"
})


closeMenu.addEventListener("click",()=>{
    curtain.classList.add("no-display")
    menuBox.style.left="-100%"
})


for(link of menuLinks){
    link.addEventListener("click",()=>{
        curtain.classList.add("no-display")
        menuBox.style.left="-100%"
    })
}



