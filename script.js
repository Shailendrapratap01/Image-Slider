const arrowNextBtn = document.getElementById("arrow-btn-right");
const arrowPrevBtn = document.getElementById("arrow-btn-left");
const imageContainer = document.getElementById("img-container");
const imgSliderBtnContainer = document.getElementById("btn-container");
const addSlideBtn = document.getElementById("add-slide-btn");
const deleteSlideBtn = document.getElementById("delete-slide-btn");
const slidingImgContainer = document.getElementById("sliding-img-container");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const confirmContainer = document.getElementById("confirmation-conatiner");
const lastImgError = document.getElementById("last-img-error");
const invalidUrlError = document.getElementById("invalid-url-error");

let count = 0;
let images;
let imgSliderBtns;

let imgArray = [
  "images/img01.jpeg",
  "images/img02.jpeg",
  "images/img03.jpeg",
  "images/img04.jpeg",
  "images/img05.jpeg",
  "images/img06.jpeg",
  "images/img07.jpeg",
  "images/img08.jpeg",
];

const generateAnImage = (url,classList)=>{
  const image = document.createElement("img");
  image.src = url;
  image.classList.add(classList);
  slidingImgContainer.appendChild(image);
}
const generateBtn = (classList) =>{
  const imageSliderBtn = document.createElement("button");
  imageSliderBtn.classList.add(classList);
  imgSliderBtnContainer.appendChild(imageSliderBtn);
}

const hideOrShowArrowBtns=(preArrowDisplay,nextArrowDisplay)=>{
    arrowPrevBtn.style.display = preArrowDisplay;
    arrowNextBtn.style.display = nextArrowDisplay;
}

for (let i = 0; i < imgArray.length; i++) {
  generateAnImage(imgArray[i], "newImage")
}

  for (let i = 0; i < imgArray.length; i++) {
    generateBtn("new-button")
  }

navigateDotToImg = ()=>{
    imgSliderBtns = document.querySelectorAll(".new-button");
    imgSliderBtns.forEach((imgSliderBtn, index) => {
    imgSliderBtn.addEventListener("click", () => {
        clearInterval(imgSlideInterval);
        count = index;
        moveSlide();
        startImgSlideInterval();
    });
    });
}
navigateDotToImg()

const verifyImageURL = async (url) => {
  url = url?.trim();
  if (url) {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }
  return false;
};

addSlideBtn.addEventListener("click", async () => {
  clearInterval(imgSlideInterval);
  const imgUrl = prompt("Enter the image url");
  const verifiedUrl = await verifyImageURL(imgUrl);
  if (verifiedUrl) {
    imgArray.push(imgUrl);

    generateAnImage(imgUrl, "newImage")
    generateBtn("new-button")
    navigateDotToImg();

  } else if (imgUrl !== null) {
    invalidUrlError.style.display = "flex";
  } else {
    startImgSlideInterval();
  }
});

invalidUrlError.addEventListener("click", () => {
  invalidUrlError.style.display = "none";
  startImgSlideInterval();
});

deleteSlideBtn.addEventListener("click", () => {
  clearInterval(imgSlideInterval);
  if (imgArray.length === 1) {
    lastImgError.style.display = "flex";
    confirmContainer.style.display = "none";
    arrowPrevBtn.style.display = "none";
    arrowNextBtn.style.display = "none";
  } else {
    confirmContainer.style.display = "flex";
  }
});
lastImgError.addEventListener("click", () => {
  lastImgError.style.display = "none";
});

confirmDeleteBtn.addEventListener("click", () => {
  clearInterval(imgSlideInterval);
  imgArray.splice(count, 1);
  imgArray = imgArray.filter((image) => image);
  const images = document.querySelectorAll(".newImage");
  slidingImgContainer.removeChild(images[count]);

  imgSliderBtnContainer.innerHTML = "";
  for (let i = 0; i < imgArray.length; i++) {
    generateBtn("new-button")
  }

  navigateDotToImg();

  if (count === imgArray.length) {
    count = 0;
    slidingImgContainer.style.transform = `translateX(0%)`;
    imgSliderBtns[count].style.backgroundColor = "grey";
  }
  imgSliderBtns.forEach((imgSliderBtn) => {
    imgSliderBtn.style.backgroundColor = "white";
    imgSliderBtns[count].style.backgroundColor = "grey";
  });
  
  confirmContainer.style.display = "none";
  startImgSlideInterval();
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
imageContainer.addEventListener("click", () => {
  invalidUrlError.style.display = "none";
  lastImgError.style.display = "none";
  confirmContainer.style.display = "none";
});
imageContainer.addEventListener("mouseout", () => {
  startImgSlideInterval();
});

const moveSlide = () => {
  slidingImgContainer.style.transform = `translateX(-${100 * count}%)`;

  if (count === 0) {
    hideOrShowArrowBtns("none","block")
  } else if (count === imgArray.length - 1) {
    hideOrShowArrowBtns("block","none")
  } else {
    hideOrShowArrowBtns("block","block")
  }
  imgSliderBtns.forEach((imgSliderBtn) => {
    imgSliderBtn.style.backgroundColor = "white";
    imgSliderBtns[count].style.backgroundColor = "grey";
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
