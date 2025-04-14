var announcementBarMsg = [
  {
    msg: "Flat 15% off on orders above ₹1499. USE ‘FESTIVE15’"
  },
  {
    msg: "Flat 25% off on orders above ₹1999. USE ‘FESTIVE25’"
  },
  {
    msg: "Unlock 10% Off Sitewide: Use code PRAIZ10"
  },
  {
    msg: "FREE SHIPPING on orders above ₹599"
  }
];

//popup
document.addEventListener("DOMContentLoaded", () => {
  var homePopUp = document.querySelector(".popup-section");
  var popUpCongratsBtn = document.querySelector(".popup-btn");
  popUpCongratsBtn.addEventListener('click', () => {
    homePopUp.style.display = "none";
  })
  var homePopUpClose = document.querySelector(".popup-close");
  homePopUpClose.addEventListener('click', () => {
    homePopUp.style.display = "none";
  })

});

document.addEventListener("DOMContentLoaded", function () {
  var announcementBar1 = document.querySelectorAll(".announcement-bar")[0];
  var i = 0;

  function displayMessage() {
    announcementBar1.style.opacity = 0; // Fade out the announcement bar
    setTimeout(function () {
      announcementBar1.innerText = announcementBarMsg[i].msg;
      // //console.log(announcementBar1.innerText);
      announcementBar1.style.opacity = 1; // Fade in the announcement bar
      i = (i + 1) % announcementBarMsg.length; // Wrap around the index
      setTimeout(displayMessage, 3000); // 3000 milliseconds = 3 seconds
    }, 500); // Add a slight delay for smoother transition
  }

  displayMessage(); // Call displayMessage function after DOMContentLoaded
});

document.addEventListener("DOMContentLoaded", function () {
  var announcementBar2 = document.querySelectorAll(".announcement-bar")[1];
  var i = 0;

  function displayMessage() {
    announcementBar2.style.opacity = 0; // Fade out the announcement bar
    setTimeout(function () {
      announcementBar2.innerText = announcementBarMsg[i].msg;
      announcementBar2.style.opacity = 1; // Fade in the announcement bar
      i = (i + 1) % announcementBarMsg.length; // Wrap around the index
      setTimeout(displayMessage, 3000); // 3000 milliseconds = 3 seconds
    }, 500); // Add a slight delay for smoother transition
  }

  displayMessage(); // Call displayMessage function after DOMContentLoaded
});




// var lastScroll=0;
document.addEventListener("DOMContentLoaded", () => {
  var navbar = document.querySelector("#header .fixed-top");
  // navbar.style.height="3.5rem"
  window.addEventListener("scroll", () => {
    var scrollTop = (document.documentElement.scrollTop);
    // //console.log(scrollTop);
    if (scrollTop > 10) {
      navbar.classList.add("expandedp")
    }

    else if (scrollTop < 10) {
      navbar.classList.remove("expandedp")
    }

    if (scrollTop > 40) {
      navbar.classList.add("expandedpp")
    }

    else if (scrollTop < 40) {
      navbar.classList.remove("expandedpp")
    }

    if (scrollTop > 70) {
      navbar.classList.remove("expandedpp")
      navbar.classList.remove("expandedp")
      navbar.classList.remove("expanded")
      dropDown.classList.remove("md");
      document.querySelectorAll(".top-bar")[1].style.height = "0";
    }
    else if (scrollTop < 145) {
      navbar.classList.add("expanded")
      document.querySelectorAll(".top-bar")[1].style.height = "2rem";

      // navbar.classList.remove("expandedp")
    }
    lastScroll = scrollTop;
  })
});



var navbtn = (document.querySelector("#header .nav-right-btn button"));
var mdheader = document.querySelector(".fixed-top")
// //console.log(navbtn);
navbtn.addEventListener("click", () => {
  navbar.classList.add("expanded");

  // mdheader.style.height="auto"; 
})

var dropDownBtn = document.querySelector(".product-dropdown .product-dropdown-btn");
var dropDown = document.querySelector("#header .navbar-nav .nav-item .drop-down");
dropDownBtn.addEventListener("click", () => {
  // //console.log("clicked");
  dropDown.classList.toggle("md");

  //arrow rotation of dropdown
  if (window.matchMedia("(max-width: 992px)").matches) {
    var rightArrow1 = document.querySelector(".product-dropdown-btn >i");
    rightArrow1.classList.toggle("rotate");

  }

})





//secondary drop-down for lecklace

if (window.matchMedia("(min-width: 992px)").matches) {
  // var navItem=document.querySelector(".dropdown")
  // var productDropDownBtn = document.querySelector(".product-dropdown-btn");
  // var productDropDownBtnArrow = document.querySelector(".product-dropdown-btn i");
  // //console.log(navItem);
  // productDropDownBtn.addEventListener("mouseover", function () {
  //   productDropDownBtnArrow.classList.add("rotate")

  // })

  // navItem.addEventListener("mouseout", function () {
  //   productDropDownBtnArrow.classList.remove("rotate");

  // })

  var necklaceOpt = document.querySelector(".drop-down .necklace");
  var earringOpt = document.querySelector(".drop-down .earring");
  var ringOpt = document.querySelector(".drop-down .ring");
  var braceletOpt = document.querySelector(".drop-down .bracelet");

  var necklaceMenu = document.querySelectorAll(".drop-down-necklace")[1];
  var earringMenu = document.querySelectorAll(".drop-down-earring")[1];
  var ringMenu = document.querySelectorAll(".drop-down-ring")[1];
  var braceletMenu = document.querySelectorAll(".drop-down-bracelet")[1];

  // var selected=document.querySelectorAll(".drop-down a");
  // for(var i =0 ;i<selected.length; i++){
  //   selected[i].addEventListener("mouseover", function(){
  //     this.classList.add("selected");
  //   })
  //   selected[i].addEventListener("mouseout", function(){
  //     this.classList.remove("selected");
  //   })
  // }

  // if(necklaceOpt.classList.contains("selected")){
  //   //console.log("necklace selected");
  // }

  // //console.log(necklaceOpt);
  necklaceMenu.addEventListener("mouseover", function () {
    necklaceMenu.style.maxWidth = "10rem";
  });
  necklaceOpt.addEventListener("mouseover", function () {
    necklaceMenu.style.maxWidth = "10rem";
  });
  necklaceMenu.addEventListener("mouseout", function () {
    necklaceMenu.style.maxWidth = "0rem";
  });
  necklaceOpt.addEventListener("mouseout", function () {
    necklaceMenu.style.maxWidth = "0rem";
  });

  earringMenu.addEventListener("mouseover", function () {
    earringMenu.style.maxWidth = "10rem";
  });
  earringOpt.addEventListener("mouseover", function () {
    earringMenu.style.maxWidth = "10rem";
  });
  earringMenu.addEventListener("mouseout", function () {
    earringMenu.style.maxWidth = "0rem";
  });
  earringOpt.addEventListener("mouseout", function () {
    earringMenu.style.maxWidth = "0rem";
  });

  ringMenu.addEventListener("mouseover", function () {
    ringMenu.style.maxWidth = "10rem";
  });
  ringOpt.addEventListener("mouseover", function () {
    ringMenu.style.maxWidth = "10rem";
  });
  ringMenu.addEventListener("mouseout", function () {
    ringMenu.style.maxWidth = "0rem";
  });
  ringOpt.addEventListener("mouseout", function () {
    ringMenu.style.maxWidth = "0rem";
  });

  braceletMenu.addEventListener("mouseover", function () {
    braceletMenu.style.maxWidth = "10rem";
  });
  braceletOpt.addEventListener("mouseover", function () {
    braceletMenu.style.maxWidth = "10rem";
  });
  braceletMenu.addEventListener("mouseout", function () {
    braceletMenu.style.maxWidth = "0rem";
  });
  braceletOpt.addEventListener("mouseout", function () {
    braceletMenu.style.maxWidth = "0rem";
  });


}

//For below md screen secondary drop-down (subdrop)

if (window.matchMedia("(max-width: 992.98px)").matches) {
  var mdNecklaceOpt = document.querySelector(".drop-down .necklace");
  var mdEarringOpt = document.querySelector(".drop-down .earring");
  var mdRingOpt = document.querySelector(".drop-down .ring");
  var mdBraceletOpt = document.querySelector(".drop-down .bracelet");

  var mdNecklaceSubDrop = document.querySelector(".drop-down-necklace");
  var mdEarringSubDrop = document.querySelector(".drop-down-earring");
  var mdRingSubDrop = document.querySelector(".drop-down-ring");
  var mdBraceletSubDrop = document.querySelector(".drop-down-bracelet");

  var mdDropDown = document.querySelector(".drop-down");

  var rightArrow2 = document.querySelector(".necklace i");
  var rightArrow3 = document.querySelector(".earring i");
  var rightArrow4 = document.querySelector(".ring i");
  var rightArrow5 = document.querySelector(".bracelet i");

  mdNecklaceOpt.addEventListener("click", function () {
    var currentHeight = mdNecklaceSubDrop.clientHeight;
    // //console.log(mdDropDown.classList);



    // Check if the current height is 0
    if (currentHeight === 0) {
      // If it's 0, set the height to your desired value

      //closing other subdrops
      mdEarringSubDrop.style.height = "0";
      mdRingSubDrop.style.height = "0";
      mdBraceletSubDrop.style.height = "0";
      rightArrow3.classList.remove("rotate");
      rightArrow4.classList.remove("rotate");
      rightArrow5.classList.remove("rotate");

      //opening necklace subdrop
      rightArrow2.classList.add("rotate");
      mdNecklaceSubDrop.style.height = "22rem";
      mdDropDown.classList.add("active");
    } else {
      // If it's not 0, set the height to 0 (toggle off)
      rightArrow2.classList.remove("rotate");
      mdNecklaceSubDrop.style.height = "0";
      mdDropDown.classList.remove("active");
    }

  })

  mdEarringOpt.addEventListener("click", function () {
    var currentHeight = mdEarringSubDrop.clientHeight;
    // //console.log(mdDropDown.classList);

    // Check if the current height is 0
    if (currentHeight === 0) {
      // If it's 0, set the height to your desired value

      //closing other subdrops
      mdNecklaceSubDrop.style.height = "0";
      mdRingSubDrop.style.height = "0";
      mdBraceletSubDrop.style.height = "0";
      rightArrow2.classList.remove("rotate");
      rightArrow4.classList.remove("rotate");
      rightArrow5.classList.remove("rotate");

      //opening earring subdrop

      rightArrow3.classList.add("rotate");
      mdEarringSubDrop.style.height = "22rem";
      mdDropDown.classList.add("active");
    } else {
      // If it's not 0, set the height to 0 (toggle off)
      rightArrow3.classList.remove("rotate");
      mdEarringSubDrop.style.height = "0";
      mdDropDown.classList.remove("active");
    }

  })


  mdRingOpt.addEventListener("click", function () {
    var currentHeight = mdRingSubDrop.clientHeight;
    // //console.log(mdDropDown.classList);

    // Check if the current height is 0
    if (currentHeight === 0) {
      // If it's 0, set the height to your desired value

      //closing other subdrops
      mdNecklaceSubDrop.style.height = "0";
      mdEarringSubDrop.style.height = "0";
      mdBraceletSubDrop.style.height = "0";
      rightArrow2.classList.remove("rotate");
      rightArrow3.classList.remove("rotate");
      rightArrow5.classList.remove("rotate");


      //opening ring subdrop

      rightArrow4.classList.add("rotate");
      mdRingSubDrop.style.height = "22rem";
      mdDropDown.classList.add("active");
    } else {
      // If it's not 0, set the height to 0 (toggle off)
      rightArrow4.classList.remove("rotate");
      mdRingSubDrop.style.height = "0";
      mdDropDown.classList.remove("active");
    }

  })


  mdBraceletOpt.addEventListener("click", function () {
    var currentHeight = mdBraceletSubDrop.clientHeight;
    // //console.log(mdDropDown.classList);

    // Check if the current height is 0
    if (currentHeight === 0) {
      // If it's 0, set the height to your desired value

      //closing other subdrops
      mdNecklaceSubDrop.style.height = "0";
      mdEarringSubDrop.style.height = "0";
      mdRingSubDrop.style.height = "0";
      rightArrow2.classList.remove("rotate");
      rightArrow3.classList.remove("rotate");
      rightArrow4.classList.remove("rotate");

      //opening bracelet subdrop

      rightArrow5.classList.add("rotate");
      mdBraceletSubDrop.style.height = "22rem";
      mdDropDown.classList.add("active");
    } else {
      // If it's not 0, set the height to 0 (toggle off)
      rightArrow5.classList.remove("rotate");
      mdBraceletSubDrop.style.height = "0";
      mdDropDown.classList.remove("active");
    }

  })
}




// var addToCart = document.querySelectorAll(".add-to-cart");
// for (var i = 0; i < addToCart.length; i++) {
//   addToCart[i].addEventListener("click", function () {
//     this.innerHTML = "Added to Cart";
//     this.style.backgroundColor = "#132043";
//     this.style.color = "white";
//   });
// }


// Offer Banner
function setDynamicBannerOffer() {
  const windowWidth = window.innerWidth;
  let imageUrl = document.querySelector(".off-banner img");
  if (windowWidth <= 575.98) {
    imageUrl.setAttribute(
      "src",
      "/images/Banner/Offer-banner/top-offer-mob.webp"
    );
  } else {
    imageUrl.setAttribute(
      "src",
      "/images/Banner/Offer-banner/top-offer.webp"
    );
  }
}

setDynamicBannerOffer();
window.addEventListener('resize', setDynamicBannerOffer);