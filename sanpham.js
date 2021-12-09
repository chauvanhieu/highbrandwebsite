document.addEventListener("DOMContentLoaded", function(idItem) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    idItem = params.id
    var keyProduct = 'sanPham'
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    var items = ''

    for (var i = 0; i < ArrayProduct.length; i++) {
        if (ArrayProduct[i].id == params.id) {
            items += `<div class="pic">`
            items += `<img id="image" src="${ArrayProduct[i].picture}">`
            items += `</div>`
            items += `<div class="info">`
            items += `<h2>${ArrayProduct[i].name}</h2>`
            items += `<p id="gia">${ArrayProduct[i].price} vnđ</p>`
            items += `<button onclick="addGioHang(${ArrayProduct[i].id})">Thêm vào giỏ hàng</button>`
            items += `</div>`
            document.title = 'HighBrand | ' + ArrayProduct[i].name
        }
    }
    document.getElementById('item').innerHTML = items
});

var listBanner = ["https://logopik.vn/wp-content/uploads/2019/11/thiet-ke-banner-shop-thoi-trang-dep.jpg",
    "https://previews.123rf.com/images/genestro/genestro1707/genestro170700027/82829150-online-shop-banner-shop-building-icon-online-grocery-shopping-market-basket-with-a-products-isometri.jpg",
    "https://rubicmarketing.com/wp-content/uploads/2021/08/thiet-ke-banner-shop-thoi-trang-2.jpg"
]


var index = 0

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

var keyGioHang = 'GioHang'
var jsonGioHang = localStorage.getItem(keyGioHang)
var gioHang = JSON.parse(jsonGioHang)
if (gioHang == null) {
    gioHang = []
}

function addGioHang(id) {
    var keyProduct = 'sanPham'
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    var temp
    var jsonGioHang = localStorage.getItem(keyGioHang)
    var gioHang = JSON.parse(jsonGioHang)
    if (gioHang == null) {
        gioHang = []
    }
    ArrayProduct.forEach(item => {
        if (item.id == id) {
            temp = item
        }
    });
    gioHang.push(temp)
    localStorage.setItem(keyGioHang, JSON.stringify(gioHang))
    alert('Đã thêm vào giỏ hàng!')
}
console.log(idItem)