

const Iname=document.getElementById("input-name");
const Iadrs=document.getElementById("input-adrs");
const Inumber=document.getElementById("input-number");
const Imonth=document.getElementById("input-month");
const Iyear=document.getElementById("input-year");
const IbCardCvc=document.getElementById("input-cvc");


const form=document.getElementById("form");

const completeP=document.getElementById("completeP")


const nameER=document.getElementById("nameER");
const adrsER=document.getElementById("adrsER");
const numberER=document.getElementById("numberER");
const dateER=document.getElementById("dateER");
const cvcER=document.getElementById("cvcER");


const CbCardCvc=document.getElementById("b-card-cvc");
const Cname=document.getElementById("name");
const Cnumber=document.getElementById("number");
const Cdate=document.getElementById("exp-date");

const payM=document.getElementsByName("payM")
const plLink=document.querySelector("a")


if(localStorage.getItem("paySetUp")){
    form.classList.add("no-display")
    completeP.classList.remove("no-display")
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (checkInput()){
        form.classList.add("no-display")
        completeP.classList.remove("no-display")
        localStorage.setItem("paySetUp",true)
    }
});


for(el of document.querySelectorAll("input:not(input[type='radio'])")){
    el.onkeyup=()=>{
        cardDetails()
    }
}

for(el of payM){
    el.onchange=()=>{
        if(payM.item(2).checked){
            plLink.classList.remove("no-display") 
            for(el of document.querySelectorAll("input:not(input[type='radio'])")){
                el.setAttribute("disabled",1)
            }
        }
        else{
            plLink.classList.add("no-display") 
            for(el of document.querySelectorAll("input:not(input[type='radio'])")){
                el.removeAttribute("disabled")
            }
        }
    
    }
}



function checkInput(){
    let dateCor=0;
    const messageB="Can't be blank";
    let numIcorrect=0;
    let name=Iname.value.trim();
    let adrs=Iadrs.value.trim()
    let number=Inumber.value.trim().replace(/ /g,"");
    let month=Imonth.value.trim();
    let year=Iyear.value.trim();
    let bCardCvc=IbCardCvc.value.trim();

    

    if(name===""){
       nameER.innerText=messageB;
       Iname.className="input-error";
    }
    else{
        nameER.innerText="";
        numIcorrect+=1;
        Iname.className="";
    }

    if(adrs===""){
        adrsER.innerText=messageB;
        Iadrs.className="input-error";
     }
    else if(adrs.length<20){
        adrsER.innerText="Address is too short";
        Iadrs.className="input-error";
     }
    else{
        adrsER.innerText="";
        numIcorrect+=1;
        Iadrs.className="";
    }


    if(number===""){
        numberER.innerText=messageB;
        Inumber.className="input-error";
    }
    if(isNaN(number)){
        numberER.innerText="Must be a number";
        Inumber.className="input-error";
    }
    else if(number.includes(".")){
        console.log("includes it")
        numberER.innerText="Wrong format, follow the example";
        Inumber.className="input-error";
    }
    else if(number.length!=16){
        numberER.innerText="Wrong format, type 16 numbers";
        Inumber.className="input-error";
    }
    
    else{
        numberER.innerText="";
        numIcorrect+=1;
        Inumber.className=""  ;
    }


    if(month===""){
        dateER.innerText=messageB;
        Imonth.className="input-error"
    }
    else if(month.includes(".")){
        dateER.innerText="Wrong format, follow the example";
        Imonth.className="input-error";
    }
    else if(month<1||month>12){
        dateER.innerText="The number entered is wrong";
        Imonth.className="input-error"; 
    }
    else{
        Imonth.className="";
        dateCor+=1;
    }

    if(year===""){
        dateER.innerText=messageB;
        Iyear.className="input-error";
     } 
    else if(year.includes(".")){
        dateER.innerText="Wrong format, follow the example";
        Iyear.className="input-error";
    }
    else if(year<22||year>99){
        dateER.innerText="The number entered is wrong";
        Iyear.className="input-error";
    }
    else{
        Iyear.className="";
        dateCor+=1;
    }
    
    if(dateCor==2){
        dateER.innerText="";
        numIcorrect+=1;
    }

    if(bCardCvc===""){
        cvcER.innerText=messageB;
        IbCardCvc.className="input-error";
    }
    else if(bCardCvc.length!=3){
        cvcER.innerText="Wrong format";
        IbCardCvc.className="input-error"
    }
    else if(bCardCvc.includes(".")){
        cvcER.innerText="Wrong format, follow the example";
        IbCardCvc.className="input-error";
    }
    else{
        cvcER.innerText="";
        numIcorrect+=1;
        IbCardCvc.className="";
    }


    if(numIcorrect==5){
        return true;
    }


}


function cardDetails(){
    let number=Inumber.value.trim().replace(/ /g,"");
    let shownNumber="";
    let count=0;
    let numLen=0;
    if(number.length<=16){
        numLen=number.length
        Cnumber.style.color="white"

    }
    else{
        shownNumber="MAX 16 NUMBERS"
    }
    for(let i=0;i<numLen;i++){
        if(isNaN(number[i])){
            shownNumber+="!";
            count++
        }else{
            shownNumber+=number[i];
            count++
        }
        if((count)%4==0){
            shownNumber+=" ";
        }
    }    
    for(let j=0;j<16-number.length;j++){
        shownNumber+="-"
        count++
        if((count)%4==0){
            shownNumber+=" ";
        }     
    }

    Cnumber.textContent=(shownNumber)
    Cname.textContent=(Iname.value)
    Cdate.textContent=(`${Imonth.value.slice(0,2)}/${Iyear.value.slice(0,2)}`)
    CbCardCvc.textContent=(IbCardCvc.value.slice(0,3))
}


function reset(){
    localStorage.removeItem("paySetUp")
    location.reload()
}
