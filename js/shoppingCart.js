// shop.js
function addToCart() {
    var count=sessionStorage.getItem('count');
    var total=sessionStorage.getItem('checkout');
    count++;
    total =+ item.Price;
    sessionStorage.setItem(`${count}`, item);
    sessionStorage.setItem('count',count);
    sessionStorage.setItem('checkout',total);
    document.querySelector('#cartCount').innerHTML=count;
}

