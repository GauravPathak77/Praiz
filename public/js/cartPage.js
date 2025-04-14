// Gift Wrap
async function toggleGiftWrapText_1() {
    // let texts = document.querySelectorAll(".gift-wrap-text-1");
    let checkbox = document.getElementById("gift-wrap-1");
    console.log("Box: ", checkbox);

        if (checkbox.checked) {
            const response = await fetch("/user/gift-wrap", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "addon": 25
                })
            });
            const data = await response.json();
            console.log("Data: ", data);
            location.reload();
        } else {
            const response = await fetch("/user/gift-wrap", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "addon": -25
                })
            });
            const data = await response.json();
            console.log("Data: ", data);
            location.reload();
        }
}

async function toggleGiftWrapText_2() {
    let checkbox = document.getElementById("gift-wrap-2");
    console.log("Box: ", checkbox);

        if (checkbox.checked) {
            const response = await fetch("/user/gift-wrap", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "addon": 25
                })
            });
            const data = await response.json();
            console.log("Data: ", data);
            location.reload();
        } else {
            const response = await fetch("/user/gift-wrap", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "addon": -25
                })
            });
            const data = await response.json();
            console.log("Data: ", data);
            location.reload();
        }
}



document.addEventListener("DOMContentLoaded", function () {
    const temp = document.querySelectorAll(".quantity");
    const minus = document.querySelectorAll(".quantity__minus");
    const plus = document.querySelectorAll(".quantity__plus");
    const input = document.querySelectorAll(".quantity__input");

    for (let i = 0; i < temp.length; i++) {
        minus[i].addEventListener("click", function (e) {
            e.preventDefault();
            var value = input[i].value;
            if (value > 1) {
                value--;
            }
            input[i].value = value;
        });

        plus[i].addEventListener("click", function (e) {
            e.preventDefault();
            var value = input[i].value;
            value++;
            input[i].value = value;
        });
    }
});

wishlistBtn = document.querySelectorAll(".w-btn");
//console.log(wishlistBtn.length);
for (let i = 0; i < wishlistBtn.length; i++) {
    wishlistBtn[i].addEventListener("click", () => {
        document.querySelectorAll(".w-btn")[i].textContent = "Added";
    })
}


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

// Apply Coupon
const applyCoupon = async (uId) => {
    const coupon1 = document.getElementById('couponName1');
    const coupon2 = document.getElementById('couponName2');
    let coupon = "";
    document.querySelectorAll('.apply-btn').innerHTML = `<div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`;

    // Add event listener to each input
    if (coupon1.value.trim() !== '') {
        coupon = coupon1.value.trim();
    } else if(coupon2.value.trim() !== '') {
        coupon = coupon2.value.trim();
    }

    console.log("Coupon: ", coupon);
    try {
        const response = await fetch('/user/cart/applycoupon', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'id': uId,
                'coupon': coupon
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log("Discount: ", data);
        window.location.reload();
    } catch (error) {
        console.error('Error applying coupon:', error);
    }
};


// Create Order
const checkout = async (cartID, userId) => {
    //console.log("CartID: ", cartID);
    try {
        const response = await fetch('/user/cart/create_order', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'id': cartID,
                'uId': userId,
            })
        });
        

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        //console.log("Order: ", data);
        if(data.message === 'success'){
            window.location.href = `/user/checkout/${userId}`;
        }
    } catch (error) {
        console.error('Error creating order:', error);
    }
};

let checkoutCart = document.querySelectorAll(".cart_checkout");
    for (let i = 0; i < checkoutCart.length; i++) {
        checkoutCart[i].addEventListener("click", function () {
    this.innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
    </div>`;
    });
}