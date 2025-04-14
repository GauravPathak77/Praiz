// Dynamic Banner
// Function to set the background image based on window width
function setDynamicBannerCart() {
    const category = document.getElementById('nav_loc').innerHTML;
    const element = document.getElementById('cat-banner');
    const windowWidth = window.innerWidth;
  
    //console.log("Loc: ", category);
  
    let imageUrl;
    if (windowWidth <= 575.98) {
        imageUrl = `/images/Banner/${category}/mob.webp`;
    } else {
        imageUrl = `/images/Banner/${category}/pc.webp`;
    }
  
    element.style.backgroundImage = `url("${imageUrl}")`;
  }

  
  // Initial call to set the background image on page load
  setDynamicBannerCart();
  
  // Add event listener for window resize
  window.addEventListener('resize', setDynamicBannerCart);  
// Dynamic Banner End


// const prod_quantity = document.querySelectorAll('.sold_quantity');

// prod_quantity.forEach(quant => {
//     let quantity = quant.value;
//     console.log("Quantity = ", quantity + " ");
//     if(quantity === 0){
        
//     }
// });

const sprod_quantity = document.getElementById("sprod_quantity").value;
console.log("Single Quantity = ", sprod_quantity);
  