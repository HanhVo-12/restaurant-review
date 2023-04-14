function validateForm() {
    let formElement = document.querySelector(".form");
    let inputElement = formElement.querySelectorAll(".form-input");

    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === '') {
            inputElement[i].parentElement.querySelector(".error-message").innerText =  `Please enter ${inputElement[i].id}`
        } else {
            inputElement[i].parentElement.querySelector(".error-message").innerText = ""
        }
    }
}


function registerForm() {
    validateForm();
    let formElement = document.querySelector(".form");
    let errorElement = formElement.querySelectorAll(".error-message");
    let arrErrorElement = [];
    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText);
    }
    let checkErr = arrErrorElement.every(function (value) {
        return value == ''
    });
    if (checkErr) {
        let name = document.getElementById("name").value
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        let age = document.getElementById("age").value
        let phone = document.getElementById("phone").value
        let listUser = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : []
        listUser.push({
            name: name,
            username: username,
            password: password,
            age: age,
            phone: phone,
        });
        localStorage.setItem("listUser", JSON.stringify(listUser));
        alert("Register success!!");
        window.location.href = "login.html"

    }



}