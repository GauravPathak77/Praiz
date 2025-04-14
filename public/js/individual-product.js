const cartButtons = document.querySelectorAll('.cart-button');

cartButtons.forEach(button => {
  button.addEventListener('click', cartClick);
});

function cartClick() {
  let button = this;
  button.classList.add('clicked');
}

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];
const scrollFraction = 0.5; // Adjust this value to control the scrolling distance

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth * scrollFraction;
  });

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth * scrollFraction;
  });
});

function myFunction(x) {
  if (x.matches) { // If media query matches

    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];
    const scrollFraction = .75; // Adjust this value to control the scrolling distance

    productContainers.forEach((item, i) => {
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;

      nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth * scrollFraction;
      });

      preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth * scrollFraction;
      });
    });

  }
}

var x = window.matchMedia("(max-width: 575.98px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes




// $(document).ready(function() {
//   $('.dropdown-toggle').dropdown();
// });

var mainImg = document.getElementById("main-img");
var otherImg = document.querySelectorAll(".small-img-col");
for (var i = 0; i < otherImg.length; i++) {
  otherImg[i].addEventListener("click", function () {
    // //console.log("clicked");
    for (var j = 0; j < otherImg.length; j++) {
      if (otherImg[j].classList.contains("unselected")) {
        continue;
      }
      else {
        otherImg[j].classList.add("unselected");
      }
    }
    this.classList.remove("unselected")
    var selectedImg = this.querySelector(".p-img").getAttribute("src");
    // mainImg=selectedImg;
    // //console.log(mainImg.innerText);
    // //console.log(selectedImg);
    mainImg.setAttribute("src", selectedImg);

  })
}

// //quantity button
// var quantityInput = document.querySelector(".quantity-input");
// var incr = document.querySelector(".quant-up");
// var decr = document.querySelector(".quant-down");
// var productQuant = 0;
// incr.addEventListener("click", function () {
//   // //console.log("incr");
//   productQuant++;
//   quantityInput.setAttribute("value", productQuant);
// })
// decr.addEventListener("click", function () {
//   // //console.log("decr");
//   if (productQuant > 0) {
//     productQuant--;
//     quantityInput.setAttribute("value", productQuant);
//   }
// })

//dropdowns manager

let productDecrp = document.querySelector(".descrp-dropdown .product-decrp");
let productOffers = document.querySelector(".descrp-dropdown .product-offers");
// let productDecrpText=document.querySelector(".descrp-dropdown .product-decrp-text");
let productShipReplace = document.querySelector(".descrp-dropdown .product-ship-replace");
// let productShipReplaceText=document.querySelector(".descrp-dropdown .product-ship-replace-text");

productOffers.addEventListener("click", () => {
  productOffers.classList.toggle("chosen")
})

productDecrp.addEventListener("click", () => {
  productDecrp.classList.toggle("chosen")
})

productShipReplace.addEventListener("click", () => {
  productShipReplace.classList.toggle("chosen")
})

//scroll manage-> hidden-> auto

let containerInner = document.querySelector(".container-inner");
document.addEventListener("scroll", function () {
  let scrollVal = 100;
  if (window.scrollY > 100) {
    containerInner.classList.add("scrolled");
  }
  else {
    containerInner.classList.remove("scrolled");
  }
})

//color Palette selection
// {
//   let colorPaletteList = document.querySelectorAll(".color-palette li");
//   let productColorName = document.querySelector(".color-palette .product-color");
//   let selectedColor = document.querySelector(".color-palette .selected");



//   let colorPalette = document.querySelector(".single-product-details .color-palette ul");

//   if (window.innerWidth <= 768) {
//     colorPalette.addEventListener("click", () => {
//       setTimeout(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }, 800);
//     })
//   }

//   if (selectedColor.classList.contains("c1")) {
//     productColorName.innerHTML = "Silver"
//   }

//   else if (selectedColor.classList.contains("c2")) {
//     productColorName.innerHTML = "Gold"
//   }
//   else if (selectedColor.classList.contains("c3")) {
//     productColorName.innerHTML = "Rose Gold"
//   }

//   for (let i = 0; i < colorPaletteList.length; i++) {
//     colorPaletteList[i].addEventListener("click", () => {
//       for (let j = 0; j < colorPaletteList.length; j++) {
//         colorPaletteList[j].classList.remove("selected");
//       }
//       colorPaletteList[i].classList.add("selected");

//       selectedColor = document.querySelector(".color-palette .selected");

//       if (selectedColor.classList.contains("c1")) {
//         productColorName.innerHTML = "Silver"

//         let silverImg = document.getElementById("silver");
//         if (silverImg) {
//           silverImg.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
//           selectedImgCont = document.querySelector("#silver");
//           selectedImg = document.querySelector("#silver img").getAttribute("src")
//           mainImg.setAttribute("src", selectedImg);
//           for (var j = 0; j < otherImg.length; j++) {
//             if (otherImg[j].classList.contains("unselected")) {
//               continue;
//             }
//             else {
//               otherImg[j].classList.add("unselected");
//             }
//           }
//           selectedImgCont.classList.remove("unselected")

//           // if (window.innerWidth <= 768) {
//           //   window.scrollTo({ top: 0, behavior: 'smooth' });
//           // }
//         }

//       }

//       else if (selectedColor.classList.contains("c2")) {
//         productColorName.innerHTML = "Gold"

//         let goldImg = document.getElementById("gold");
//         if (goldImg) {
//           goldImg.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
//           selectedImgCont = document.querySelector("#gold");
//           selectedImg = document.querySelector("#gold img").getAttribute("src")
//           mainImg.setAttribute("src", selectedImg);
//           for (var j = 0; j < otherImg.length; j++) {
//             if (otherImg[j].classList.contains("unselected")) {
//               continue;
//             }
//             else {
//               otherImg[j].classList.add("unselected");
//             }
//           }
//           selectedImgCont.classList.remove("unselected")
//           // if (window.innerWidth <= 768) {
//           //   window.scrollTo({ top: 0, behavior: 'smooth' });
//           // }
//         }

//       }
//       else if (selectedColor.classList.contains("c3")) {
//         productColorName.innerHTML = "Rose Gold"

//         let roseGoldImg = document.getElementById("rose-gold");
//         if (roseGoldImg) {
//           roseGoldImg.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
//           selectedImgCont = document.querySelector("#rose-gold");
//           selectedImg = document.querySelector("#rose-gold img").getAttribute("src")
//           mainImg.setAttribute("src", selectedImg);
//           for (var j = 0; j < otherImg.length; j++) {
//             if (otherImg[j].classList.contains("unselected")) {
//               continue;
//             }
//             else {
//               otherImg[j].classList.add("unselected");
//             }
//           }
//           selectedImgCont.classList.remove("unselected")
//           // if (window.innerWidth <= 768) {
//           //     window.scrollTo({ top: 0, behavior: 'smooth' });
//           // }
//         }

//       }
//     })
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   let colorPaletteList = document.querySelectorAll(".color-palette li");
//   let productColorName = document.querySelector(".color-palette .product-color");
//   let mainImg = document.querySelector(".main-img img");
//   let otherImg = document.querySelectorAll(".small-img-grp img");

//   function updateColorSelection() {
//     let selectedColor = document.querySelector(".color-palette .selected");
//     let color, imgId;

//     if (selectedColor.classList.contains("c1")) {
//       color = "Silver";
//       imgId = "silver";
//     } else if (selectedColor.classList.contains("c2")) {
//       color = "Gold";
//       imgId = "gold";
//     } else if (selectedColor.classList.contains("c3")) {
//       color = "Rose Gold";
//       imgId = "rose-gold";
//     }

//     productColorName.innerHTML = color;

//     let selectedImgCont = document.getElementById(imgId);
//     if (selectedImgCont) {
//       selectedImgCont.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
//       let selectedImg = selectedImgCont.querySelector("img").getAttribute("src");
//       mainImg.setAttribute("src", selectedImg);

//       otherImg.forEach(img => img.classList.add("unselected"));
//       selectedImgCont.classList.remove("unselected");
//     }
//   }

//   colorPaletteList.forEach((colorItem, index) => {
//     colorItem.addEventListener("click", () => {
//       colorPaletteList.forEach(item => item.classList.remove("selected"));
//       colorItem.classList.add("selected");
//       updateColorSelection();
//     });
//   });

//   if (window.innerWidth <= 768) {
//     document.querySelector(".single-product-details .color-palette ul").addEventListener("click", () => {
//       setTimeout(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }, 800);
//     });
//   }

//   // Initial selection
//   updateColorSelection();
// });


let smallImgGrp = document.querySelector(".small-img-grp");
let imgGrpLeftScroll = document.querySelector(".left-scroll");
let imgGrpRightScroll = document.querySelector(".right-scroll");
document.addEventListener("DOMContentLoaded", function () {
  let colorPaletteList = document.querySelectorAll(".color-palette li");
  let productColorName = document.querySelector(".color-palette .product-color");
  let mainImg = document.querySelector(".main-img img");
  let otherImg = document.querySelectorAll(".small-img-grp img");
  let leftScrollBtn = document.querySelector(".left-scroll");
  let rightScrollBtn = document.querySelector(".right-scroll");
  let smallImgGrp = document.querySelector(".small-img-grp");

  function updateColorSelection(index) {
    let selectedColor = document.querySelector(".color-palette .selected");
    let color, imgId;

    if (index === 0) {
      color = "Silver";
      imgId = "silver";
    } else if (index === 1) {
      color = "Gold";
      imgId = "gold";
    } else if (index == 2) {
      color = "Rose Gold";
      imgId = "rose-gold";
    }

    productColorName.innerHTML = color;

    let selectedImgCont = document.getElementById(imgId);
    if (selectedImgCont) {
      selectedImgCont.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      let selectedImg = selectedImgCont.querySelector("img").getAttribute("src");
      mainImg.setAttribute("src", selectedImg);

      otherImg.forEach(img => img.classList.add("unselected"));
      selectedImgCont.classList.remove("unselected");
    }
  }

  colorPaletteList.forEach((colorItem, index) => {
    colorItem.addEventListener("click", () => {
      colorPaletteList.forEach(item => item.classList.remove("selected"));
      colorItem.classList.add("selected");
      console.log("Color Index: ", index);
      updateColorSelection();
    });
  });

  // if (window.innerWidth <= 768) {
  //   document.querySelector(".single-product-details .color-palette ul").addEventListener("click", () => {
  //     setTimeout(() => {
  //       window.scrollTo({ top: 0, behavior: 'smooth' });
  //     }, 800);
  //   });
  // }

  // Initial selection
  updateColorSelection(0);

  // Scroll functions for left and right buttons
  function scrollLeft() {
    console.log("Scroll Left Button Clicked");
    smallImgGrp.scrollBy({
      top: 0,
      left: -100, // Adjust the value according to your requirement
      behavior: 'smooth'
    });
  }

  function scrollRight() {
    console.log("Scroll Right Button Clicked");
    smallImgGrp.scrollBy({
      top: 0,
      left: 100, // Adjust the value according to your requirement
      behavior: 'smooth'
    });
  }

  leftScrollBtn.addEventListener("click", scrollLeft);
  rightScrollBtn.addEventListener("click", scrollRight);
});



//small-img in main img section scroller 


// Get the width of one image including margin
let imgWidth = document.querySelector(".small-img-col").offsetWidth;

imgGrpLeftScroll.addEventListener("click", function () {
  smallImgGrp.scrollBy({ left: -imgWidth, behavior: 'smooth' });
});

imgGrpRightScroll.addEventListener("click", function () {
  smallImgGrp.scrollBy({ left: imgWidth, behavior: 'smooth' });
});

//testimonial section- scroll to review section

function scrollToSection(event, sectionId) {
  event.preventDefault(); // Prevent the default anchor click behavior
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -(window.innerHeight / 2) + (section.getBoundingClientRect().height / 2); // Offset to center the section
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// testimonial slider 

function scrollSlider(direction) {
  const testimonialContainer = document.querySelector('.testimonial-cards');
  const scrollAmount = 300; // Adjust the scroll amount as needed
  if (direction === 'left') {
    testimonialContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else if (direction === 'right') {
    testimonialContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}


//single-product-details ->  wishlist-button

var wishlistBigBtn = document.querySelector(".single-product-details .wishlist-button");
wishlistBigBtn.addEventListener("click", function () {
  // //console.log(wishlistBigBtn.textContent);
  wishlistBigBtn.textContent = "ADDED TO WISHLIST";
  wishlistBigBtn.style.opacity = ".8";
})

// mainImg.addEventListener("click", ()=>{
//   // //console.log("clickd");
// })



//review secton-> button expansion

var revBtn = document.querySelector(".rev-btn");
var custRev = document.querySelector(".review-inner .cust-rev");
var doubtBtn = document.querySelector(".doubt-btn");
var custDoubt = document.querySelector(".cust-doubt");

// //console.log(custRev.classList);
revBtn.addEventListener("click", function () {
  // //console.log("clicked");
  if (custDoubt.classList.contains("doubt")) {
    custDoubt.classList.remove("doubt");
  }
  custRev.classList.toggle("rev");
})

// //console.log(custDoubt.classList);
doubtBtn.addEventListener("click", function () {
  if (custRev.classList.contains("rev")) {
    custRev.classList.remove("rev");
  }
  custDoubt.classList.toggle("doubt")
})


// Dynamic Banner
// Function to set the background image based on window width
// function setDynamicBanner() {
//   const category = document.getElementById('nav_loc').innerHTML;
//   const element = document.getElementById('cat-banner');
//   const windowWidth = window.innerWidth;

//   //console.log("Loc: ", category);

//   let imageUrl;
//   if (windowWidth <= 575.98) {
//     imageUrl = `/images/Banner/${category}/mob.jpg`;
//   } else {
//     imageUrl = `/images/Banner/${category}/pc.jpg`;
//   }

//   element.style.backgroundImage = `url("${imageUrl}")`;
// }

// Initial call to set the background image on page load
// setDynamicBanner();

// Add event listener for window resize
// window.addEventListener('resize', setDynamicBanner);

// Dynamic Banner End

// Why Praiz Dynamic Banner
function setDynamicBanner() {
  const windowWidth = window.innerWidth;
  let imageUrl = document.querySelector(".why-praiz-banner-inner img");
  if (windowWidth <= 575.98) {
    imageUrl.setAttribute(
      "src",
      "/images/Banner/Product-Banner/Product-Banner-mob.webp"
    );
  } else {
    imageUrl.setAttribute(
      "src",
      "/images/Banner/Product-Banner/Product-Banner.webp"
    );
  }
}

// Initial call to set the background image on page load
setDynamicBanner();

// Add event listener for window resize
window.addEventListener("resize", setDynamicBanner);