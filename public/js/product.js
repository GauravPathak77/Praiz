let otp = Math.floor(Math.random()*10000 + 1);
// let userOtp = 0;
let mobile = "";
// console.log("Product.js is called");

// document.addEventListener('DOMContentLoaded', function() {
//     const cartCountInput = document.getElementById('cartCountInput');
//     if (cartCountInput) {
//         cartCountInput.value = cartCount;
//     }
// });

let cartHTML = " ";
    let addToCart = document.querySelectorAll(".add-to-cart");
    for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", function () {
    cartHTML = addToCart[i];
    console.log('HTML:', cartHTML);
    this.innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
    </div>`;
    });
}

const add_to_cart = async (id, slug, productName, productImg, quantity, price, sellingPrice, discount, color, bearerToken) => {

    let get_count = Number(document.getElementById('s_quantity')?.value);
    if(!get_count){
        get_count = 1;
    }
    console.log("Count: ", get_count);
    
    console.log("Get Counts: ", get_count);
    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${bearerToken}` 
        },
        body: JSON.stringify({
            "_id": id,
            "slug": slug,
            "title": productName,
            "image": productImg,
            "count": get_count,
            "price": Number(price),
            "sellingPrice": Number(sellingPrice),
            "discount": Number(discount),
            "quantity": Number(quantity),
            "color": color,
            "size": "adjustable"
        })
    };

    const response = await fetch("/user/cart", options);
    const data = await response.json();
    console.log("Cart: ", data);

    // cartHTML.innerHTML = `${data.message}`;
    // document.getElementById('cartCountInput').value = data.cart_length;
    // return response;

    setTimeout(waitCartHTML(data), 5000);
}

const waitCartHTML = (data) => {
    if(cartHTML !== " "){
        cartHTML.innerHTML = `${data.message}`;
        document.getElementById('cartCountInput').value = data.cart_length;
        return;
    } else {
        setTimeout(waitCartHTML, 1000);
    }
}



const remove_from_cart = async (id, bearerToken) => {

    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${bearerToken}` 
        },
        body: JSON.stringify({
            "_id": id,
        })
    };
    
    const data = await fetch("/user/cart-remove", options);
    const response = await data.json();
    console.log("Cart: ", response);
    location.reload();
    return response;
}

let removeFromCart = document.querySelectorAll(".remove_cart");
    for (let i = 0; i < removeFromCart.length; i++) {
    removeFromCart[i].addEventListener("click", function () {
    this.innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
    </div>`;
    });
}


const buy_now = async (id, productName, productImg, quantity, price, sellingPrice, discount, color, bearerToken) => {
    const get_count = Number(document.getElementById('s_quantity').value);
    console.log("Count:", get_count);
    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${bearerToken}` 
        },
        body: JSON.stringify({
            "_id": id,
            "title": productName,
            "image": productImg,
            "count": get_count,
            "price": Number(price),
            "sellingPrice": Number(sellingPrice),
            "discount": Number(discount),
            "quantity": Number(quantity),
            "color": color
        })
    };

    const response = await fetch("/user/cart", options);
    const data = await response.json();
    console.log("Cart: ", data);
    // if(!Boolean(response.status)){
        window.location.href = '/user/cart';
    // }
    // return response;
}

let buyNow = document.querySelectorAll(".buy_now");
    for (let i = 0; i < buyNow .length; i++) {
        buyNow[i].addEventListener("click", function () {
    this.innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
    </div>`;
    });
}

// wishlist button for mobile

let wishHTML = ' ';
let wishListButtonMob = document.querySelectorAll(".wishlist-button-small-mob")
for (let i = 0; i < wishListButtonMob.length; i++) {
  wishListButtonMob[i].addEventListener("click", function () {
    wishHTML = wishListButtonMob[i];
    // this.innerHTML = "Added to Wishlist";
    // this.style.backgroundColor = "#a45d47";
    // this.style.color = "white";
    // this.style.opacity = ".6"
  })
}

let small_wish_button = ' ';
 //wishlist btn

let wishListButton = document.querySelectorAll(".wishlist-button-small");
for (let i = 0; i < wishListButton.length; i++) {
    wishListButton[i].addEventListener("click", function () {
    small_wish_button = wishListButton[i];
   })
}


const add_to_wishlist = async (prodId, _id) => {
    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json"
            // headers: `Bearer ${bearerToken}`
        },
        body: JSON.stringify({
            "prodId": prodId,
            "userId": _id
        })
    };

    if(_id === ' ') {
        window.location.href = '/myacc';
    } else {
        const data = await fetch("/product/addWishlist", options);
        const response = await data.json();
        console.log("Wishlist:", response);
        wishHTML.innerHTML = `${response.message}`;
    
        if(wishHTML !== ' '){
            wishHTML.style.backgroundColor = "#a45d47";
            wishHTML.style.color = "white";
            wishHTML.style.opacity = ".6"
        }
        else if(small_wish_button !== ' '){
            small_wish_button.innerHTML = '<i class="fa-solid fa-heart" style="color: #a45d47;"></i>'
        }

        return response;
    }    
}


const remove_from_wishlist = async (prodId, _id) => {
    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json"
            // headers: `Bearer ${bearerToken}`
        },
        body: JSON.stringify({
            "prodId": prodId,
            "userId": _id
        })
    };

    const data = await fetch("/product/removeWishlist", options);
    const response = await data.json();
    console.log("Wishlist:", response);
    location.reload();
    return response;
}

const toggle_quantity = async (cartId, productId, count) => {

    // let quantity = document.querySelectorAll(".total-amount");
    document.querySelectorAll(".total-amount").innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
    </div>`;
//     for (let i = 0; i < toggle_spin.length; i++) {
//         toggle_spin[i].addEventListener("input", function () {
//             this.innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
//     <span class="visually-hidden"></span>
//     </div>`;
//     });
// }

    // Get all elements with class 'spinner-button'
    // const spinners = document.getElementsByClassName('quantity__input');

    // Add click event listener to each button
    // for (let button of spinnerButtons) {
    //     button.addEventListener('click', function() {
    //         // Add spinner HTML to the button
    //         button.innerHTML = `
    //             <div class="spinner-grow" role="status">
    //                 <span class="visually-hidden">Loading...</span>
    //           </div>
    //         `;
    //     });
    // }


    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "cartId": cartId,
            "productId": productId,
            "count": count
        })
    };

    const response = await fetch("/user/toggleQuantity", options);
    const data = await response.json();
    window.location.reload();
    return data;
}

// const toggle_quantity_util = async () => {
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json'
//         }
//     };

//     const data = await fetch("http://localhost:3000/user/", options);
//     const res = data.json();
//     console.log(res, "__________________________");
//     return res;
// }

// const checkout = () => {
//     // Redirect to the specified URL
//     window.location.href = "/user/checkout";
// }

const sendRegOtp = async() => {
    document.getElementById('verifyNum').innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
  </div>`;
    mobile = document.getElementById('mobile_no').value;
    console.log("OTP: ", otp, " Mobile-no.: ", mobile);
    document.getElementById('verifyNum').innerHTML = "Resend OTP..";
    // const options =  ;
    const response = await fetch("/user/reg_otp", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "otp": otp,
            "mobile": mobile
        })
    });
    const data = await response.json();
    console.log("Data: ", data);
    // document.getElementById('entered_otp').style.opacity = 1;
    document.getElementById('verifyNum').innerHTML = 'Verify';
    if(data.return === true){
        document.getElementById('input_OTP').style.display = 'block';
        document.getElementById('submit_otp').disabled = false;
    } else {
        document.getElementById('otp_msg').innerHTML = data;
    }
}

let toggleHTML = " ";
    let spinner = document.querySelectorAll(".spinner"); 
    let changeQuantity = document.querySelectorAll(".change_quantity");
    for (let i = 0; i < changeQuantity.length; i++) {
        changeQuantity[i].addEventListener("click", function () {
    console.log('HTML:', changeQuantity);
    spinner[i/2].innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
    </div>`;
    });
}

const sendOtp = async() => {
    mobile = document.getElementById('mobile_no').value;
    console.log("OTP: ", otp, " Mobile-no.: ", mobile);
    // const options =  ;
    const response = await fetch("/user/otp_validation", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "otp": otp,
            "mobile": mobile
        })
    });
    const data = await response.json();
    console.log("Data: ", data);
    // document.getElementById('entered_otp').style.opacity = 1;
    if(data.return === true){
        // document.getElementById('input_OTP').style.opacity = '1';
        document.getElementById('submit_otp').disabled = false;
    }
}
// userOtp = document.getElementById('entered_otp').value;
// let userOtp = document.getElementById('entered_otp').value;
// if(userOtp !== ""){
//     if(otp == userOtp){
//         document.getElementById('submit_otp').disabled = false;
//     }
//     else{
//         document.getElementById('otp_alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
//         <strong>Wrong OTP</strong> Enter correct otp.
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       </div>`
//     }
// }

const checkOtp = async() => {
    document.getElementById('otp_msg').innerHTML = "";
    const userOtp = (Number)(document.getElementById('entered_otp').value);
    console.log("Sent OTP: ", otp, " User OTP:", userOtp);
    if(otp == userOtp){
        document.getElementById('otp_msg').innerHTML = " ";
        document.getElementById('register_field').style.opacity = 1;
        document.getElementById('reg_btn').disabled = false;
    } else {
        document.getElementById('otp_msg').innerHTML = "Wrong OTP";
    }
}

const submitOtp = async() => {
    const userOtp = (Number)(document.getElementById('entered_otp').value);
    console.log("Sent OTP: ", otp, " User OTP:", userOtp);
    if(otp == userOtp){
    console.log("2.Sent OTP: ", typeof(otp), " User OTP:", typeof(userOtp));
        const response = await fetch("/user/edit-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                "mobile": mobile,
            })
        });
        const data = await response.json();
        const id = data._id;
        if(id){
            window.location.href = `/user/updatePass/${id}`; 
        }
        else{
            console.log("Data: ", data);
        }
        // window.location.href = '/myacc';
        return data;
    }
    else{
        document.getElementById('otp_alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Wrong OTP</strong> Enter correct otp.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }
}

    // const pass1 = document.getElementById('pass1').value;
    // const pass2 = document.getElementById('pass2').value;

    // if (pass1 !== "" && pass2 !== "") {
    //     if (pass1 === pass2) {
    //         document.getElementById('updatePassword').disabled = false;
    //     } else {
    //         document.getElementById('otp_alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    //         <strong>Passwords</strong> are not same.
    //         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    //         </div>`;
    //     }
    // }



// const submitUpdatedPassword = async(uId) => {
//     const pass1 = document.getElementById('pass1').value;
//     const pass2 = document.getElementById('pass2').value;

//     if(pass1 == pass2){
//         const response = await fetch(`/user/setUpdate/${uId}`, {
//             method: "POST",
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 'pass': pass1,
//                 'id': uId
//             })
//         });

//         const data = await response.json();
//         console.log("Data: ", data);
//     }
//     else{
//         document.getElementById('otp_alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
//         <strong>Passwords</strong> are not same.
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       </div>`
//     }
// }

// 
document.getElementById('checkout_securely').addEventListener("click", () => {
    document.getElementById('checkout_securely').innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden">Loading...</span>
  </div>`;
});


// Razorpay
function checkoutSecurely(oID) {
    var form = document.querySelector('.pay-form');
    var formData = new URLSearchParams(new FormData(form)).toString();

    fetch('/checkout/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        if (res.success) {
            var options = {
                "key": res.key_id,
                "amount": res.amount,
                "currency": "INR",
                "name": res.product_name,
                "description": res.description,
                "image": "https://res.cloudinary.com/deledfivo/image/upload/v1714409157/PRAIZ-LOGO-FULL_owsw5u.jpg",
                "order_id": res.order_id,
                "handler": function(response) {
                    // alert("Payment Succeeded");
                    window.location.href = `/thankYou/${oID}`; // Success Page
                },
                "prefill": {
                    "contact": res.contact,
                    "name": res.name,
                    "email": res.email,
                    "newOrder": res.order
                },
                "notes": {
                    "description": res.description
                },
                "theme": {
                    "color": "#2300a3"
                }
            };
            var razorpayObject = new Razorpay(options);
            razorpayObject.on('payment.failed', function(response) {
                // alert("Payment Failed"); // Failure Page
                window.location.href = '/error';
            });
            razorpayObject.open();
        } else {
            alert(res.msg);
            window.location.href = '/error';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = '/error';
    });
}



// $(document).ready(function(){
// 	$('.pay-form').submit(function(e){
// 		e.preventDefault();

// 		var formData = $(this).serialize();

// 		$.ajax({
// 			url:"/checkout/createOrder",
// 			type:"POST",
// 			data: formData,
// 			success:function(res){
// 				if(res.success){
// 					var options = {
// 						"key": ""+res.key_id+"",
// 						"amount": ""+res.amount+"",
// 						"currency": "INR",
// 						"name": ""+res.product_name+"",
// 						"description": ""+res.description+"",
// 						"image": "https://res.cloudinary.com/deledfivo/image/upload/v1714409157/PRAIZ-LOGO-FULL_owsw5u.jpg",
// 						"order_id": ""+res.order_id+"",
// 						"handler": function (response){
// 							// alert("Payment Succeeded");
// 							window.location.href = `/thankYou/${res.key_id}`;     //Success Page
// 						},
// 						"prefill": {
// 							"contact":""+res.contact+"",
// 							"name": ""+res.name+"",
// 							"email": ""+res.email+"",
//                             "newOrder": ""+res.order+""
// 						},
// 						"notes" : {
// 							"description":""+res.description+""
// 						},
// 						"theme": {
// 							"color": "#2300a3"
// 						}
// 					};
// 					var razorpayObject = new Razorpay(options);
// 					razorpayObject.on('payment.failed', function (response){
// 						// alert("Payment Failed");            //Failure Page
//                         window.location.href = '/error';
// 					});
// 					razorpayObject.open();
// 				}
// 				else{
// 					alert(res.msg);
//                     // window.location.href = '/thankYou';
//                     window.location.href = '/error';
// 				}
// 			}
// 		})

// 	});
// });


// Define a function to be executed after 10 seconds
// function stopperFunction() {
//     console.log("10 seconds have passed!");
// }


async function handleStyle() {
    const checkboxes = document.querySelectorAll('.checkbox');

    // Empty array to store selected styles
    // const selectedStyles = [];
    let queryString = "";

     // Loop through each checkbox
     checkboxes.forEach(checkbox => {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Add the value of the checkbox to the selectedStyles array
            // selectedStyles.push(checkbox.nextElementSibling.textContent);
            queryString = checkbox.nextElementSibling.textContent;
            // console.log("style= ", checkbox.nextElementSibling.textContent);
        }
    });

    // Display the selected styles array on the console
    // console.log('Selected Styles:', selectedStyles);
    // const queryString = selectedStyles.join(" ");

    // Call setTimeout to execute the stopperFunction after 10 seconds (10000 milliseconds)
    // setTimeout(stopperFunction, 10000);
    if(queryString.startsWith("Casual") || queryString.startsWith("Traditional")){
        queryString = queryString.toLowerCase();
    }
    const currentURL = window.location.href;
    // console.log(`${currentURL}&style=${queryString}`);
    window.location.href = `${currentURL}&style=${queryString}`;
    document.getElementById('prodStyle').innerHTML = `/ ${queryString}`;

}

// Handle color for filtering
function handleColor(choice){
    console.log("Color choosed: ", choice);
    const currentURL = window.location.href;
    // const match = currentURL.match(/\(([^)]+)\)/); // Extract the URL from parentheses
    // if (match) {
    //     var url = match[1];
    //     console.log(match);
    // }
    console.log("URL: ", currentURL);
    window.location.href = `${currentURL}&color=${choice}`;
    document.getElementById('prodColor').innerHTML = `/ ${choice}`;
}


// Handle Price
const inputElement = document.getElementById('min_input');

    // Function to be called when the input value changes
    function setPrice() {
      // Get the current value of the input field
      const value = inputElement.value;
      // Print the value in the console
      console.log(value);
    }

// Add event listener to listen for changes in the input field
inputElement.addEventListener('change', setPrice);