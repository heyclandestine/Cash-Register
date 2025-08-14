const customerCash = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const price = document.getElementById("price");


purchaseButton.addEventListener("click", (() => {
    console.log(parseInt(customerCash.value));
    console.log(parseFloat(price.innerText));
    let difference = parseInt(customerCash.value) - parseFloat(price.innerText);
    console.log(difference);
}));