document.addEventListener("DOMContentLoaded", function() {
    var json = localStorage.getItem('admin')
    var admin = JSON.parse(json)
    if (admin && admin.isAdmin) {
        DOM()
    } else {
        location.href = './login.html'
    }
});
var keyProduct = 'sanPham'
var keyGioHang = 'GioHang'
var keyUser = 'listUser'

// var jsonitems = localStorage.getItem(keyProduct)
// var ArrayProduct = JSON.parse(jsonitems)
// if (ArrayProduct == null) {
//     ArrayProduct = new Array()
// }
// var jsonUser = localStorage.getItem(keyUser)
// var ArrayUser = JSON.parse(jsonUser)
// if (ArrayUser == null) {
//     ArrayUser = new Array()
// }
// var ArrayGioHang = []



function logOut() {
    location.href = './login.html'
    localStorage.removeItem('admin')
}

function adminToHome() {
    location.href = './index.html'
    localStorage.removeItem('admin')
}

function creatID() {
    var number = String(Math.random())
    var id = number.slice(6)
    return id
}

function create(name, price, picture) {
    var item = new Object()
    item.id = creatID()
    item.name = name
    item.price = price
    item.picture = picture

    return item
}

function createItem() {
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    if (ArrayProduct == null) {
        ArrayProduct = []
    }
    var name = document.getElementById('name').value
    var price = parseInt(document.getElementById('price').value)
    var picture = document.getElementById('picture').value
    if (name == '' || price == '' || picture == '') {
        alert('Hãy nhập đúng thông tin!')
        document.getElementById('name').value = ''
        document.getElementById('price').value = ''
        document.getElementById('picture').value = ''
        return
    }
    if (price < 0 || (typeof price != 'number')) {
        alert('Sai giá sản phẩm!')
        document.getElementById('name').value = ''
        document.getElementById('price').value = ''
        document.getElementById('picture').value = ''
        return
    }
    var newItem = create(name, price, picture)
    ArrayProduct.push(newItem)
    var jsonArrayProduct = JSON.stringify(ArrayProduct)
    localStorage.setItem(keyProduct, jsonArrayProduct)
    DOM()
}

function DOM() {
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)

    document.getElementById('domList').innerHTML = ''
    var items = ''
    for (var i = 0; i < ArrayProduct.length; i++) {
        items += `<tr>`
        items += `<td>${ArrayProduct[i].id}</td>`
        items += `<td>${ArrayProduct[i].name}</td>`
        items += `<td>`
        items += `<img src="${ArrayProduct[i].picture}">`
        items += `</td>`
        items += `<td>${ArrayProduct[i].price}</td>`
        items += `<td>`
        items += `<button onclick="remove(${ArrayProduct[i].id})">Xóa</button>`
        items += `<button onclick="edit(${ArrayProduct[i].id})">Sữa</button>`
        items += `</td>`
        items += `</tr>`
    }
    document.getElementById('domList').innerHTML = items
}

function remove(id) {
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    var index
    ArrayProduct.forEach(item => {
        if (item.id == id) {
            index = ArrayProduct.indexOf(item)
        }
    });
    ArrayProduct.splice(index, 1)
    var jsonArrayProduct = JSON.stringify(ArrayProduct)
    localStorage.setItem(keyProduct, jsonArrayProduct)
    DOM()
}

function updateItem(id) {
    var name = document.getElementById('nameUpdate').value
    var price = document.getElementById('priceUpdate').value
    var picture = document.getElementById('pictureUpdate').value
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    for (var i = 0; i < ArrayProduct.length; i++) {
        if (ArrayProduct[i].id == id) {
            ArrayProduct[i].name = name
            ArrayProduct[i].price = price
            ArrayProduct[i].picture = picture
        }
    }
    var jsonArrayProduct = JSON.stringify(ArrayProduct)
    localStorage.setItem(keyProduct, jsonArrayProduct)
    document.getElementById('edit').style.display = 'none'
    DOM()
}

function edit(id) {
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    var html = ''
    ArrayProduct.forEach(item => {
        if (item.id == id) {
            html += `<h1>Cập nhật sản phẩm</h1>`
            html += `<div class="form-group">`
            html += `<label for="nameUpdate">Tên sản phẩm:</label>`
            html += `<input id="nameUpdate" type="text"value="${item.name}">`
            html += `</div>`
            html += `<div class="form-group">`
            html += `<label for="priceUpdate">Giá:</label>`
            html += `<input id="priceUpdate" type="text" value="${item.price}">`
            html += `</div>`
            html += `<div class="form-group">`
            html += `<label for="pictureUpdate">Hình ảnh:</label>`
            html += `<input id="pictureUpdate" type="text"value="${item.picture}">`
            html += `</div>`
            html += `<button id="up" onclick="updateItem(${item.id})">Lưu</button>`
            html += `<button id="up" onclick="document.getElementById('edit').style.display = ' none'">Hủy</button>`
        }
    });
    document.getElementById('edit').innerHTML = html
    document.getElementById('edit').style.display = ' block'
}