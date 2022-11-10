class Donut {
    constructor(name, price, categories, imgPath, itemId) {
        this.name = name,
            this.price = price,
            this.categories = categories,
            this.imgPath = imgPath,
            this.itemId = itemId,
            this.quantity = 0
    }
}

/* Kategorier: 
chocolate
filled
apple
cinnamon
glazed
lemon
powdered
blueberry
strawberry
*/

// Bilder tagna från https://github.com/aaronfrost/DonutsApi/tree/main/static/images

const donutsArray = [
    new Donut(
        'Chokladmunk med vaniljfyllning',
        23,
        ['chocolate', 'filled'],
        ['img/chocolate-iced-custard-filled-banner.jpeg', 'img/chocolate-iced-custard-filled.jpeg'],
        'don1'
    ),
    new Donut(
        'Chokladmunk',
        18,
        ['chocolate'],
        ['img/chocolate-iced-glazed-banner.jpeg', 'img/chocolate-iced-glazed.jpeg'],
        'don2'
    ),
    new Donut(
        'Kanelpudrad munk med äppelfyllning',
        25,
        ['filled', 'apple', 'cinnamon', 'powdered'],
        ['img/cinnamon-apple-filled-banner.jpeg', 'img/cinnamon-apple-filled.jpeg'],
        'don3'
    ),
    new Donut(
        'Glaserad kanelmunk',
        13,
        ['glazed', 'cinnamon'],
        ['img/glazed-cinnamon-banner.jpeg', 'img/glazed-cinnamon.jpeg'],
        'don4'
    ),
    new Donut(
        'Glaserad munk med citronfyllning',
        23,
        ['glazed', 'lemon'],
        ['img/glazed-lemon-filled-banner.jpeg', 'img/glazed-lemon-filled.jpeg'],
        'don5'
    ),
    new Donut(
        'Munk med chokladfyllning',
        16,
        ['chocolate', 'filled'],
        ['img/original-filled-chocolate-kreme™-banner.jpeg', 'img/original-filled-chocolate-kreme™.jpeg'],
        'don6'
    ),
    new Donut(
        'Glaserad munk',
        8,
        ['glazed'],
        ['img/original-glazed-doughnut-banner.jpeg', 'img/original-glazed-doughnut.jpeg'],
        'don7'
    ),
    new Donut(
        'Pudrad munk med blåbärsfyllning',
        25,
        ['powdered', 'blueberry'],
        ['img/powdered-blueberry-filled-banner.jpeg', 'img/powdered-blueberry-filled.jpeg'],
        'don8'
    ),
    new Donut(
        'Pudrad munk med jordgubbsfyllning',
        25,
        ['powdered', 'strawberry'],
        ['img/powdered-strawberry-filled-banner.jpeg', 'img/powdered-strawberry-filled.jpeg'],
        'don9'
    ),
    new Donut(
        'Jordgubbsmunk',
        11,
        ['strawberry'],
        ['img/strawberry-iced-banner.jpeg', 'img/strawberry-iced.jpeg'],
        'don10'
    )
];



/**
 *  Print donutsArray-items as an Article and add to .donut-Section
 */
var itemIdArray = []; //keep?
let generateShop = function () {

    let donutArticle = "", i;
    for (let i = 0; i < donutsArray.length; i++) { //loop through the whole array.
        donutArticle = donutArticle + /*html*/ `    
        <article class="donut__item">
            <h2>${donutsArray[i].name}</h2> 
            <div>
                <img
                    src="${donutsArray[i].imgPath[1]}" 
                    alt="A picture of a donut"
                />
            </div>
            <p>${donutsArray[i].price} <span>kr</span></p>
            <div class="quantity">
                <button id="dec${donutsArray[i].itemId}">-</button>
                <input id="${donutsArray[i].itemId}" type="number"  min="0" max="99"/>
                <button id="inc${donutsArray[i].itemId}">+</button>
            </div>
            <button>Lägg till</button>
            <div class="rating">
                <!-- Rating med stjärnor -->
            </div>
        </article>` + i; // "+ i" //For development
        itemIdArray.push`(${donutsArray[i].itemId})`;
        // console.log(donutsArray[i]); //For development        
    }

    document.querySelector(".donut-section").innerHTML = donutArticle;
}
generateShop();

increaseValueOfItem = function (donut, quantityInput) {
    donut.quantity++;
    quantityInput.value = donut.quantity
    console.log(donut.quantity);

}
decreaseValueOfItem = function (donut, quantityInput) {
    donut.quantity > 0 && donut.quantity--;
    quantityInput.value = donut.quantity
    console.log(donut.quantity);
}

donutsArray.map((donut, i) => {
    const decreaseButton = document.querySelector(`#dec${donutsArray[i].itemId}`);
    const increaseButton = document.querySelector(`#inc${donutsArray[i].itemId}`);
    const quantityInput = document.querySelector(`#${donutsArray[i].itemId}`)
    console.log(quantityInput)
    quantityInput.value = donut.quantity

    decreaseButton.addEventListener('click', () => { decreaseValueOfItem(donut, quantityInput) });
    increaseButton.addEventListener('click', () => { increaseValueOfItem(donut, quantityInput) });
})

/******************************************************************
 *  Item Buttons (Ej klar, behöver göras om?)
 *****************************************************************/
// const decrementItem = document.querySelectorAll('.decrement-item');
// const changeValueOfItem = document.querySelector('.number-of-items');
// const incrementItem = document.querySelectorAll('.increment-item');

// /**
//  *  Increment item function
//  */

// const increaseValueOfItem = function () {

//     if (changeValueOfItem.value != 99) { // To have some control over the order.
//         changeValueOfItem.value++;
//         console.log(changeValueOfItem.value) //For development
//     }
// }
// //Add eventlistener increaseValueOfItem to all increment buttons
// for (let i = 0; i < incrementItem.length; i++) {
//     incrementItem[i].addEventListener("click", increaseValueOfItem);
// }

// /**
//  *  Decrement item function
//  */
// const decreaseValueOfItem = function () {

//     if (changeValueOfItem.value != 0) { // So it's impossible to add negatime number of items to basket
//         changeValueOfItem.value--;
//         console.log(changeValueOfItem.value) //For development
//     }
// }
//Add eventlistener decreaseValueOfItem to all decrement buttons
// for (let i = 0; i < decrementItem.length; i++) {
//     decrementItem[i].addEventListener("click", decreaseValueOfItem);
// }

/**
 *  Add to basket function
 */


/**
*  Array sorting (add these functions to an eventlistener)
*/

/*********************************************************
 * Input field validation
**********************************************************/

const inputForm = document.querySelector('form');

const nameInputField = document.querySelector('[name="name"]');
const addressInputField = document.querySelector('[name="address"]');
const postCodeInputField = document.querySelector('[name="post-code"]');
const cityInputField = document.querySelector('[name="city"]');
const telInputField = document.querySelector('[name="tel"]');
const emailInputField = document.querySelector('[name="email"]');
const cardRadioInput = document.querySelector('#card-radio');
const invoiceRadioInput = document.querySelector('#invoice-radio');
const test = document.querySelector('[name="payment-method"]:checked')

const orderButton = document.querySelector('#order-btn')

let formValidation = {
    name: false,
    address: false,
    postCode: false,
    city: true,
    tel: true,
    email: true,
    radio: true
}

nameInputField.addEventListener('change', () => {
    formValidation.name = nameInputField.value.indexOf(' ') > 0;
    activateOrderButton();
})

addressInputField.addEventListener('change', () => {
    formValidation.address = /\d/.test(addressInputField.value) && /[A-Öa-ö]/.test(addressInputField.value);
    activateOrderButton();
})

postCodeInputField.addEventListener('change', () => {
    formValidation.postCode = postCodeInputField.value.length === 5;
    activateOrderButton();
})

addressInputField.addEventListener('change', () => {
    formValidation.address = addressInputField.value !== '';
})

cardRadioInput.addEventListener('click', () => {
    console.log(test.value)
})
invoiceRadioInput.addEventListener('click', () => {
    console.log(test.value)
})

const validateInput = (validatedInputs) => {
    for (const prop in validatedInputs) {
        if (!validatedInputs[prop]) {
            return false
        }
    }
    return true
}

const submitOrder = () => {
    console.log('Order lagd!')
}

const activateOrderButton = () => {
    if (validateInput(formValidation)) {
        orderButton.removeAttribute('disabled');
        inputForm.setAttribute('onsubmit', 'submitOrder()')
    }
    else {
        orderButton.setAttribute('disabled', '');
        inputForm.removeAttribute('onsubmit');
    }
}