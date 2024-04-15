const moveNext = document.getElementById("icon2")
const movePrev = document.getElementById("icon1")
const img = document.getElementById("img")
const buttons = document.querySelectorAll("btn")

const imgArr = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg", "images/img7.jpg", "images/img8.jpg"]
let n=0;

moveNext.addEventListener("click", ()=>{
    if(n<7){
        n++;
        img.src = imgArr[n];
    }
})

movePrev.addEventListener("click", ()=>{
    if(n>0){
        n--;
        img.src = imgArr[n];
    }
})