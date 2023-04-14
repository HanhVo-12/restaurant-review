function previewFile() {
    //bien nhan img
    const preview = document.querySelector("#img_preview");
    //file chon file
    const file = document.querySelector("#image").files[0];

    // tao ra doi tuong doc file
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        //convert image file to base4 string
        preview.src = reader.result;
        document.querySelector("#img_preview").style.display = "block"

    }, false);

    //neu co du lieu thi doc file de gui len tren link 
    if (file) {
        reader.readAsDataURL(file);
    }


}
function startApp() {
    handleAddProduct();
    renderProductAdmin();
    handleUpdateProduct()
    handleAddCategory();
    renderCategory();
    renderListCategory();
    handleUpdateCategory();
}
startApp();

function resetInputProduct() {
   document.getElementById("name").value = "";
   document.getElementById("img_preview").setAttribute("src","");
    let e = document.getElementById("category");
    e.options[e.selectedIndex].innerText = 'Select Option';
   document.getElementById("price").value = "";
   document.getElementById("description").value = "";
}
function resetInputCategory() {
    document.getElementById("nameCategory").value = "";
}



function validateFormProduct() {
    let formElement = document.querySelector(".formContainer");
    let inputElement = formElement.querySelectorAll(".form-input");
    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value == "") {
            inputElement[i].parentElement.querySelector(".error-message").innerText = `Please enter ${inputElement[i].id}`
        } else {
            inputElement[i].parentElement.querySelector(".error-message").innerText = ""
        }
    }
}


function handleAddProduct() {
    let btnAddProduct = document.getElementById("saveProduct");
    btnAddProduct.onclick = function () {
        validateFormProduct();
        let formElement = document.querySelector(".formContainer");
        let errorElement = formElement.querySelectorAll(".error-message")
        let arrErrElement = []
        for (let i = 0; i < errorElement.length; i++) {
            arrErrElement.push(errorElement[i].innerText)
        }
        let checkErr = arrErrElement.every(value => value === "")
        if (checkErr) {
            let name = document.getElementById("name").value;
            let image = document.getElementById("img_preview").getAttribute("src");
            let category = document.getElementById("category").value;
            let price = document.getElementById("price").value;
            let description = document.getElementById("description").value;
            let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
            listProduct.push({
                name: name,
                image: image,
                category: category,
                price: Number(price),
                description: description
            })
            localStorage.setItem("listProduct", JSON.stringify(listProduct));
            renderProductAdmin();
            // renderListProductForUser();
            resetInputProduct();
            removeModal();
        }
    }
} 

function renderProductAdmin() {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
    let listProductRender = listProduct.map(function (product, index) {
        return `<tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td><img style="width:150px; height:150px" src="${product.image}"></td>
                    <td>${product.category}</td>
                    <td>${product.price} $</td>
                    <td>${product.description}</td>
                    <td>
                        <button onclick="editProduct(${index})" class="btn btn-primary">Edit</button>
                        <button onclick="deleteProduct(${index})" class="btn btn-secondary">Delete</button>
                    </td>

        </tr>`
    });
    document.getElementById("contentProduct").innerHTML = listProductRender.join("");
    
}

function editProduct(index) {
    addModal();
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
    document.getElementById("name").value = listProduct[index].name;
    document.getElementById("img_preview").setAttribute("src", listProduct[index].image);
    let e = document.getElementById("category");
    e.options[e.selectedIndex].value = listProduct[index].category;
    e.querySelector('option').text = e.value;

    document.getElementById("price").value = listProduct[index].price;
    document.getElementById("description").value = listProduct[index].description;
    document.getElementById("saveProduct").style.display = "none";
    document.getElementById("updateProduct").style.display = "block";
    document.getElementById("idProduct").value = index
}
function handleUpdateProduct() {
    let btnUpdateProduct = document.getElementById("updateProduct");
    btnUpdateProduct.onclick = () => {
        let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
        let index = document.getElementById("idProduct").value;
        listProduct[index] = {
            name: document.getElementById("name").value,
            image: document.getElementById("img_preview").getAttribute("src"),
            category: document.getElementById("category").value,
            price: document.getElementById("price").value,
            description: document.getElementById("description").value
        }
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
        renderProductAdmin();
        renderListProductForUser();
        renderFormDishImg();
        resetInputProduct();
        removeModal();
    }
}

function deleteProduct(index) {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
    if (confirm("Are you sure?")) {
        listProduct.splice(index, 1);
        localStorage.setItem("listProduct", JSON.stringify(listProduct))
        renderProductAdmin();
        renderListProductForUser();
        renderFormDishImg();
    } else {
        renderProductAdmin();
    }
}

function validateFormCategory() {
    let formCategoryElement = document.querySelector(".categoryContainer");
    let inputCategoryElement = formCategoryElement.querySelectorAll(".form-control-category");
    for (let i = 0; i < inputCategoryElement.length; i++) {
        if (inputCategoryElement[i].value == '') {
            inputCategoryElement[i].parentElement.querySelector(".error-message-category").innerText = `Please enter ${inputCategoryElement[i].placeholder}`
        } else {
            inputCategoryElement[i].parentElement.querySelector(".error-message-category").innerText = ""
        }
    }
}


function handleAddCategory() {
    let btnSaveCategory = document.getElementById("saveCategory");
    btnSaveCategory.onclick = () => {
        validateFormCategory();
        let formCategoryElement = document.querySelector(".categoryContainer");
        let errorCategoryElement = formCategoryElement.querySelectorAll(".error-message-category");

        let arrErrCategoryElement = []
        for (let i = 0; i < errorCategoryElement.length; i++) {
            arrErrCategoryElement.push(errorCategoryElement[i].innerText)
        }
        let checkErrCategory = arrErrCategoryElement.every(value => value === '')
        if (checkErrCategory) {
            let nameCategory = document.getElementById("nameCategory").value;
            let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
            listCategory.push({
                nameCategory: nameCategory
            });
            localStorage.setItem("listCategory", JSON.stringify(listCategory));
            renderCategory();
            resetInputCategory();
        }
    }
}
function renderCategory() {
    let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
    let listRenderCategory = listCategory.map(function (category, index) {
        
        return `<tr>
                    <td>${index + 1}</td>
                    <td>${category.nameCategory}</td>
                    <td>
                        <button onclick="editCategory(${index})" class="btn btn-primary">Edit</button>
                        <button onclick="deleteCategory(${index})" class="btn btn-secondary">Delete</button>
                    </td>

        </tr>`
    });
    document.getElementById("contentCategory").innerHTML = listRenderCategory.join("")
    
}
function renderListCategory() {
    let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
    let listSelectCategory = listCategory.map(function (category) {
        let a = `<option value="">Selected option</option>`;
        let ooption = `<option value=${category.nameCategory}>${category.nameCategory}</option>`;
        let b = []
        b.push(ooption)
        let arrayOption = [a, b]
       
        
        return arrayOption 
    });
    document.getElementById("category").innerHTML = listSelectCategory.join("");
}
function editCategory(index) {
    let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
    document.getElementById("nameCategory").value = listCategory[index].nameCategory;
    document.getElementById("idCategory").value = index;
    document.getElementById("saveCategory").style.display = "none";
    document.getElementById("updateCategory").style.display = "block"

}

function handleUpdateCategory() {
    let btnUpdateCategory = document.getElementById("updateCategory");
    btnUpdateCategory.onclick = function () {
        
        
        let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
        let index = document.getElementById("idCategory").value;
        listCategory[index] = {
            nameCategory: document.getElementById("nameCategory").value
        }
        localStorage.setItem("listCategory", JSON.stringify(listCategory));
        renderCategory();
        renderListCategory();
        resetInputCategory();


    }
}

function deleteCategory(index) {
    let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];

    if (confirm("Are you sure?")) {
        listCategory.splice(index, 1);
        localStorage.setItem("listCategory", JSON.stringify(listCategory));
        renderCategory();
        renderListCategory();
    } else {
        renderCategory();
    }
}

