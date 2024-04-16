const arrowNextBtn = document.getElementById("arrow-btn-right");
const arrowPrevBtn = document.getElementById("arrow-btn-left");
const images = document.querySelectorAll(".img");
const imageContainer = document.getElementById("img-container");
const imgSliderBtns = document.querySelectorAll(".btn");

let count = 0;

images.forEach((image, index) => {
  image.style.left = `${index * 100}%`;
});

arrowNextBtn.addEventListener("click", () => {
  clearInterval(imgSlideInterval);
  count++;
  moveSlide();
  startImgSlideInterval();
});

arrowPrevBtn.addEventListener("click", () => {
  clearInterval(imgSlideInterval);
  count--;
  moveSlide();
  startImgSlideInterval();
});

imgSliderBtns.forEach((imgSliderBtn, index) => {
  imgSliderBtn.addEventListener("click", () => {
    clearInterval(imgSlideInterval);
    count = index;
    moveSlide();
    startImgSlideInterval();
  });
});

imageContainer.addEventListener("mouseover", () => {
  clearInterval(imgSlideInterval);
});
imageContainer.addEventListener("mouseout", () => {
  startImgSlideInterval();
});

const moveSlide = () => {
  images.forEach((image) => {
    image.style.transform = `translateX(-${count * 100}%)`;

    if (count === 0) {
      arrowPrevBtn.style.display = "none";
      arrowNextBtn.style.display = "block";
    } else if (count === 7) {
      arrowNextBtn.style.display = "none";
    } else {
      arrowNextBtn.style.display = "block";
      arrowPrevBtn.style.display = "block";
    }

    imgSliderBtns.forEach((imgSliderBtn) => {
      imgSliderBtn.style.backgroundColor = "white";
      imgSliderBtns[count].style.backgroundColor = "grey";
    });
  });
};

let imgSlideInterval;
const startImgSlideInterval = () => {
  imgSlideInterval = setInterval(() => {
    count++;
    if (count > 7) count = 0;
    moveSlide();
  }, 3000);
};
startImgSlideInterval();
