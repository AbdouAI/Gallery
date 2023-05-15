
const productImg=document.getElementById("productImg")
const mainImg=document.getElementById("mainImg")
const mainImgModal=document.getElementById("mainImgM")
const selectionImgs=document.getElementById("imgSelection").children
const selectionImgsModal=document.getElementById("imgSelectionM").children
const productModal=document.getElementById("productModal")
const closeIcon=document.getElementById("closeIcon")
const leftArrow=document.querySelectorAll(".left-arrow")
const rightArrow=document.querySelectorAll(".right-arrow")

/*code de generation des images et informations*/
let pageInfo=JSON.parse(localStorage.getItem("currentProduct")) 

productImg.style.backgroundImage=`url(../images/${pageInfo.img}/image-product-1.jpg)`
mainImg.style.backgroundImage=`url(../images/${pageInfo.img}/image-product-1.jpg)`
mainImgModal.style.backgroundImage=`url(../images/${pageInfo.img}/image-product-1.jpg)`
let count=0
for(el of selectionImgs){
    count++
    el.style.backgroundImage=`url(../images/${pageInfo.img}/image-product-${count}.jpg)`
}
count=0
for(el of selectionImgsModal){
    count++
    el.style.backgroundImage=`url(../images/${pageInfo.img}/image-product-${count}.jpg)`
}

let purchaseBoxElems=document.querySelector(".purchase-box").children
purchaseBoxElems[0].textContent=pageInfo.company
purchaseBoxElems[1].textContent=pageInfo.name
purchaseBoxElems[2].textContent=pageInfo.description
document.querySelector(".price").textContent=`$${pageInfo.price}.00`
document.querySelector(".discount").textContent=`$${pageInfo.price*2}.00`


/*code pour gerer et changer les photos*/

const selectionImgsList=[]
const selectionImgsListModal=[]
for(el of selectionImgs){
    selectionImgsList.push(el)
    }
for(el of selectionImgsModal){
    selectionImgsListModal.push(el)
    }
let currentImgNum=1
let currentImgNumM=1

rightArrow.forEach(e=>e.addEventListener("click",()=>{
    if(productModal.classList.contains("no-display")){
        currentImgNum++   
        if(currentImgNum>4){currentImgNum=1}
        changeImg(currentImgNum)
        changeStyleOfSelectedImg(currentImgNum-1,selectionImgsList)
    }else{
        currentImgNumM++   
        if(currentImgNumM>4){currentImgNumM=1}
        changeImgM(currentImgNumM)
        changeStyleOfSelectedImg(currentImgNumM-1,selectionImgsListModal)
    }
    
 }))
 leftArrow.forEach(e=>e.addEventListener("click",()=>{
    if(productModal.classList.contains("no-display")){
        currentImgNum--   
        if(currentImgNum<1){currentImgNum=4}
        changeImg(currentImgNum)
        changeStyleOfSelectedImg(currentImgNum-1,selectionImgsList)
    }else{
        currentImgNumM--   
        if(currentImgNumM<1){currentImgNumM=4}
        console.log(currentImgNumM)
        changeImgM(currentImgNumM)
        changeStyleOfSelectedImg(currentImgNumM-1,selectionImgsListModal)
    }
   
 }))


mainImg.addEventListener("click",()=>{
    productModal.classList.remove("no-display")
    currentImgNumM=currentImgNum
    changeImgM(currentImgNumM)
    changeStyleOfSelectedImg(currentImgNum-1,selectionImgsListModal)
})
closeIcon.addEventListener("click",()=>{
    productModal.classList.add("no-display")
})

selectionImgsList.forEach(e =>e.addEventListener("click",()=>{
   currentImgNum=selectionImgsList.indexOf(e)+1
   changeImg(currentImgNum)
   changeStyleOfSelectedImg(selectionImgsList.indexOf(e),selectionImgsList)

}));

selectionImgsListModal.forEach(e =>e.addEventListener("click",()=>{
   currentImgNumM=selectionImgsListModal.indexOf(e)+1
   changeImgM(currentImgNumM)
   changeStyleOfSelectedImg(selectionImgsListModal.indexOf(e),selectionImgsListModal)
}));

function changeImg(imgNum){
    mainImg.style.backgroundImage=` url(../images/${pageInfo.img}/image-product-${imgNum}.jpg)`
    productImg.style.backgroundImage=` url(../images/${pageInfo.img}/image-product-${imgNum}.jpg)`
}

function changeImgM(imgNum){
    mainImgM.style.backgroundImage=` url(../images/${pageInfo.img}/image-product-${imgNum}.jpg)`
}

function changeStyleOfSelectedImg(indxOfSelected,imgList){
    imgList.forEach(e =>{e.classList.remove("selected-img-border")
    e.firstElementChild.classList.remove("selected-img-filter")})

    imgList[indxOfSelected].classList.add("selected-img-border")
    imgList[indxOfSelected].firstElementChild.classList.add("selected-img-filter")
}



/* code pour gerer le panier*/

const basketIcon=document.getElementById("basket")
const basketBox=document.getElementById("basketBox")
const innerBasketBox=document.getElementById("innerBasket")
const plus=document.getElementById("plus")
const minus=document.getElementById("minus")
const numToOrderShown=document.getElementById("numToOrder")
const addCartBtn=document.getElementById("addCart") 
const cartNotif=document.getElementById("cartNotif")
let checkOut=document.getElementById("checkoutBtn")
let cartTotalDiv=document.getElementById("cartTotalDiv")
let cartTotal=document.getElementById("cartTotal")

let numToOrder=0
let numOrdered=0
let total=0
let numNotif=0
let orderedItems=[]
let delIcons=[]
let isFirstOrder=true


if(localStorage.getItem("orderedItems")){
    orderedItems=JSON.parse(localStorage.getItem("orderedItems"))
    orderedItems.forEach(e=>{
        addToCart(e.product,e.name,e.price,e.numOrdered,e.total,e.product,e.numNotif)
    })
    isFirstOrder=false
    deleteOrder()
    updateTotal()
}
notif(localStorage.getItem("notif"))
numNotif=Number(localStorage.getItem("notif"))


basketIcon.addEventListener("click",()=>{
    basketBox.classList.toggle("no-display")
    cartNotif.classList.add("no-visible")
    numNotif=0
    localStorage.setItem("notif",0)
})


plus.addEventListener("click",()=>{
    numToOrder++
    showNum(numToOrderShown,numToOrder)
})


minus.addEventListener("click",()=>{
    if(numToOrder>0){
        numToOrder--
    }
    showNum(numToOrderShown,numToOrder)
})


checkOut.addEventListener("click",()=>{
    if(localStorage.getItem("paySetUp")){
        orderedItems=[]
            
        for(el of document.querySelectorAll("#innerBasket .order")){
            el.remove()
            innerBasketBox.children.item(0).classList.remove("no-display")
            innerBasketBox.children.item(1).classList.add("no-display")
            innerBasketBox.children.item(2).classList.add("no-display")
        }
        localStorage.removeItem("orderedItems") 
        document.querySelector(".success-msg").classList.add("move-down")
        setTimeout(() => {
            document.querySelector(".success-msg").classList.remove("move-down")
        }, 3000);
    }else{
        location="../pay/pay.html"
    }
})


if(addCartBtn){
    addCartBtn.addEventListener("click",()=>{
        if(numToOrder>0){
            if(basketBox.classList.contains("no-display")){
                    numNotif+=1
                    notif(numNotif)
                    localStorage.setItem("notif",numNotif)
            }
            if(localStorage.getItem("orderedItems")){
                isFirstOrder=false
            }
            let notFound=true
            if(!isFirstOrder){
                console.log("not first order")
                for(e of orderedItems){  
                    if(e.product==pageInfo.product){
                        console.log(" not 1 order>found")
                        notFound=false
                        numOrdered=e.numOrdered
                        total=e.total
                        total+=numToOrder*pageInfo.price
                        numOrdered+=numToOrder
                        showNum(numToOrderShown,0)
                        numToOrder=0
                        let infoToChange=document.querySelector(`#${e.product} .info`).children.item(1)
                        infoToChange.innerHTML=`$${e.price}.00 x ${numOrdered} <span id="total">$${total}</span>`

                        e.numOrdered=numOrdered
                        e.total=total
                        localStorage.setItem("orderedItems",JSON.stringify(orderedItems))
                        updateTotal()
                        break
                    }    
                }
            }
            if(notFound||isFirstOrder){
                total=numToOrder*pageInfo.price
                numOrdered=numToOrder
                showNum(numToOrderShown,0)
                numToOrder=0
                addToCart(pageInfo.img,pageInfo.name,pageInfo.price,numOrdered,total,pageInfo.product)
                let item={
                    "name":pageInfo.name,
                    "price":pageInfo.price,
                    "numOrdered":numOrdered,
                    "total":total,
                    "product":pageInfo.product,
                }
                orderedItems.push(item)
                localStorage.setItem("orderedItems",JSON.stringify(orderedItems))
                updateTotal()
                deleteOrder()
            }
        }
    })
}   



function addToCart(img,name,price,numOrdered,total,product){
      
    let order=document.createElement("div")
    order.classList="order"
    order.setAttribute("id",product)
    order.innerHTML=`
    <div class="order-img"></div>
    <div class="info">
        <p>${name}</p>
        <p>$${price}.00 x ${numOrdered} <span id="total">$${total}</span></p>
    </div>
    <img src="../images/icon-delete.svg" alt="delete" class="delete-icon">
    `
    innerBasketBox.children.item(0).classList.add("no-display")
    checkOut.classList.remove("no-display")
    cartTotalDiv.classList.remove("no-display")
    cartTotalDiv.before(order)
    document.querySelector(`#${product}>.order-img`).style.backgroundImage=`url(../images/${img}/image-product-1.jpg)`

}

function notif(notif){
    if(notif>0){
        cartNotif.textContent=notif
        cartNotif.classList.remove("no-visible")    
    }
}

function deleteOrder(){
    for(el of document.querySelectorAll(".order>img")){
        delIcons.push(el)
    }

    delIcons.forEach(e=>{
        e.addEventListener("click",()=>{
            for(item of orderedItems){
                if(item.product==e.parentElement.id){
                    let index=orderedItems.indexOf(item)
                    orderedItems.splice(index,1)
                    break
                }
            }
            e.parentElement.remove()  
            if(orderedItems.length==0){
                innerBasketBox.children.item(0).classList.remove("no-display")
                innerBasketBox.children.item(1).classList.add("no-display")
                innerBasketBox.children.item(2).classList.add("no-display")
                localStorage.removeItem("orderedItems") 
                showNum(cartTotal,0)
            }else{
                localStorage.setItem("orderedItems",JSON.stringify(orderedItems)) 
                updateTotal()
            }
        })
    })
}

function updateTotal(){
    let ttl=0
    for(item of orderedItems){
        ttl+=item.total
    }
    cartTotal.textContent=ttl
}

function showNum(el,newNum){
    el.textContent=newNum
}