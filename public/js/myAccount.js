// Address functionality start
// Handling Save Address buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radioButton, index) => {
  radioButton.addEventListener('change', () => {
    // Call your save_to_order() function here
    console.log("----------------------------");
    save_to_order(index);
  });
});
// Address functionality End


////////////////////////////////////////////////////////////////////////////////////////////////////////



var sideMenu = document.querySelector(".account-side-menu");
var option1 = document.querySelector(".option-1");
// var option2 = document.querySelector(".option-2");
var option3 = document.querySelector(".option-3");
var option4 = document.querySelector(".option-4");


option1.addEventListener("click", () => {
    sideMenu.classList = ["account-side-menu"];
    sideMenu.classList.add("option1");
})
// option2.addEventListener("click", () => {
//     sideMenu.classList = ["account-side-menu"];
//     sideMenu.classList.add("option2");
// })
option3.addEventListener("click", () => {
    sideMenu.classList = ["account-side-menu"];
    sideMenu.classList.add("option3");
})
option4.addEventListener("click", () => {
    sideMenu.classList = ["account-side-menu"];
    sideMenu.classList.add("option4");
})

//Address Book

var addressCard = document.querySelector(".address-card");
var card = document.querySelectorAll(".Acard");

card[0].addEventListener("click", ()=>{
    addressCard.classList.add("new-card");
    if(addressCard.classList.contains("new-card")){
        option3.addEventListener("click", () => {
           addressCard.classList.remove("new-card");
        })
    };
})
var addressName=document.querySelectorAll(".address-name");
if(sideMenu.classList.contains("option3")){
    //console.log(addressName);

}


var editBtn = document.querySelectorAll(".edit-btn");
var submitBtn = document.querySelectorAll(".submit-btn");
var infoInner = document.querySelectorAll(".info-inner");
for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", () => {
        infoInner[i].classList.add("editBtn");
    })
}


// New Address Book

var lgAddressCards=document.querySelectorAll(".lg-address-card");
var addressBookLg=document.querySelector(".address-book-lg");
var backBtn=document.querySelectorAll(".address-form .back-btn");
// //console.log(addressBook);
for(var i=0; i<lgAddressCards.length; i++){
    lgAddressCards[0].addEventListener("click", function(){
        setTimeout(() => {
            addressBookLg.classList.add("active");
        }, 100);
    })
}
for(var i=0; i<backBtn.length; i++){
    backBtn[i].addEventListener("click", function(){
        addressBookLg.classList.remove("active");
    })
}

// New Address Book for Mob Screen

var xsAddressCards=document.querySelectorAll(".xs-address-card");
var addressBookXs=document.querySelector(".address-book-xs");
var backBtnXs=document.querySelectorAll(".address-form-xs .back-btn");

for(var i=0; i<xsAddressCards.length; i++){
    xsAddressCards[0].addEventListener("click", function(){
        setTimeout(() => {
            addressBookXs.classList.add("active");
        }, 100);
    })
}
for(var i=0; i<backBtnXs.length; i++){
    backBtnXs[i].addEventListener("click", function(){
        addressBookXs.classList.remove("active");
    })
}





//Mobile MyAccount Menu

var mobMenu=document.querySelector(".mob-account-opt");
var mobOpt1=document.querySelector(".mob-option-1");
// var mobOpt2=document.querySelector(".mob-option-2");
var mobOpt3=document.querySelector(".mob-option-3");
var mobOpt4=document.querySelector(".mob-option-4");

mobOpt1.addEventListener("click", () => {
    mobMenu.classList = ["mob-account-opt d-block d-sm-none"];
    mobMenu.classList.add("order-history");
})
// mobOpt2.addEventListener("click", () => {
//     mobMenu.classList = ["mob-account-opt d-block d-sm-none"];
//     mobMenu.classList.add("praiz-coins");
// })
mobOpt3.addEventListener("click", () => {
    mobMenu.classList = ["mob-account-opt d-block d-sm-none"];
    mobMenu.classList.add("address-book");
})
mobOpt4.addEventListener("click", () => {
    mobMenu.classList = ["mob-account-opt d-block d-sm-none"];
    mobMenu.classList.add("my-account");
})


// Set Rating
document.addEventListener('DOMContentLoaded', function () {
  const rateBtns = document.querySelectorAll('.rateBtn');
  const closeModalBtnRat = document.querySelector('.close');
  const closeModalBtn2 = document.querySelector('.close2');
  const modal = document.getElementById('ratingModal');
  const modal2 = document.getElementById('ratingModal2');
  const stars = document.querySelectorAll('.star');
  const stars2 = document.querySelectorAll('.star2');
  const submitBtn = document.getElementById('submitBtn');
  const closeBtn = document.getElementById('closeBtn');
  const submitBtn2 = document.getElementById('submitBtn2');
  const closeBtn2 = document.getElementById('closeBtn2');
  const ratingValue = document.getElementById('ratingValue');
  const ratingValue2 = document.getElementById('ratingValue2');
  

  rateBtns.forEach(rateBtn => {
    rateBtn.addEventListener('click', function () {
      modal.style.display = 'block';
      modal2.style.display = 'block';
      // const productName = rateBtn.parentElement.querySelector('h3').textContent;
      // document.getElementById('productName').textContent = productName;
    });
  });

  closeModalBtnRat.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  closeModalBtn2.addEventListener('click', function () {
    modal2.style.display = 'none';
  });

  stars.forEach(star => {
    star.addEventListener('click', function () {
      const rating = parseInt(star.getAttribute('data-rating'));
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove('far');
          s.classList.add('fas', 'solid');
        } else {
          s.classList.remove('fas', 'solid');
          s.classList.add('far');
        }
      });
      ratingValue.value = rating;
    });
  });


  stars2.forEach(star => {
    star.addEventListener('click', function () {
      const rating = parseInt(star.getAttribute('data-rating'));
      stars2.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove('far');
          s.classList.add('fas', 'solid');
        } else {
          s.classList.remove('fas', 'solid');
          s.classList.add('far');
        }
      });
      ratingValue2.value = rating;
    });
  });

  submitBtn.addEventListener('click', function () {
    const rating = document.querySelectorAll('.star.fas').length;
    if (rating > 0) {
      // alert(`You rated ${rating} stars for ${productName}.`);
      modal.style.display = 'none';
    } else {
      alert('Please rate the product.');
    }
  });


  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  submitBtn2.addEventListener('click', function () {
    const rating = document.querySelectorAll('.star2.fas').length;
    if (rating > 0) {
      // alert(`You rated ${rating} stars for ${productName}.`);
      modal2.style.display = 'none';
    } else {
      alert('Please rate the product.');
    }
  });


  closeBtn2.addEventListener('click', function () {
    modal2.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    if (event.target === modal2) {
      modal2.style.display = 'none';
    }
  });
});


const setRatings = async(pId) => {
  const rate = document.getElementById('ratingValue').value;

  const response = await fetch('/product/rating', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      star: rate,
      prodId: pId
    })
  });

  const data = await response.json();

  //console.log("Data: ", data);
  modal.style.display = 'none';
  modal2.style.display = 'none';
}



// Address Functionality



// Address form validation
function check_address(uId) {
  // Get form inputs
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const address1 = document.getElementById('address1').value;
  const pinCode = document.getElementById('pin_code').value;
  const phoneNo = document.getElementById('phone_no').value;
  const title = document.getElementById('title').value;

  // Validate inputs
  if (firstName.trim() === '' || lastName.trim() === '' || address1.trim() === '' || pinCode.trim() === '' || phoneNo.trim() === '' || title.trim() === '') {
      document.getElementById('address_alert').innerHTML = `*Fill all the essential fields before submitting!`;
      return false;
  }

  // Additional validation (e.g., phone number format)
  var phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phoneNo)) {
    document.getElementById('address_alert').innerHTML = '*Please enter a valid 10-digit phone number.';
      return false;
  }

  document.getElementById('address_alert').innerHTML = '';
  document.getElementById('address_submit').innerHTML = 'Submitting...';

  //console.log("ID: ", uId);
  save_address(uId);
  // Replace the alert below with your actual submission logic
  // alert('Form submitted successfully!');
  // return true;
}


// Save Address
async function save_address(uId){
  //console.log("My Address");
  const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const address = `${document.getElementById('address1').value || ''} ${document.getElementById('address2').value || ''}`.trim();
      const pin_code = document.getElementById('pin_code').value;
      const phone_number = document.getElementById('phone_no').value;
      const title = document.getElementById('title')?.value

  try {
      const response = await fetch(`/user/save-address/${uId}`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
              'firstname': firstname,
              'lastname': lastname,
              'address': address,
              'pin_code': pin_code,
              'phone_number': phone_number,
              'title': title,
          }),
      });

  if (!response.ok) {
      throw new Error('Network response was not ok.');
  }

  const data = await response.json();
  //console.log("Address: ", data);
  window.location.reload();
  
} catch (error) {
  console.error('Error saving address:', error);
}
};

var addOpt=document.querySelectorAll(".form-check");
var newAddForm = document.querySelector(".new-add-form");
var addressForm=document.querySelector(".address-form")

addOpt.forEach(function(element, index) {
    element.addEventListener("click", function() {
        this.classList.add("selected");
        addOpt.forEach(function(otherElement, otherIndex) {
            if (otherIndex !== index && otherElement.classList.contains("selected")) {
                otherElement.classList.remove("selected");
            }
        });
        //console.log("clicked");
    });
});


async function save_to_order(position) {
  // if(radioButtons.length == 1){
  //     document.getElementById('flexRadioDefault3').checked = true;
  // }
  if(position !== radioButtons.length-1){
      const oId = document.getElementById('order_id').value;
      const firstname = document.getElementsByClassName('address-firstname')[position].innerHTML;
      const lastname = document.getElementsByClassName('address-lastname')[position].innerHTML;
      const pin_code = document.getElementsByClassName('address-pin_code')[position].innerHTML;
      const phone_number = document.getElementsByClassName('address-phone_number')[position].innerHTML;
      const title = document.getElementsByClassName('address-title')[position].innerHTML;
      const address = document.getElementsByClassName('address-content')[position].innerHTML;
      //console.log(title, " ", address);

      try {
          const response = await fetch(`/user/save-address-to-order`, {
              method: "POST",
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify({
                  'oId': oId,
                  'firstname': firstname,
                  'lastname': lastname,
                  'address': address,
                  'pin_code': pin_code,
                  'phone_number': phone_number,
                  'title': title,
              }),
          });
  
      if (!response.ok) {
          throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      console.log("Updated Order: ", data);
      document.getElementById('checkout_securely').disabled = false;
      
  } catch (error) {
      console.error('Error updating Order:', error);
  }
  } else {
    document.getElementById('checkout_securely').disabled = true;
  }
}
