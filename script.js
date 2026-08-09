window.addEventListener("load",()=>{


const loader=document.getElementById("loader");


if(loader){

setTimeout(()=>{


loader.style.opacity="0";


setTimeout(()=>{

loader.style.display="none";

},500);



},1500);


}




console.log("Klypse Loaded");




// Download Button

const downloadButton=document.getElementById("downloadButton");


if(downloadButton){


downloadButton.addEventListener("click",()=>{


alert("Klypse download coming soon.");


});


}






// Card animations

const cards=document.querySelectorAll(".card");


cards.forEach(card=>{


card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px)";

});


card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});


});



});