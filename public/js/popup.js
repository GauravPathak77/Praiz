function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

let popupOuter = document.querySelector(".popup-outer");
function enableLoader() {
    console.log("sbt");
    popupOuter.classList.add("submitted");
}

function disableLoader() {
    popupOuter.classList.remove("submitted");
}

function emailAccept() {
    popupOuter.classList.add("accepted");
}
function showError(){
    popupOuter.classList.add("error");
}

async function handleGiftEmail(userMail) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mail": userMail
        })
    };

    try {
        const response = await fetch('/user/gift', options);
        const data = await response.json();
        console.log("Gift: ", data);

        //If user is new
        if (data.checkUser) {            

            
            // Adding gift to cart
            const cartOptions = {
                method: "POST",
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${' '}`
                },
                body: JSON.stringify(data.gift)
            };

            const res = await fetch("/user/cart", cartOptions);
            const dt = await res.json();
            console.log("Cart: ", dt);
            emailAccept();
            disableLoader();
        }else{
            disableLoader();
            showError();
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

function validateAndSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('gift_email');
    const email = emailInput.value.trim();

    if (email === '') {
        alert("Email cannot be empty!");
        emailInput.focus();
        return;
    }

    if (validateEmail(email)) {
        const userMail = email;
        console.log("Mail:", userMail);
        enableLoader();
        handleGiftEmail(userMail);
    }
    else alert("Check your Email-Id format!");
    
}

