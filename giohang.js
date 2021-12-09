var index = 0
var listBanner = ["https://logopik.vn/wp-content/uploads/2019/11/thiet-ke-banner-shop-thoi-trang-dep.jpg",
    "https://previews.123rf.com/images/genestro/genestro1707/genestro170700027/82829150-online-shop-banner-shop-building-icon-online-grocery-shopping-market-basket-with-a-products-isometri.jpg",
    "https://rubicmarketing.com/wp-content/uploads/2021/08/thiet-ke-banner-shop-thoi-trang-2.jpg"
]

function next(index) {
    var slider = document.getElementById("img");
    index++;
    if (index >= listBanner.length) {
        index = 0;
    }
    slider.src = listBanner[index];
}

function prev(index) {
    var slider = document.getElementById("img");
    index--
    if (index < 0) {
        index = listBanner.length - 1
    }
    slider.src = listBanner[index];
}

slide = function() {
    var slide = document.getElementById('img')
    slide.src = listBanner[index]
    index++
    if (index == listBanner.length) {
        index = 0
    }
    // document.getElementById('index').innerText = index
}
setInterval(slide, 1500)

var keyProduct = 'sanPham'
var keyGioHang = 'GioHang'
var keyUser = 'listUser'
domGioHang()

function domGioHang() {
    var json = localStorage.getItem(keyGioHang)
    var GioHang = JSON.parse(json)
    var jsonproduct = localStorage.getItem(keyProduct)
    var sanPham = JSON.parse(jsonproduct)
    if (sanPham.length == 0) {
        localStorage.removeItem(keyGioHang)
    }
    var html = ''
    if (GioHang) {
        GioHang.forEach(item => {
            html += `<tr>`
            html += `<th class="pic">`
            html += `<img src="${item.picture}">`
            html += `</th>`
            html += `<th class="ten">${item.name}</th>`
            html += `<th class="gia">${item.price} vnđ</th>`
            html += `<th class="op">`
            html += `<button onclick="xoaGioHang(${item.id})">Xóa</button>`
            html += `</th>`
            html += `</tr>`
        });
        document.getElementById('domList').innerHTML = html
    }
}

function xoaGioHang(id) {
    var json = localStorage.getItem(keyGioHang)
    var GioHang = JSON.parse(json)
    var index
    if (GioHang) {
        GioHang.forEach(item => {
            if (item.id == id) {
                index = GioHang.indexOf(item)
            }
        });
        GioHang.splice(index, 1)
        localStorage.setItem(keyGioHang, JSON.stringify(GioHang))
        domGioHang()
    }
}