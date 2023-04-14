

function validateForm() {
    let formElement = document.querySelector(".form");
    let inputElement = formElement.querySelectorAll(".form-input");
    for (let i = 0; i < inputElement.length; i++){
        if (inputElement[i].value === '') {
            inputElement[i].parentElement.querySelector(".error-message").innerText = `Please enter ${inputElement[i].id} `;
        } else {
            inputElement[i].parentElement.querySelector(".error-message").innerText = '';
        }
    }

}

function loginForm() {
    validateForm();
    let formElement = document.querySelector(".form");
    let errorElement = formElement.querySelectorAll(".error-message");
    let arrErrElement = [];
    for (let i = 0; i < errorElement.length; i++){
        arrErrElement.push(errorElement[i].innerText)
    }
    let checkErr = arrErrElement.every(value => value === '');
    if (checkErr) {
        let listUser = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : []
        console.log(listUser);
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let checkValue = listUser.some(value => value.username == username && value.password == password);
        if (checkValue) {
            window.location.href = "admin.html"
        } else {
            alert("Please check email or password")
        }
       
    }
    
}