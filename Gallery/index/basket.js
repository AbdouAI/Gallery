const basketIcon=document.getElementById("basket")
const basketBox=document.getElementById("basketBox")
const innerBasketBox=document.getElementById("innerBasket")
const deleteIcon=document.getElementById("deleteIcon")
const cartNotif=document.getElementById("cartNotif")
let checkOut=document.getElementById("checkoutBtn")
let cartTotalDiv=document.getElementById("cartTotalDiv")
let cartTotal=document.getElementById("cartTotal")


let orderedItems=[]
let delIcons=[]


if(localStorage.getItem("orderedItems")){
    orderedItems=JSON.parse(localStorage.getItem("orderedItems"))
    orderedItems.forEach(e=>{
        innerBasketBox.children.item(0).classList.add("no-display")
        checkOut.classList.remove("no-display")
        cartTotalDiv.classList.remove("no-display")
        addToCart(e.product,e.name,e.price,e.numOrdered,e.total,e.product)
    })
    updateTotal()
    deleteOrder()
}
notif(localStorage.getItem("notif"))



basketIcon.addEventListener("click",()=>{
    basketBox.classList.toggle("no-display")
    cartNotif.classList.add("no-visible")
    numNotif=0
    localStorage.setItem("notif",0)
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
        localStorage.removeItem("orderedItems",JSON.stringify(orderedItems))
        document.querySelector(".success-msg").classList.add("move-down")
        setTimeout(() => {
            document.querySelector(".success-msg").classList.remove("move-down")
        }, 3000); 
    }else{
        location="../pay/pay.html"
    }
})


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