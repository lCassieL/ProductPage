function filterByCategory(category_id) {
    var xhr = new XMLHttpRequest();
    var body = '';
    xhr.open('GET', location.origin + '/api/bycategory/' + category_id, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = xhr.responseText;
            var respond = JSON.parse(json);
            if (respond) {
                updateListOfProducts(respond.products);
            }
        }
    };
    xhr.send(body);
}

function filterBy() {
     let filter = document.getElementById("select_filter").value;
     var xhr = new XMLHttpRequest();
     var body = '';
     xhr.open('GET', location.origin + '/api/byfilter/' + filter, true);
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
             var json = xhr.responseText;
             var respond = JSON.parse(json);
             if (respond) {
                 updateListOfProducts(respond.products);
             }
         }
     };
     xhr.send(body);
}

function getProduct(id) {
    var xhr = new XMLHttpRequest();
     var body = '';
     xhr.open('GET', location.origin + '/api/product/' + id, true);
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
             var json = xhr.responseText;
             var respond = JSON.parse(json);
             if (respond) {
                $('#exampleModalLongTitle').html(respond.product[0]['name']);
                $('#product_price').html(respond.product[0]['price'] + ' грн');
                $('#exampleModalCenter').modal('show');
             }
         }
     };
     xhr.send(body);
}

function updateListOfProducts(products) {
    let str = '';
    products.forEach(function(product, index, arr) {
        str += "<div class='col-md-4'>" +
                   "<section class='panel'>" +
                       "<div class='pro-img-box'>" +
                           "<img src='https://via.placeholder.com/250x220/FFFF00' alt='' />" +
                           '<a href="#" onclick="getProduct(' + product['id'] + ')" class="adtocart">' +
                               '<i class="fa fa-shopping-cart"></i>' +
                           '</a>' +
                       '</div>' +
                       '<div class="panel-body text-center">' +
                           '<h4>' +
                               '<a href="#" class="pro-title">' +
                                   product['name'] +
                               '</a>' +
                           '</h4>' +
                           '<p class="price">' + product['price'] +' грн</p>' +
                       '</div>' +
                   '</section>' +
                '</div>';
    });
    let showProducts = document.getElementById('products');
    showProducts.innerHTML = str;
}