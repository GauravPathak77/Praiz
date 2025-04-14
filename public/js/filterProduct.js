// Filter Banner
function setDynamicBannerFilter() {
    const style = document.getElementById('filter_nav_loc').innerHTML;
    const element = document.querySelector('#filter-banner img');
    const windowWidth = window.innerWidth;
  
    console.log("Path: ", `/images/Banner/${style}/mob.webp`);
  
    // let imageUrl = `/images/Banner/${style}/pc.webp`;
    if (windowWidth <= 575.98) {
        element.setAttribute('src', `/images/Banner/${style}/mob.webp`);
        // imageUrl = `/images/Banner/${style}/mob.webp`;
    } else {
        element.setAttribute('src', `/images/Banner/${style}/pc.webp`);
        // imageUrl = `/images/Banner/${style}/pc.webp`;
    }
  
    // element.style.backgroundImage = `url("${imageUrl}")`;
  }
  
  setDynamicBannerFilter();
  window.addEventListener('resize', setDynamicBannerFilter);
  
  
  