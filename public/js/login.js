// Login-Reg Page
let login_otp = Math.floor(Math.random()*10000 + 1);
// let userOtp = 0;
let login_mobile = "";

var loginBtn = document.querySelector(".sign-in");
var regBtn = document.querySelector(".sign-up");
var choose = document.querySelector(".choose-way");
var regHere = document.querySelectorAll(".reg-here");
// let loginNum = document.querySelector(".login-number");

// Function to add the active class to the clicked element and remove it from the other
function setActiveButton(activeBtn) {
    // Remove active class from all li elements
    document.querySelectorAll('.choose-way ul li').forEach((li) => {
        li.classList.remove('active');
    });
    // Add active class to the clicked element
    activeBtn.classList.add('active');
}

loginBtn.addEventListener("click", () => {
    if (!choose.classList.contains("s-login")) {
        choose.classList.add("s-login");
        choose.classList.remove("s-reg");
        document.getElementById("login-email").style.display = "block";
    }
    setActiveButton(loginBtn);
});

regBtn.addEventListener("click", () => {
    if (!choose.classList.contains("s-reg")) {
        choose.classList.add("s-reg");
        choose.classList.remove("s-login");
        document.getElementById("login-email").style.display = "none";
        document.getElementById("login-number").style.display = "none";
    }
    setActiveButton(regBtn);
});

regHere.forEach((btn) => {
    btn.addEventListener("click", () => {
        choose.classList.add("s-reg");
        choose.classList.remove("s-login");
        document.getElementById("login-email").style.display = "none";
        document.getElementById("login-number").style.display = "none";
        setActiveButton(regBtn); // Assuming regHere is associated with the sign-up
    });
});

// Toggle between login with email and login with number
document.getElementById("login-number-link").addEventListener("click", function () {
    document.getElementById("login-email").style.display = "none";
    document.getElementById("login-number").style.display = "block";
});

document.getElementById("login-email-link").addEventListener("click", function () {
    document.getElementById("login-number").style.display = "none";
    document.getElementById("login-email").style.display = "block";
});


// Send OTP for login
const sendLoginOtp = async() => {
    document.getElementById('verifyNum-login').innerHTML = `<div class="spinner-grow" role="status" style="--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;>
    <span class="visually-hidden"></span>
  </div>`;
    login_mobile = document.getElementById('mobile_no-login').value;
    console.log("OTP: ", login_otp, " Mobile-no.: ", login_mobile);
    document.getElementById('verifyNum-login').innerHTML = "Resend OTP..";
    const response = await fetch("/user/reg_otp", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "otp": login_otp,
            "mobile": login_mobile
        })
    });
    const data = await response.json();
    console.log("Data: ", data);
    // document.getElementById('entered_otp').style.opacity = 1;
    document.getElementById('verifyNum-login').innerHTML = 'Verify';
    if(data.return === true){
        document.getElementById('input-OTP-login').style.display = 'block';
        document.getElementById('submit-otp-login').disabled = false;
    } else {
        document.getElementById('otp-msg-login').innerHTML = data;
    }
}

const checkLoginOtp = async() => {
    document.getElementById('otp-msg-login').innerHTML = "";
    const userOtp = (Number)(document.getElementById('entered-otp-login').value);
    console.log("Sent OTP: ", login_otp, " User OTP:", userOtp);
    if(login_otp == userOtp){
        document.getElementById('otp-msg-login').innerHTML = " ";
        document.getElementById('login-field').style.opacity = 1;
        document.getElementById('login-btn').disabled = false;
    } else {
        document.getElementById('otp-msg-login').innerHTML = "Wrong OTP";
    }
}