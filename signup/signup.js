// Form will not refresh
var btn = document.getElementById("btn");
btn.addEventListener('click', function (event) {
    event.preventDefault();
});

function displayAlert(message) {
    var alertbox = document.getElementById("hide");
    // Display alert for 3s
    setTimeout(function () {
        alertbox.classList.add("myalert");
    }, 3000);
    alertbox.classList.remove("myalert");
    alertbox.firstElementChild.innerHTML = message;
}


function clearInput() {
    document.getElementById("exampleInputUsername1").value = "";
    document.getElementById("exampleInputEmail1").value = "";
    document.getElementById("exampleInputPassword1").value = "";
}

function showpass() {
    var checkbox = document.getElementById("exampleInputPassword1");
    if (checkbox.type === "password") {
        checkbox.type = "text"
    } else {
        checkbox.type = "password"
    }
}
var users = JSON.parse(localStorage.getItem("users")) || [];
var uniqueId = users.length + 100;

function submitSignupForm() {

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", JSON.stringify(users[users.length - 1]));
    Swal.fire({
        icon: 'success',
        title: 'Signup successfull',
        text: 'Account created successfully',
    }).then(function () {
        location.replace("../dashboard/dashboard.html");
    }
    )
}


function signup() {
    var username = document.getElementById("exampleInputUsername1").value.toLowerCase().trim();
    var email = document.getElementById("exampleInputEmail1").value.toLowerCase().trim();
    var password = document.getElementById("exampleInputPassword1").value;
    var userExist = users.find(function (item) {
        return item.email === email;
    })


    // Validations
    if (users && !(username && email && password)) {
        displayAlert("Please Enter Input Fields");
    } else if (username.length < 3) {
        displayAlert("Username must be at least 3 characters long.");
    } else if (!(email.includes("@") && email.includes("."))) {
        displayAlert("Invalid email");
    } else if (password.length < 6) {
        displayAlert("Password must include at least 6 characters");
    } else if (userExist) {
        displayAlert("User Already exist");
    }
    else {
        users.push({
            userId: ++uniqueId,
            username,
            email,
            password
        })
        submitSignupForm();
        clearInput();
    }
}


function login() {
    var email = document.getElementById('exampleInputEmail1').value.trim().toLowerCase();
    var password = document.getElementById('exampleInputPassword1').value;
    var alertbox = document.getElementById("hide");

    // Display alert for 3s
    setTimeout(function () {
        alertbox.classList.add("myalert");
    }, 3000);

    checkUser = users.find(function (item) {
        return item.email === email;
    });

    if (!(email && password)) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Please Enter Input Fields";
    } else if (!(email.includes("@"))) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Invalid email";
    } else if (checkUser && checkUser.password === password) {
        Swal.fire(
            'Login Successful!',
            'Account Login successfully!',
            'success'
        ).then(function () {
            window.location.href = "./dashboard/dashboard.html"
        });
        localStorage.setItem("loggedUser", JSON.stringify(checkUser));
    } else if (checkUser && checkUser.password !== password) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Incorrect password";
    } else {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "User not found";
    }
}

function logout() {


    Swal.fire({
        title: 'Logout',
        text: "Are you sure you want to logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Logout Successfull',
                icon: "success"
            }
            ).then(function () {
                location.replace("../index.html");
                localStorage.removeItem("loggedUser")
            })
        }
    })


}

