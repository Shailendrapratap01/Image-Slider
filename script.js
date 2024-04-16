const arrowNextBtn = document.getElementById("arrow-btn-right");
const arrowPrevBtn = document.getElementById("arrow-btn-left");
const imageContainer = document.getElementById("img-container");
const imgSliderBtnContainer = document.getElementById("btn-container");

let count = 0;

const imgArray = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
];

const createNewImage = () => {
  for (let i = 0; i < imgArray.length; i++) {
    const image = document.createElement("img");
    image.src = imgArray[i];
    image.classList.add("newImage");
    imageContainer.appendChild(image);
  }
};
createNewImage();

const images = document.querySelectorAll(".newImage");

images.forEach((image, index) => {
  image.style.left = `${index * 100}%`;
});

const createSliderbtns = () => {
  for (let i = 0; i < imgArray.length; i++) {
    const imageSliderBtn = document.createElement("button");
    imageSliderBtn.classList.add("new-button");
    imgSliderBtnContainer.appendChild(imageSliderBtn);
  }
};
createSliderbtns();

const imgSliderBtns = document.querySelectorAll(".new-button");

imgSliderBtns.forEach((imgSliderBtn, index) => {
  imgSliderBtn.addEventListener("click", () => {
    clearInterval(imgSlideInterval);
    count = index;
    moveSlide();
    startImgSlideInterval();
  });
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
    } else if (count === imgArray.length - 1) {
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
    if (count > imgArray.length - 1) count = 0;
    moveSlide();
  }, 3000);
};
startImgSlideInterval();
