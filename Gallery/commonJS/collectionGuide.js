let collectionLink=document.querySelector("#menuList li:nth-child(1)")
let links=document.querySelectorAll(".guide a")
let guide=document.querySelector(".collection-guide")
let guideImg=document.querySelector(".guide-img")
let linklist=[]

collectionLink.onmouseover=()=>{
  if(window.innerWidth>=826){
    guide.classList.remove("no-display")
    guideImg.style.backgroundImage=` url(../images/guideImgs/main.jpg)`
  }
}


collectionLink.onmouseout=()=>{
  guide.classList.add("no-display")
}
guide.onmouseover=()=>{
  guide.classList.remove("no-display")
}
guide.onmouseout=()=>{
  guide.classList.add("no-display")
}

for(el of links){
  linklist.push(el)
}
linklist.forEach(el=>{
  el.onmouseover=()=>{
    if(el.textContent=="Luxury"){
      changeGuideImg("lux")
    }
    else if(el.textContent=="Sport"){
      changeGuideImg("sport")
    }
    else if(el.textContent=="Women"){
      changeGuideImg("women")
    }
    else if(el.textContent=="Men"){
      changeGuideImg("men")
    }
    else if(el.textContent.includes("Unique")){
      changeGuideImg("unique")
    }

  }
})

function changeGuideImg(img){
  guideImg.classList.add("zero-opacity")
      setTimeout(() => {
        guideImg.style.backgroundImage=` url(../images/guideImgs/${img}.jpg)`
        guideImg.classList.remove("zero-opacity")
      }, 300);
}
