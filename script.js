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


var keyProduct = 'sanPham'
var keyGioHang = 'GioHang'
var keyUser = 'listUser'
try {
    DOM()
} catch (error) {
    alert('Danh sách sản phẩm chưa có!')
}

function DOM() {
    var json = localStorage.getItem(keyProduct)
    var ArrayProduct = JSON.parse(json)
    document.getElementById('show').innerHTML = ''
    var items = ''

    if (ArrayProduct) {
        for (var i = 0; i < ArrayProduct.length; i++) {
            items += `<div class="item">`
            items += `<a href="./sanpham.html?id=${ArrayProduct[i].id}" title="${ArrayProduct[i].name}">`
            items += `<img src="${ArrayProduct[i].picture}">`
            items += `<div class="pannel">`
            items += `<div class="info">`
            items += `<p class="name">${ArrayProduct[i].name}</p>`
            items += `<p class="price">Giá: ${ArrayProduct[i].price}đ</p>`
            items += `</div>`
            items += `<div onclick="addGioHang(${ArrayProduct[i].id})" class="btn">`
            items += `<p onclick="addGioHang(${ArrayProduct[i].id})"><i class="fa-solid fa-cart-plus"></i></p>`
            items += `</div>`
            items += `</div>`
            items += `</a>`
            items += `</div>`
        }
        document.getElementById('show').innerHTML = items
    }

}