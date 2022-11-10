class Donut {
    constructor(name, price, categories, imgPath) {
        this.name = name,
            this.price = price,
            this.categories = categories,
            this.imgPath = imgPath
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
        ['img/chocolate-iced-custard-filled-banner.jpeg', 'img/chocolate-iced-custard-filled.jpeg']
    ),
    new Donut(
        'Chokladmunk',
        18,
        ['chocolate'],
        ['img/chocolate-iced-glazed-banner.jpeg', 'img/chocolate-iced-glazed.jpeg']
    ),
    new Donut(
        'Kanelpudrad munk med äppelfyllning',
        25,
        ['filled', 'apple', 'cinnamon', 'powdered'],
        ['img/cinnamon-apple-filled-banner.jpeg', 'img/cinnamon-apple-filled.jpeg']
    ),
    new Donut(
        'Glaserad kanelmunk',
        13,
        ['glazed', 'cinnamon'],
        ['img/glazed-cinnamon-banner.jpeg', 'img/glazed-cinnamon.jpeg']
    ),
    new Donut(
        'Glaserad munk med citronfyllning',
        23,
        ['glazed', 'lemon'],
        ['img/glazed-lemon-filled-banner.jpeg', 'img/glazed-lemon-filled.jpeg']
    ),
    new Donut(
        'Munk med chokladfyllning',
        16,
        ['chocolate', 'filled'],
        ['img/original-filled-chocolate-kreme™-banner.jpeg', 'img/original-filled-chocolate-kreme™.jpeg']
    ),
    new Donut(
        'Glaserad munk',
        8,
        ['glazed'],
        ['img/original-glazed-doughnut-banner.jpeg', 'img/original-glazed-doughnut.jpeg']
    ),
    new Donut(
        'Pudrad munk med blåbärsfyllning',
        25,
        ['powdered', 'blueberry'],
        ['img/powdered-blueberry-filled-banner.jpeg', 'img/powdered-blueberry-filled.jpeg']
    ),
    new Donut(
        'Pudrad munk med jordgubbsfyllning',
        25,
        ['powdered', 'strawberry'],
        ['img/powdered-strawberry-filled-banner.jpeg', 'img/powdered-strawberry-filled.jpeg']
    ),
    new Donut(
        'Jordgubbsmunk',
        11,
        ['strawberry'],
        ['img/strawberry-iced-banner.jpeg', 'img/strawberry-iced.jpeg']
    )
];



/**
 *  Print donutsArray-items as an Article and add to .donut-Section
 */
var donutArticle = "", i;
for (let i = 0; i < donutsArray.length; i++) { //loop through the whole array.
    donutArticle = donutArticle + /*html*/ `    
    <article class="donut__item">
        <h2>${donutsArray[i].name}</h2> 
        <div>
            <img
                src="${donutsArray[i].imgPath[1]}" 
                alt=""
            />
        </div>
        <p>${donutsArray[i].price} <span>kr</span></p>
        <div class="quantity">
            <button>-</button>
            <input type="text" />
            <button>+</button>
        </div>
        <button>Lägg till</button>
        <div class="rating">
            <!-- Rating med stjärnor -->
        </div>
    </article>` + i; // For development, remove "+ i;" to hide item array index on weppage.


    console.log(donutsArray[i]); //For development
}
document.querySelector(".donut-section").innerHTML = donutArticle;

/******************************************************************
 *  Item Buttons (Ej klar, behöver göras om?)
 *****************************************************************/
const decrementItem = document.querySelectorAll(".decrement-item");
const changeValueOfItem = document.querySelector(".number-of-items");
const incrementItem = document.querySelectorAll(".increment-item");


/**
 *  Increment item function
 */

const increaseValueOfItem = function () {
    if (changeValueOfItem.value != 99) { // To have some control over the order.
        changeValueOfItem.value++;
        console.log(changeValueOfItem.value) //For development
    }
}
//Add eventlistener increaseValueOfItem to all increment buttons
for (let i = 0; i < incrementItem.length; i++) {
    incrementItem[i].addEventListener("click", increaseValueOfItem);
}

/**
 *  Decrement item function
 */
const decreaseValueOfItem = function () {
    if (changeValueOfItem.value != 0) { // So it's impossible to add negatime number of items to basket
        changeValueOfItem.value--;
        console.log(changeValueOfItem.value) //For development
    }
}
//Add eventlistener decreaseValueOfItem to all decrement buttons
for (let i = 0; i < decrementItem.length; i++) {
    decrementItem[i].addEventListener("click", decreaseValueOfItem);
}

/**
 *  Add to basket function
 */



/**
*  Array sorting (add these functions to an eventlistener)
*/

/*********************************************************
 * Input field validation
**********************************************************/

const nameInputField = document.querySelector('[name="name"]');
const addressInputField = document.querySelector('[name="address"]');
const postCodeInputField = document.querySelector('[name="post-code"]');
const cityInputField = document.querySelector('[name="city"]');
const telInputField = document.querySelector('[name="tel"]');
const emailInputField = document.querySelector('[name="email"]');
const cardRadioInput = document.querySelector('[name="card"]');
const invoiceRadioInput = document.querySelector('[name="invoice"]');

const orderButton = document.querySelector('#order-btn')

console.log([nameInputField, addressInputField, postCodeInputField, cityInputField, telInputField, emailInputField, cardRadioInput, invoiceRadioInput, orderButton])

let formValidation = {
    name: false,
    address: false,
    postCode: true,
    city: true,
    tel: true,
    email: true,
    radio: true
}

// let nameIsOk = false;
// let addressIsOk = false;
// let postCodeIsOk = false;
// let cityIsOk = false;
// let telIsOk = false;
// let emailIsOk = false;
// let radioEnabled = false;


nameInputField.addEventListener('change', () => {
    formValidation.name = nameInputField.value.indexOf(' ') > -1;
    activateOrderButton();
})

addressInputField.addEventListener('change', () => {
    if (/\d/.test(addressInputField.value) && /[A-öa-ö]/.test(addressInputField.value)) {
        formValidation.address = true;
        activateOrderButton();
    }
    else {
        console.log('Funkar inte')
    }
})

const validateInput = (validatedInputs) => {
    for (const prop in validatedInputs) {
        console.log(validatedInputs[prop])
        if (!validatedInputs[prop]) {
            console.log('False från loopen')
            return false
        }         
    }
    console.log('true från loopen')
    console.log(formValidation)
    return true
}

const orderFunc = () => {
    console.log('Order lagd!')
}

const activateOrderButton = () => {
    if (validateInput(formValidation)) {
        orderButton.removeAttribute('disabled');
        orderButton.addEventListener('click', orderFunc)
    }
    else {
        orderButton.setAttribute('disabled', '');
        orderButton.removeEventListener('click', orderFunc)

    }
}


