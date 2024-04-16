const moveNext = document.getElementById("icon2")
const movePrev = document.getElementById("icon1")
const images = document.querySelectorAll(".img")
const buttons = document.querySelectorAll(".btn")

let cnt=0;

images.forEach(
    (image, index) => {
        image.style.left = `${index * 100}%` ;
    }
)

moveNext.addEventListener("click", ()=>{
    cnt++;
    moveSlide();
})

movePrev.addEventListener("click", ()=>{
    cnt--;
    moveSlide();
})

buttons.forEach(
    (button, index)=>{
        button.addEventListener("click", ()=>{
            cnt = index;
            moveSlide();
        })
    }
)



const moveSlide = ()=>{
    images.forEach((image)=>{
        image.style.transform = `translateX(-${cnt * 100}%)`

        if(cnt===0){
            movePrev.style.display="none"
            moveNext.style.display="block"
        }else if(cnt===7){
            moveNext.style.display="none"
        }else{
            moveNext.style.display="block"
            movePrev.style.display="block"
        }

        buttons.forEach((button)=>{
            button.style.backgroundColor = "white"
            buttons[cnt].style.backgroundColor = "grey"
        })
    })
}

const slideInterval = setInterval( ()=>{
    cnt++;
    if(cnt>7)cnt=0;
    moveSlide();
}, 3000);