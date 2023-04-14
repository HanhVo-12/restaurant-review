
function startApp() {
    renderListProductForUser();
    renderListCategoryForUser();
    renderCategoryForUser();
    renderFormDishImg()
}
startApp();
function renderListProductForUser() {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
    let listProductforUser = listProduct.map(function (product, index) {
        return `<div class="grid-item grid-item-${index + 1}">
                                <div class="grid-2">
                                    <img src="${product.image}" alt="">
                                    <div class="grid-desc-item">
                                        <h6 class="h6">${product.name}</h6>
                                        <p class="p">${product.category}</p>
                                    </div>
                                </div>
                                
                                <p class="priceStyle p">${product.price} $</p>
                            </div>`
    });
    document.getElementById("page").innerHTML = listProductforUser.join("")
}
function renderListCategoryForUser() {
    let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
    let listCategoryForUser = listCategory.map(function (category) {
        return `<a href="" class="menu-home-item">${category.nameCategory}</a>`
    })
    document.getElementById("menu-item1-category").innerHTML = listCategoryForUser.join('')
    document.getElementById("menu-item2-category").innerHTML = listCategoryForUser.join('')

}
function renderCategoryForUser() {
    let listCategory = localStorage.getItem("listCategory") ? JSON.parse(localStorage.getItem("listCategory")) : [];
    let categorySelectForUser = listCategory.map(function (category) {
        return `<option value="${category.nameCategory}">${category.nameCategory}</option>`
    });
    document.getElementById("select-category1").innerHTML = categorySelectForUser.join("");
    document.getElementById("select-category2").innerHTML = categorySelectForUser.join("");

}
function renderFormDishImg() {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : [];
    let listFormDishImgItem = listProduct.map(function (product) {
        return ` <div class="form-dish-img-item">
                    <img src="${product.image}" alt="">
                    <div class="form-dish-text">
                        <h6 class="h6">${product.name}</h6>
                        <div class="ti-icon">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    <div class="price">${product.price} $</div>
                </div>
                </div>
                `
    });
    document.getElementById("form-dish-img-id").innerHTML = listFormDishImgItem.join("")
}