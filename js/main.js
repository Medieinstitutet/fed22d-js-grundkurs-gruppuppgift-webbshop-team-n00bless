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

const donutsArrayLucia = [
	//placeholder, add 1 to basket free of charge 13/12
	{
		id: 11,
		name: 'Luciamunk',
		price: 0,
		categories: ['chocolate', 'filled'],
		images: [
			'img/chocolate-iced-custard-filled-banner.jpeg',
			'img/chocolate-iced-custard-filled.jpeg',
		],
		rating: 5,
	},
];

/*********************************************************
 * Adding to Cart
 **********************************************************/
const cartItems = [];
const donutListEl = document.querySelector('.donuts');

const fetchDonut = (id) => {
	for (const donut of donutsArray) {
		if (donut.id === id) {
			return donut;
		}
	}
};

const donutIncreaseCount = (id) => {
	const donutEl = document.querySelector(`[data-id="${id}"]`);
	const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
	// const currentCount = Number(currentCountEl.value) + 1;
	if (currentCountEl.value >= 99) {
		currentCountEl.value = currentCountEl.value.slice(0, 2); //remove 3rd digit
	} else {
		currentCountEl.value++;
		const donutObj = fetchDonut(id);
		const currentPriceText = donutEl.querySelector(
			'.donuts__item_addcart span'
		);
		currentPriceText.innerText = donutObj.price * currentCountEl.value;
	}
};
const donutDecreaseCount = (id) => {
	const donutEl = document.querySelector(`[data-id="${id}"]`);
	const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
	// const currentCount = Number(currentCountEl.value) - 1;

	if (currentCountEl.value != 0) {
		currentCountEl.value--;
		const donutObj = fetchDonut(id);
		const currentPriceText = donutEl.querySelector(
			'.donuts__item_addcart span'
		);
		currentPriceText.innerText = donutObj.price * currentCountEl.value;
	}
};

const donutAddToCart = (id) => {
	const currentCount = Number(
		document.querySelector(`[data-id="${id}"] .donuts__item_quantity input`)
			.value
	);

	if (currentCount > 0 && cartItems.length > 0) {
		for (const item of cartItems) {
			if (item.id === id) {
				item.count = item.count + currentCount;
				item.totPrice = item.totPrice + currentCount * item.price;
				updateCartDOM();
				return;
			}
		}

		for (const donut of donutsArray) {
			if (donut.id === id) {
				cartItems.push({
					...donut,
					count: currentCount,
					totPrice: currentCount * donut.price,
				});
				console.log(cartItems);
				updateCartDOM();
				return;
			}
		}
	}
};

/*********************************************************
 * Special Rules
 **********************************************************/

const updateCartDOM = () => {
	/*To get total price of cart*/
	const cartSum = cartItems.reduce((accumulator, object) => {
		return accumulator + object.totPrice;
	}, 0);
	/*To check if there is more than 15 donuts in total in cart(not finished)*/
	const CartCount = cartItems.reduce((accumulator, object) => {
		return accumulator + object.count;
	}, 0);

	let freightSum = Math.round(25 + cartSum * 0.1); // 25 kr standard fee + 10% of total
	const freightSumDisplay = document.getElementById('freight-sum');
	const cartSumDisplay = document.getElementById('cart-sum');
	const CartSumAndFreightSum = CartSum + freightSum;

	cartSumDisplay.textContent = `Totalpris: ${CartSumAndFreightSum} kr.`;
	freightSumDisplay.textContent = `Frakt: ${freightSum} kr.`;

	if (cartSum >= 800) {
		document.getElementById('invoice-radio').disabled = true; // No invoice alternative above 800kr
	} else {
		document.getElementById('invoice-radio').disabled = false;
	}
	checkForSpecialRules(CartSumAndFreightSum, cartSumDisplay);
};

const checkForSpecialRules = (CartSumAndFreightSum, cartSumDisplay) => {
	const thisDate = new Date();
	const day = thisDate.getDay();
	const hour = thisDate.getHours();

	const lucia = {
		month: 11, //month/date index start at 0, so 11 = 12.
		date: 13,
	};
	/*Lucia donut rule*/
	if (thisDate.getMonth() == lucia.month && thisDate.getDate() == lucia.date) {
		cartItems.push(donutsArrayLucia); //Add Lucia donut to cart
	}

	/*Monday before 10 rule*/
	if (day === 1 && hour <= 23) {
		CartSumAndFreightSum = Math.round(CartSumAndFreightSum * 0.9); //10 % discount
		cartSumDisplay.textContent = `Totalpris: Måndagsrabatt: 10 % på hela beställningen ${CartSumAndFreightSum} kr.`;
	} else {
		return;
	}
};

/*********************************************************
 * Create HTML output
 **********************************************************/

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

	if (halfPoint) {
		ratingEl += starHalfIcon;
	}

	return ratingEl;
};
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
          <button class="button button--background" onclick="donutDecreaseCount(${donut.id
			})"><i class="fa-solid fa-minus" title="Decrease count"></i></button>
          <input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
          >= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
          <button class="button button--background" onclick="donutIncreaseCount(${donut.id
			})"><i class="fa-solid fa-plus" title="Increase count"></i></button>
        </div>
        <button class="donuts__item_addcart button button--background" onclick="donutAddToCart(${donut.id
			})">Lägg till för <span>${donut.price}</span> kr</button>
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
const cardNumberInputField = document.querySelector('[name="card-number"]');
const cardExpirationInputField = document.querySelector('[name="date"]')
const cvcInputField = document.querySelector('[name="cvc"]');
const socialSecurityInputField = document.querySelector('[name="social-security-number"]');


const cardRadioInput = document.querySelector('#card-radio');
const invoiceRadioInput = document.querySelector('#invoice-radio');

const paymentOptionRadios = Array.from(document.querySelectorAll('[name="payment-method"]'));

const orderButton = document.querySelector('#order-btn');

const cardForm = document.querySelector('#card-payment-form');
const invoiceForm = document.querySelector('#invoice-payment-form');

let formValidation = {
	name: false,
	address: false,
	postCode: false,
	city: true,
	tel: true,
	email: true,
	payment: false
};

let cardPaymentValidation = {
	cardNumber: false,
	expirationDate: false,
	cvc: false
}

nameInputField.addEventListener('keyup', () => {
	formValidation.name = nameInputField.value.indexOf(' ') > 0;
	activateOrderButton();
});

addressInputField.addEventListener('keyup', () => {
	formValidation.address =
		/\d/.test(addressInputField.value) ? /[A-Za-zÅåÄäÖö]/.test(addressInputField.value) : false;
	console.log(/\d/.test(addressInputField.value));
	activateOrderButton();
});

postCodeInputField.addEventListener('keyup', () => {
	formValidation.postCode = postCodeInputField.value.length === 5;
	activateOrderButton();
});


paymentOptionRadios.map(radio => {
	radio.addEventListener('click', () => {
		activateOrderButton();
		switch (radio.value) {
			case 'card':
				cardForm.style.display = 'flex'
				invoiceForm.style.display = 'none'

				break

			case 'invoice':
				cardForm.style.display = 'none'
				invoiceForm.style.display = 'flex'

				break
		}
	})
})

cardNumberInputField.addEventListener('keyup', () => {
	cardPaymentValidation.cardNumber = cardNumberInputField.value !== '';
	activateOrderButton();
})

cardExpirationInputField.addEventListener('keyup', () => {
	cardPaymentValidation.expirationDate = cardExpirationInputField.value !== '';
	activateOrderButton();
})

cvcInputField.addEventListener('keyup', () => {
	cardPaymentValidation.cvc = cvcInputField.value !== '';
	activateOrderButton();
})

socialSecurityInputField.addEventListener('keyup', () => {
	activateOrderButton();
})


const validateInput = validatedInputs => {
	for (const prop in validatedInputs) {
		if (!validatedInputs[prop]) {
			return false;
		}
	}
	return true;
};

const validatePaymentInputs = () => {
	if (cardRadioInput.checked) {
		for (const prop in cardPaymentValidation) {
			if (!cardPaymentValidation[prop]) {
				formValidation.payment = false;
				return false;
			}
		}
		formValidation.payment = true;
	}
	else if (invoiceRadioInput.checked) {
		if (socialSecurityInputField.value === ''){
			formValidation.payment = false; 
			return false;
		} 
		formValidation.payment = true;
	}
}

const activateOrderButton = () => {
	validatePaymentInputs();
	if (validateInput(formValidation)) {
		orderButton.removeAttribute('disabled');
		inputForm.setAttribute('onsubmit', 'submitOrder()');
	} else {
		orderButton.setAttribute('disabled', '');
		inputForm.removeAttribute('onsubmit');
	}
};

const submitOrder = () => {
	alert('Order lagd!');
	console.log('Order lagd!');
};

document.querySelector('form').addEventListener('reset', function (event) {
	//A warning text for accessibility
	if (!confirm('Är du säker att du vill återställa formuläret?')) {
		event.preventDefault();
	}
});


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
