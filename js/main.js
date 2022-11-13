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
	{
		id: 1,
		name: 'Chokladmunk med vaniljfyllning',
		price: 23,
		categories: ['chocolate', 'filled'],
		images: [
			'img/chocolate-iced-custard-filled-banner.jpeg',
			'img/chocolate-iced-custard-filled.jpeg',
		],
		rating: 5,
	},
	{
		id: 2,
		name: 'Chokladmunk',
		price: 18,
		categories: ['chocolate'],
		images: [
			'img/chocolate-iced-glazed-banner.jpeg',
			'img/chocolate-iced-glazed.jpeg',
		],
		rating: 4.5,
	},
	{
		id: 3,
		name: 'Kanelpudrad munk med äppelfyllning',
		price: 25,
		categories: ['filled', 'apple', 'cinnamon', 'powdered'],
		images: [
			'img/cinnamon-apple-filled-banner.jpeg',
			'img/cinnamon-apple-filled.jpeg',
		],
		rating: 4.5,
	},
	{
		id: 4,
		name: 'Glaserad kanelmunk',
		price: 13,
		categories: ['glazed', 'cinnamon'],
		images: ['img/glazed-cinnamon-banner.jpeg', 'img/glazed-cinnamon.jpeg'],
		rating: 5,
	},
	{
		id: 5,
		name: 'Glaserad munk med citronfyllning',
		price: 23,
		categories: ['glazed', 'lemon'],
		images: [
			'img/glazed-lemon-filled-banner.jpeg',
			'img/glazed-lemon-filled.jpeg',
		],
		rating: 4,
	},
	{
		id: 6,
		name: 'Munk med chokladfyllning',
		price: 16,
		categories: ['chocolate', 'filled'],
		images: [
			'img/original-filled-chocolate-kreme™-banner.jpeg',
			'img/original-filled-chocolate-kreme™.jpeg',
		],
		rating: 4,
	},
	{
		id: 7,
		name: 'Glaserad munk',
		price: 7,
		categories: ['glazed'],
		images: [
			'img/original-glazed-doughnut-banner.jpeg',
			'img/original-glazed-doughnut.jpeg',
		],
		rating: 5,
	},
	{
		id: 8,
		name: 'Pudrad munk med blåbärsfyllning',
		price: 25,
		categories: ['powdered', 'blueberry'],
		images: [
			'img/powdered-blueberry-filled-banner.jpeg',
			'img/powdered-blueberry-filled.jpeg',
		],
		rating: 4.5,
	},
	{
		id: 9,
		name: 'Pudrad munk med jordgubbsfyllning',
		price: 25,
		categories: ['powdered', 'strawberry'],
		images: [
			'img/powdered-strawberry-filled-banner.jpeg',
			'img/powdered-strawberry-filled.jpeg',
		],
		rating: 4,
	},
	{
		id: 10,
		name: 'Jordgubbsmunk',
		price: 11,
		categories: ['strawberry'],
		images: ['img/strawberry-iced-banner.jpeg', 'img/strawberry-iced.jpeg'],
		rating: 5,
	},
];

/*********************************************************
 * Adding to Cart
 **********************************************************/
const cartItems = [];

const donutListEl = document.querySelector('.donuts');
const donutIncreaseCount = (id) => {
	const donutEl = document.querySelector(`[data-id="${id}"]`);
	const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
	const currentCount = Number(currentCountEl.value) + 1;
	if (currentCountEl.value >= 99) {
		currentCountEl.value = currentCountEl.value.slice(0, 2); //remove 3rd digit
	} else {
		currentCountEl.value++;
	}
	console.log(Number(currentCountEl.value));
	console.log(currentCount);
};
const donutDecreaseCount = (id) => {
	const donutEl = document.querySelector(`[data-id="${id}"]`);
	const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
	const currentCount = Number(currentCountEl.value) - 1;
	if (currentCountEl.value != 0) {
		currentCountEl.value--;
	}
	console.log(Number(currentCountEl.value));
	console.log(currentCount);
};

const donutAddToCart = (id) => {
	const currentCount = Number(
		document.querySelector(`[data-id="${id}"] .donuts__item_quantity input`)
			.value
	);

	if (currentCount > 0) {
		if (cartItems.length > 0) {
			for (const item of cartItems) {
				if (item.id === id) {
					item.count = item.count + currentCount;
					item.totPrice = item.totPrice + currentCount * item.price;
					updateCartDOM();
					return;
				}
			}
		}

		for (const donut of donutsArray) {
			if (donut.id === id) {
				cartItems.push({
					...donut,
					count: currentCount,
					totPrice: currentCount * donut.price,
				});

				updateCartDOM();
				return;
			}
		}
	}
};

const updateCartDOM = () => {
	console.log(cartItems);
};

const generateStarRating = (rating) => {
	const starIcon = '<i class="fa-solid fa-star"></i>';
	const starHalfIcon = '<i class="fa-solid fa-star-half"></i>';

	const splitPoints = rating.toString().split('.');
	const fullPoints = splitPoints[0];
	const halfPoint = splitPoints.length > 1 ? splitPoints[1] : 0;

	let ratingEl = '';

	for (let i = 0; i < Number(fullPoints); i++) {
		ratingEl += starIcon;
	}

	if (halfPoint) ratingEl += starHalfIcon;

	return ratingEl;
};

/*********************************************************
 * Create HTML
 **********************************************************/

const generateDonuts = () => {
	let donuts = [];
	for (const donut of donutsArray) {
		donuts += /*html*/ `
      <article class="donuts__item" data-id=${donut.id}>
        <h2>${donut.name}</h2> 
        <div class="donuts__item_image">
          <img
            src="${donut.images[1]}" 
            alt="A picture of a donut"
          />
        </div>
				<div class="donuts__item_info">
					<p>${donut.price} kr</p>
					<p>${generateStarRating(donut.rating)}</p>
				</div>
        
        <div class="donuts__item_quantity">
          <button class="button button--background" onclick="donutDecreaseCount(${
						donut.id
					})"><i class="fa-solid fa-minus"></i></button>
          <input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value) 
		  >= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
          <button class="button button--background" onclick="donutIncreaseCount(${
						donut.id
					})"><i class="fa-solid fa-plus"></i></button>
        </div>
        <button class="donuts__item_addcart button button--background" onclick="donutAddToCart(${
					donut.id
				})">Lägg till</button>
      </article>
    `;
	}
	donutListEl.innerHTML = donuts;
};

generateDonuts();

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
const test = document.querySelector('[name="payment-method"]:checked');

const orderButton = document.querySelector('#order-btn');

let formValidation = {
	name: false,
	address: false,
	postCode: false,
	city: true,
	tel: true,
	email: true,
	radio: true,
};

nameInputField.addEventListener('keyup', () => {
	formValidation.name = nameInputField.value.indexOf(' ') > 0;
	activateOrderButton();
});

addressInputField.addEventListener('keyup', () => {
	formValidation.address =
		/\d/.test(addressInputField.value) &&
		/[A-Za-zÅåÄäÖö]/.test(addressInputField.value);
	activateOrderButton();
});

postCodeInputField.addEventListener('keyup', () => {
	formValidation.postCode = postCodeInputField.value.length === 5;
	activateOrderButton();
});

addressInputField.addEventListener('keyup', () => {
	formValidation.address = addressInputField.value !== '';
});

cardRadioInput.addEventListener('click', () => {
	console.log(test.value);
});
invoiceRadioInput.addEventListener('click', () => {
	console.log(test.value);
});

const validateInput = (validatedInputs) => {
	for (const prop in validatedInputs) {
		if (!validatedInputs[prop]) {
			return false;
		}
	}
	return true;
};

const submitOrder = () => {
	console.log('Order lagd!');
};

const activateOrderButton = () => {
	if (validateInput(formValidation)) {
		orderButton.removeAttribute('disabled');
		inputForm.setAttribute('onsubmit', 'submitOrder()');
	} else {
		orderButton.setAttribute('disabled', '');
		inputForm.removeAttribute('onsubmit');
	}
};

/*********************************************************
 * Filter/sorting Menu
 **********************************************************/

const filterButton = document.querySelector('.navbar__menu > button');
const filterElement = document.querySelector('#filterMenu');
let filterMenuVisible = false;

filterButton.addEventListener('click', () => {
	filterButton.setAttribute('aria-expanded', !filterMenuVisible);
	filterMenuVisible = JSON.parse(filterButton.getAttribute('aria-expanded'));

	if (filterMenuVisible) {
		filterElement.style.display = 'flex';
		window.setTimeout(() => {
			filterElement.style.opacity = 1;
			filterElement.style.transform = 'scale(1)';
		}, 0);
	} else {
		filterElement.style.opacity = 0;
		filterElement.style.transform = 'scale(0)';

		window.setTimeout(() => {
			filterElement.style.display = 'none';
		}, 200);
	}

	if (filterMenuVisible) filterElement.querySelector('select').focus();
});
