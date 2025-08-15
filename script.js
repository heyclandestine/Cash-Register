const changeDueSection = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const cashDrawer = document.getElementById("cash-drawer-display");


let price = 3.26;

document.getElementById("price").innerText = price;


purchaseButton.addEventListener("click", (() => {
    if (!hasFunds(cid)) {
        changeDueSection.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (parseFloat(cash.value) - price < 0) {
        alert("Customer does not have enough money to purchase the item");
    } else if (parseFloat(cash.value) - price === 0) {
        calculateChange();
        updateChangeAmount();
        updateCashDrawer();
        changeDueSection.innerText = "No change due - customer paid with exact cash";
    } else {
    calculateChange();
    updateChangeAmount();
    updateCashDrawer();
    }
}));


let changeDue = [

]

let preChangeDue = [
  ['ONE HUNDRED', 0],
  ['TWENTY', 0],
  ['TEN', 0],
  ['FIVE', 0],
  ['ONE', 0],
  ['QUARTER', 0],
  ['DIME', 0],
  ['NICKEL', 0],
  ['PENNY', 0]
];

let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

let dollarCID = [
  [0.01, cid[0][1]],
  [0.05, cid[1][1]],
  [0.10, cid[2][1]],
  [0.25, cid[3][1]],
  [1, cid[4][1]],
  [5, cid[5][1]],
  [10, cid[6][1]],
  [20, cid[7][1]],
  [100 , cid[8][1]]
];
let reversedArray = dollarCID.reverse();


function hasFunds(array) {
    let total = 0;
    array.forEach((lilArray) => {
        total += lilArray[1];
    });
    let difference = parseFloat(cash.value) - price;
    let change = parseFloat(difference.toFixed(2));
    return total >= change;
};
console.log(5 <= 16.73999999999995)

function calculateChange() {
    let difference = cash.value - price;
    let change = difference.toFixed(2);
    console.log(change);
    changeDue = [];

    for (let x = 0; x < cid.length; x++) {
        let total = 0;
        
        while (reversedArray[x][0] <= parseFloat(change) && reversedArray[x][1].toFixed(2) >= reversedArray[x][0].toFixed(2)) {
            total++;
            console.log( "Reversed Array: " + reversedArray[x][0]);
            change -= reversedArray[x][0].toFixed(2);
            console.log( "Change: " + change);
            reversedArray[x][1] -= reversedArray[x][0];
        };
        
        let adjustment = total * reversedArray[x][0];
        console.log( "Total " + total);
        console.log(adjustment);
        cid[cid.length-x-1][1] -= adjustment;
        preChangeDue[x][1] = adjustment;
        
    };

    if (change.toFixed(2) === 0) {
            return;
        } else {

        }
};

//Update change due and cash in the cash drawer functions.

function updateChangeAmount() {
    changeDueSection.innerHTML = '';
    preChangeDue.forEach((array) => {
        if (array[1] !== 0) {
            changeDue.push(array);
        }
    });
    console.log(changeDue);
    if (changeDue.length === 0) {
        changeDueSection.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (drawerEmpty(cid)) {
        changeDueSection.innerText = "Status: CLOSED";
        changeDue.forEach((array) => {
        let p = document.createElement("p");
        p.innerText = `${array[0]}: $${array[1]}`;
        changeDueSection.appendChild(p);
    })
    } else {
        changeDueSection.innerText = "Status: OPEN";
        changeDue.forEach((array) => {
            let p = document.createElement("p");
            p.innerText = `${array[0]}: $${array[1]}`;
            changeDueSection.appendChild(p);
        })
    };
};

function drawerEmpty(array) {
    let total = 0;
    array.forEach((lilArray) => {
        total += lilArray[1];
    })
    console.log(total);
    return total.toFixed(2) == 0;
}

function updateCashDrawer() {
    cashDrawer.innerHTML= `<p><strong>Change in drawer:</strong></p>`;
    cid.forEach((item) => {
        let p = document.createElement("p");
        p.innerText = `${item[0]}: $${item[1].toFixed(2)}`;
        cashDrawer.appendChild(p);
    });
};

updateCashDrawer();