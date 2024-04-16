const arrowNext = document.getElementById("icon2");
const arrowPrev = document.getElementById("icon1");
const images = document.querySelectorAll(".img");
const buttons = document.querySelectorAll(".btn");

let count = 0;

images.forEach((image, index) => {
  image.style.left = `${index * 100}%`;
});

arrowNext.addEventListener("click", () => {
  count++;
  moveSlide();
});

arrowPrev.addEventListener("click", () => {
  count--;
  moveSlide();
});

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    count = index;
    moveSlide();
  });
});

const moveSlide = () => {
  images.forEach((image) => {
    image.style.transform = `translateX(-${count * 100}%)`;

    if (count === 0) {
      arrowPrev.style.display = "none";
      arrowNext.style.display = "block";
    } else if (count === 7) {
      arrowNext.style.display = "none";
    } else {
      arrowNext.style.display = "block";
      arrowPrev.style.display = "block";
    }

    buttons.forEach((button) => {
      button.style.backgroundColor = "white";
      buttons[count].style.backgroundColor = "grey";
    });
  });
};

const imgSlideInterval = setInterval(() => {
  count++;
  if (count > 7) count = 0;
  moveSlide();
}, 3000);
