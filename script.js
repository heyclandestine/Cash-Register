const changeDueSection = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const cashDrawer = document.getElementById("cash-drawer-display");


let price = 3.26;

document.getElementById("price").innerText = price;

// Event Listeners

purchaseButton.addEventListener("click", (() => {
    if (parseFloat(cash.value) - price < 0) {
        alert("Customer does not have enough money to purchase the item");
    } else if (!hasFunds(cid) || (!hasValidDenoms(cid))) {
        changeDueSection.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (parseFloat(cash.value) - price == 0) {
        changeDueSection.innerText = "No change due - customer paid with exact cash";
    } else {
    calculateChange();
    updateChangeAmount();
    updateCashDrawer();
    }
}));

cash.addEventListener("keydown", ((e) => {
    if (e.key === "Enter") {
        if (parseFloat(cash.value) - price < 0) {
        alert("Customer does not have enough money to purchase the item");
        } else if (!hasFunds(cid) || (!hasValidDenoms(cid))) {
            changeDueSection.innerText = "Status: INSUFFICIENT_FUNDS";
        } else if (parseFloat(cash.value) - price == 0) {
            changeDueSection.innerText = "No change due - customer paid with exact cash";
        } else {
        calculateChange();
        updateChangeAmount();
        updateCashDrawer();
        }
    }
}));

// Array setups

let cid = [["Pennies", 1.01], ["Nickels", 2.05], ["Dimes", 3.1], ["Quarters", 4.25], ["Ones", 90], ["Fives", 55], ["Tens", 20], ["Twenties", 60], ["Hundreds", 100]];

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

let changeDue = []

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

// Function Logic

function calculateChange() {
    let difference = cash.value - price;
    for (let x = 0; x < cid.length; x++) {
        console.log(reversedArray);
        let total = 0;
        while (reversedArray[x][0] <= difference.toFixed(2) && reversedArray[x][1].toFixed(2) >= reversedArray[x][0]) {
            total++;
            difference -= reversedArray[x][0];
            reversedArray[x][1] -= reversedArray[x][0];
        };
        let adjustment = total * reversedArray[x][0];
            cid[cid.length-x-1][1] -= adjustment;
            preChangeDue[x][1] = adjustment;
    }; 
};

function hasFunds(array) {
    let total = 0;
    array.forEach((lilArray) => {
        total += lilArray[1];
    });
    let difference = cash.value - price;
    return total >= difference.toFixed(2);
};

function hasValidDenoms(array) {
    let difference = cash.value - price;
    console.log("Before Difference: " + difference);
    let copyReverseArray = JSON.parse(JSON.stringify(reversedArray));
    console.log(copyReverseArray);
    for (let x = 0; x < array.length; x++) {
        while (copyReverseArray[x][0] <= difference.toFixed(2) && copyReverseArray[x][1].toFixed(2) >= copyReverseArray[x][0]) {
            difference -= copyReverseArray[x][0];
            copyReverseArray[x][1] -= copyReverseArray[x][0];
        };
    };
    console.log("After Difference: " + difference);
    console.log(difference.toFixed(2) == 0);
    return difference.toFixed(2) == 0;
};

//Update change due and cash in the cash drawer functions.

function updateChangeAmount() {
    let changeDue = [];
    changeDueSection.innerHTML = '';
    preChangeDue.forEach((array) => {
        if (array[1] != 0) {
            changeDue.push(array);
        }
    });
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