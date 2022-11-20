/* Kategorier:
filling
glazed
sprinkles
*/

// Bilder tagna från https://github.com/aaronfrost/DonutsApi/tree/main/static/images
let isTimerStarted = false;
let timerInterval = null;
const categorySet = new Set();
const filterSet = new Set();
const translatedCategories = {
	glazed: 'Glaserad',
	filled: 'Fylld',
	sprinkles: 'Strössel',
};

const donutsArray = [
	{
		id: 1,
		name: 'Chokladmunk med vaniljfyllning',
		price: 23,
		categories: ['glazed', 'filled'],
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
		categories: ['glazed'],
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
		categories: ['filled', 'sprinkles'],
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
		categories: ['glazed', 'sprinkles'],
		images: ['img/glazed-cinnamon-banner.jpeg', 'img/glazed-cinnamon.jpeg'],
		rating: 5,
	},
	{
		id: 5,
		name: 'Glaserad munk med citronfyllning',
		price: 23,
		categories: ['glazed', 'filled'],
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
		categories: ['filled'],
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
		categories: ['sprinkles', 'filled'],
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
		categories: ['sprinkles', 'filled'],
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
		categories: ['glazed'],
		images: ['img/strawberry-iced-banner.jpeg', 'img/strawberry-iced.jpeg'],
		rating: 5,
	},
];

let filteredDonutsArray = donutsArray;

const donutsArrayLucia = [
	//placeholder, add 1 to basket free of charge 13/12
	{
		id: 11,
		name: 'Luciamunk',
		price: 1,
		categories: ['sprinkles', 'filled'],
		images: [
			'img/chocolate-iced-custard-filled-banner.jpeg',
			'img/chocolate-iced-custard-filled.jpeg',
		],
		rating: 5,
	},
];

const thisDate = new Date();

const day = thisDate.getDay();
const hour = thisDate.getHours();
const month = thisDate.getMonth();
const date = thisDate.getDate();

/*********************************************************
 * Page load rules
 **********************************************************/

/*Christmas rule*/
const christmasCheck = () => {
	if (month === 11 && date == 24) {
		document.body.style.backgroundImage = "url('/img/christmasbg.webp')";
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundAttachment = 'fixed';
		let christmasPrizeColor = document.querySelectorAll(
				'.donuts__item_info p:first-child'
			),
			i;
		for (i = 0; i < christmasPrizeColor.length; ++i) {
			christmasPrizeColor[i].style.color = 'red';
		}
	}
};

/*Weekend rule*/
const weekendPrice = () => {
	if ((day >= 5 && hour >= 15) || day == 6 || (day == 1 && hour <= 3)) {
		for (const obj of donutsArray) {
			obj.price = Math.round(obj.price * 1.15);
		}
	}
};
weekendPrice();

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
	for (const donut of cartItems) {
		if (donut.id === id) {
			donut.count++;
			donut.totPrice = donut.count * donut.price;
			console.log(cartItems);
			renderCart();
		}
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

	for (const donut of cartItems) {
		if (donut.id === id && donut.count > 0) {
			donut.count--;
			donut.totPrice = donut.count * donut.price;
			console.log(cartItems);
			renderCart();
		}
	}
};

const donutAddToCart = (id) => {
	if (!isTimerStarted) startTimer(60 * 15);

	const currentCount = Number(
		document.querySelector(`[data-id="${id}"] .donuts__item_quantity input`)
			.value
	);
	let totalCartSum = cartItems.reduce(
		(accumulator, donut) => accumulator + donut.totPrice,
		0
	);
	let donutsCost;
	for (const donut of donutsArray) {
		if (donut.id === id) {
			donutsCost = donut.price * currentCount;
		}
	}
	document.querySelector(
		`[data-id="${id}"] .donuts__item_quantity input`
	).value = '0';
	if (totalCartSum + donutsCost > 2000) {
		alert('Du kan inte beställa för mer än 2000kr');
		return;
	}
	// if (currentCount > 0 && cartItems.length > 0) {
	if (currentCount > 0) {
		for (const item of cartItems) {
			if (item.id === id) {
				item.count = item.count + currentCount;
				item.totPrice = item.totPrice + currentCount * item.price;
				updateCartDOM();
				renderCart();
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
				updateCartDOM();
				renderCart();
				return;
			}
		}
	}
};

const renderCart = () => {
	let cartItemsToRender = '';
	for (const donut of cartItems) {
		let donutElement = /*html*/ `
		<li data-id="cart-${donut.id}">
		<div className="name">
			<img src=${donut.images[1]} width="30" height="30"/>
			<p>${donut.name}</p>
		</div>
		<div className="donuts__item_quantity">			
			<button class="button button--background" onclick="updateCartQuantity('cart-${donut.id}', 'dec')">-</button>
			<input type="number" value="${donut.count}" data-id="cart-${donut.id}"/>
			<button class="button button--background" onclick="updateCartQuantity('cart-${donut.id}', 'inc')">+</button>
			<p>${donut.totPrice} kr</p>
		</div>
		</li>`;
		cartItemsToRender = cartItemsToRender + donutElement;
	}
	document.querySelector('#cart article ul').innerHTML = cartItemsToRender;
	updateCartDOM();
};

const updateCartQuantity = (id, button) => {
	const donutInCart = cartItems.find((donut) => {
		return `cart-${donut.id}` === id;
	});
	donutInCart.count =
		button === 'dec' ? donutInCart.count - 1 : donutInCart.count + 1;
	const cartDonutInput = document.querySelector(`input[data-id="${id}"]`);
	cartDonutInput.value = donutInCart.count;
	renderCart();
};

const updateCartDOM = () => {
	/*To get total price of cart*/
	const cartSum = cartItems.reduce((accumulator, object) => {
		return accumulator + object.totPrice;
	}, 0);
	/*To check if there is more than 15 donuts in total in cart*/
	const cartCount = cartItems.reduce((accumulator, object) => {
		return accumulator + object.count;
	}, 0);

	const cartCounterDisplay = document.querySelector('#cart-counter');
	const cartCounter = cartCount;
	cartCounterDisplay.textContent = cartCounter;

	checkForSpecialRules(cartSum, cartCount);
};

/*********************************************************
 * Special Rules
 **********************************************************/

const checkForSpecialRules = (cartSum, cartCount) => {
	let freightSum = Math.round(25 + cartSum * 0.1); // 25 kr standard fee + 10% of total
	const freightSumDisplay = document.getElementById('freight-sum');
	const cartSumDisplay = document.getElementById('cart-sum');
	const deliveryTime = document.getElementById('delivery-time');
	const checkDiscountCode = document.querySelector('[name="discount-code"]');
	checkDiscountCode.addEventListener('keyup', updateCartDOM);
	let cartSumAndFreightSum = cartSum + freightSum;

	cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSum} kr.`;
	freightSumDisplay.textContent = `Frakt: ${freightSum} kr.`;
	deliveryTime.textContent =
		'Beställningen skickas 30 minuter efter orderläggning.';

	/*No invoice alternative above 800kr rule*/
	if (cartSum >= 800) {
		document.getElementById('invoice-radio').disabled = true;
	} else {
		document.getElementById('invoice-radio').disabled = false;
	}

	/*Lucia donut rule*/
	const lucia = {
		month: 11, //month/date index start at 0, so 11 = 12.
		date: 13,
	};

	if (month == lucia.month && date == lucia.date && cartItems.length >= 1) {
		cartItems.push(...donutsArrayLucia);
		donutsArrayLucia.pop();
	}

	/*Monday before 10:00 rule*/
	if (day === 1 && hour <= 10) {
		cartSumAndFreightSum = Math.round(cartSumAndFreightSum * 0.9); //10 % discount
		cartSumDisplay.textContent = `Totalpris: Måndagsrabatt: 10 % på hela beställningen ${cartSumAndFreightSum} kr.`;
	} else {
		cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSum} kr.`;
	}

	/*More than 15 donuts in total rule*/
	if (cartCount >= 15) {
		cartSumAndFreightSum = cartSum; //no freight cost added
		cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSum} kr.`;
		freightSumDisplay.textContent = `Fraktfritt.`;
	} else {
		cartSumAndFreightSum = cartSum + freightSum;
		freightSumDisplay.textContent = `Frakt: ${freightSum} kr.`;
	}

	/*Free order with coupon rule*/
	if (checkDiscountCode.value === 'a_damn_fine-cup_of-coffee') {
		cartSumAndFreightSum = 0;
		cartSumDisplay.textContent = `Din beställning är kostnadsfri!`;
		freightSumDisplay.textContent = `Fraktfritt.`;
	} else {
		cartSumAndFreightSum = cartSum + freightSum;
	}

	/*Weekend deliver time rule*/
	if (day === 6 || day === 7) {
		deliveryTime.textContent =
			'Beställningen skickas 90 minuter efter orderläggning.';
	}

	/*Night deliver time rule*/
	if (day !== 6 || (day !== 7 && hour >= 0 && hour <= 5)) {
		deliveryTime.textContent =
			'Beställningen skickas 45 minuter efter orderläggning.';
	}

	/*friday 11-13 rule*/
	if (day === 5 && hour >= 11 && hour <= 13) {
		deliveryTime.textContent = 'Leveranstiden är beräknad till 15:00';
	}

	/*thuesday even week rule*/
	const countWeekNumber = () => {
		startDate = new Date(thisDate.getFullYear(), 0, 1);
		const days = Math.floor((thisDate - startDate) / (24 * 60 * 60 * 1000));
		const weekNumber = Math.ceil(days / 7);

		if (weekNumber % 2 == 0 && day == 5 && cartSumAndFreightSum >= 25) {
			cartSumAndFreightSum = cartSumAndFreightSum - 25;
			cartSumDisplay.textContent = `Totalpris efter 25 kr rabatt: ${cartSumAndFreightSum} kr.`;
		}
	};
	countWeekNumber(); /*More than 10 of same donut rule*/

	for (var i = 0; i < cartItems.length; i++) {
		let sameDonutCount = cartItems[i].count;
		if (sameDonutCount >= 10) {
			return (cartItems[i].totPrice = Math.round(cartItems[i].totPrice * 0.9));
		}
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
		for (const category of donut.categories) {
			categorySet.add(category);
		}

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
					})"><i class="fa-solid fa-minus" title="Decrease count"></i></button>
          <input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
          >= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
          <button class="button button--background" onclick="donutIncreaseCount(${
						donut.id
					})"><i class="fa-solid fa-plus" title="Increase count"></i></button>
        </div>
        <button class="donuts__item_addcart button button--background" onclick="donutAddToCart(${
					donut.id
				})">Lägg till för <span>${donut.price}</span> kr</button>
      </article>
    `;
	}
	donutListEl.innerHTML = donuts;
};

generateDonuts();
christmasCheck(); //Denna ligger här för man kommer behöva stylea texten på munkarna efter de har genererats

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
const cardExpirationInputField = document.querySelector('[name="date"]');
const cvcInputField = document.querySelector('[name="cvc"]');
const socialSecurityInputField = document.querySelector(
	'[name="social-security-number"]'
);

const cardRadioInput = document.querySelector('#card-radio');
const invoiceRadioInput = document.querySelector('#invoice-radio');

const paymentOptionRadios = Array.from(
	document.querySelectorAll('[name="payment-method"]')
);

const personalDataCheckbox = document.querySelector('[name="personal-data"]');

const orderButton = document.querySelector('#order-btn');

const cardForm = document.querySelector('#card-payment-form');
const invoiceForm = document.querySelector('#invoice-payment-form');

let formValidation = {
	name: false,
	address: false,
	postCode: false,
	city: false,
	tel: false,
	email: false,
	payment: false,
	personalData: false,
};

let cardPaymentValidation = {
	cardNumber: false,
	expirationDate: false,
	cvc: false,
};

nameInputField.addEventListener('keyup', () => {
	formValidation.name = nameInputField.value.indexOf(' ') > 0;
	activateOrderButton();
});

addressInputField.addEventListener('keyup', () => {
	formValidation.address = /\d/.test(addressInputField.value)
		? /[A-Za-zÅåÄäÖö]/.test(addressInputField.value)
		: false;
	activateOrderButton();
});

postCodeInputField.addEventListener('keyup', () => {
	formValidation.postCode = postCodeInputField.value.length === 5;
	activateOrderButton();
});

cityInputField.addEventListener('keyup', () => {
	formValidation.city = cityInputField.value !== '';
	activateOrderButton;
});

telInputField.addEventListener('keyup', () => {
	formValidation.tel = cityInputField.value !== '';
	activateOrderButton;
});

emailInputField.addEventListener('keyup', () => {
	formValidation.email = cityInputField.value !== '';
	activateOrderButton;
});

paymentOptionRadios.map((radio) => {
	radio.addEventListener('click', () => {
		activateOrderButton();
		switch (radio.value) {
			case 'card':
				cardForm.style.display = 'flex';
				invoiceForm.style.display = 'none';
				cardNumberInputField.setAttribute('required', '');
				cardExpirationInputField.setAttribute('required', '');
				cvcInputField.setAttribute('required', '');
				socialSecurityInputField.removeAttribute('required');

				break;

			case 'invoice':
				cardForm.style.display = 'none';
				invoiceForm.style.display = 'flex';
				socialSecurityInputField.setAttribute('required', '');
				cardNumberInputField.removeAttribute('required');
				cardExpirationInputField.removeAttribute('required');
				cvcInputField.removeAttribute('required');

				break;
		}
	});
});

cardNumberInputField.addEventListener('keyup', () => {
	cardPaymentValidation.cardNumber = /\d/.test(cardNumberInputField.value);
	console.log(/\d/.test(cardNumberInputField.value));
	activateOrderButton();
});

cardExpirationInputField.addEventListener('keyup', () => {
	cardPaymentValidation.expirationDate = cardExpirationInputField.value !== '';
	activateOrderButton();
});

cvcInputField.addEventListener('keyup', () => {
	cardPaymentValidation.cvc = cvcInputField.value !== '';
	activateOrderButton();
});

socialSecurityInputField.addEventListener('keyup', () => {
	formValidation.payment = /\d/.test(socialSecurityInputField.value);
	activateOrderButton();
});

personalDataCheckbox.addEventListener('click', () => {
	formValidation.personalData = personalDataCheckbox.checked;
	activateOrderButton();
});

const validateInput = (validatedInputs) => {
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
				return;
			}
		}
		formValidation.payment = true;
	} else if (invoiceRadioInput.checked) {
		if (socialSecurityInputField.value === '') {
			formValidation.payment = false;
			return;
		}
		formValidation.payment = true;
	}
};

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
	if (confirm('Är du säker att du vill återställa formuläret?')) {
		event.preventDefault();
		reset();
	}
});

/*********************************************************
 * Filter/sorting Menu
 **********************************************************/

const filterButton = document.querySelector('.navbar__menu > button');
const filterElement = document.querySelector('#filterMenu');
const searchInput = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector('#searchButton');
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

searchButton.addEventListener('click', () => {
	searchQuery(searchInput.value);
});

// Listen for ENTER click
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' && document.activeElement === searchInput) {
		searchQuery(searchInput.value);
	}
});

const searchQuery = (query) => {
	if (query && query != '') {
		const filteredArray = donutsArray.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase())
		);

		console.log(filteredArray);
	}
};

const renderFromFilter = () => {
	let donuts = [];
	for (const donut of filteredDonutsArray) {
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
					})"><i class="fa-solid fa-minus" title="Decrease count"></i></button>
					<input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
					>= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
					<button class="button button--background" onclick="donutIncreaseCount(${
						donut.id
					})"><i class="fa-solid fa-plus" title="Increase count"></i></button>
				</div>
				<button class="donuts__item_addcart button button--background" onclick="donutAddToCart(${
					donut.id
				})">Lägg till för <span>${donut.price}</span> kr</button>
			</article>
		`;
	}

	donutListEl.innerHTML = donuts;
};
// const renderFromCategories = () => {
// 	let donuts = [];
// 	for (const donut of donutsArray) {
// 		for (const category of donut.categories) {
// 			if (filterSet.has(category)) {
// 				donuts += /*html*/ `
// 					<article class="donuts__item" data-id=${donut.id}>
// 						<h2>${donut.name}</h2>
// 						<div class="donuts__item_image">
// 							<img
// 								src="${donut.images[1]}"
// 								alt="A picture of a donut"
// 							/>
// 						</div>
// 										<div class="donuts__item_info">
// 												<p>${donut.price} kr</p>
// 												<p>${generateStarRating(donut.rating)}</p>
// 										</div>

// 						<div class="donuts__item_quantity">
// 							<button class="button button--background" onclick="donutDecreaseCount(${
// 								donut.id
// 							})"><i class="fa-solid fa-minus" title="Decrease count"></i></button>
// 							<input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
// 							>= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
// 							<button class="button button--background" onclick="donutIncreaseCount(${
// 								donut.id
// 							})"><i class="fa-solid fa-plus" title="Increase count"></i></button>
// 						</div>
// 						<button class="donuts__item_addcart button button--background" onclick="donutAddToCart(${
// 							donut.id
// 						})">Lägg till för <span>${donut.price}</span> kr</button>
// 					</article>
//     		`;
// 			}
// 		}
// 	}

// 	donutListEl.innerHTML = donuts;
// };

const addCategorySort = (category) => {
	if (filterSet.has(category)) {
		filterSet.delete(category);
		if (filterSet.size > 0) {
			// filteredDonutsArray =

			filteredDonutsArray = [];
			for (const donut of donutsArray) {
				for (const category of donut.categories) {
					if (filterSet.has(category)) {
						filteredDonutsArray.push(donut);
					}
				}
			}

			renderFromFilter();
		} else {
			generateDonuts();
		}
	} else {
		filterSet.add(category);

		filteredDonutsArray = [];
		for (const donut of donutsArray) {
			for (const category of donut.categories) {
				if (filterSet.has(category)) {
					filteredDonutsArray.push(donut);
				}
			}
		}

		renderFromFilter();
	}
};

const generateFilterButtons = () => {
	let inputs = '';
	for (const category of categorySet) {
		console.log(category, typeof category);
		inputs += /*html*/ `
			<li class="checkbox">
				<label class="checkbox__input"
					><input 
					onclick="addCategorySort('${category}')" 
					type="checkbox" name="${category}" />${translatedCategories[category]}
				</label>
			</li>
		`;
	}

	document.querySelector('.navbar__dropdown_item_categories').innerHTML =
		inputs;
};

const categoryButtons = filterElement.querySelectorAll('input');

const toogleIconPrice = document.querySelector('#price-sort');
const toogleIconRating = document.querySelector('#rating-sort');
const toogleIconName = document.querySelector('#name-sort');

let toogleIconPriceDir = document.querySelector('#price-sort i');
let toogleIconRatingDir = document.querySelector('#rating-sort i');
let toogleIconNameDir = document.querySelector('#name-sort i');

toogleIconPrice.addEventListener('click', initSortPriceDown);
toogleIconRating.addEventListener('click', initSortRatingDown);
toogleIconName.addEventListener('click', initSortNameDown);
/*Name*/
const sortNameDown = (a, b) => {
	toogleIconName.removeEventListener('click', initSortNameDown);
	toogleIconName.addEventListener('click', initSortNameUp);
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
};

function initSortNameDown() {
	filteredDonutsArray.sort(sortNameDown);
	if (filterSet.size > 0) {
		renderFromFilter();
	} else {
		generateDonuts();
	}
	toogleIconName.style.color = 'red'; //placeholder
	toogleIconNameDir.classList.toggle('fa-arrow-down-wide-short');
	console.log(toogleIconNameDir.classList.contains('fa-arrow-down-wide-short'));
}
const sortNameUp = (a, b) => {
	toogleIconName.removeEventListener('click', initSortNameUp);
	toogleIconName.addEventListener('click', initSortNameDown);
	if (a.name < b.name) {
		return 1;
	}
	if (a.name > b.name) {
		return -1;
	}
};

function initSortNameUp() {
	filteredDonutsArray.sort(sortNameUp);
	if (filterSet.size > 0) {
		renderFromFilter();
	} else {
		generateDonuts();
	}
	toogleIconName.style.color = 'green'; //placeholder
}
/*Rating*/
const sortRatingDown = (a, b) => {
	toogleIconRating.removeEventListener('click', initSortRatingDown);
	toogleIconRating.addEventListener('click', initSortRatingUp);
	if (a.rating < b.rating) {
		return -1;
	}
	if (a.rating > b.rating) {
		return 1;
	}
};

function initSortRatingDown() {
	filteredDonutsArray.sort(sortRatingDown);
	if (filterSet.size > 0) {
		renderFromFilter();
	} else {
		generateDonuts();
	}
	toogleIconRating.style.color = 'red'; //placeholder
}
const sortRatingUp = (a, b) => {
	toogleIconRating.removeEventListener('click', initSortRatingUp);
	toogleIconRating.addEventListener('click', initSortRatingDown);
	if (a.rating < b.rating) {
		return 1;
	}
	if (a.rating > b.rating) {
		return -1;
	}
};

function initSortRatingUp() {
	filteredDonutsArray.sort(sortRatingUp);
	if (filterSet.size > 0) {
		renderFromFilter();
	} else {
		generateDonuts();
	}
	toogleIconRating.style.color = 'green'; //placeholder
}
/*Price*/
const sortPriceDown = (a, b) => {
	toogleIconPrice.removeEventListener('click', initSortPriceDown);
	toogleIconPrice.addEventListener('click', initSortPriceUp);
	if (a.price < b.price) {
		return -1;
	}
	if (a.price > b.price) {
		return 1;
	}
};

function initSortPriceDown() {
	filteredDonutsArray.sort(sortPriceDown);
	if (filterSet.size > 0) {
		renderFromFilter();
	} else {
		generateDonuts();
	}
	toogleIconPrice.style.color = 'red'; //placeholder
}
const sortPriceUp = (a, b) => {
	toogleIconPrice.removeEventListener('click', initSortPriceUp);
	toogleIconPrice.addEventListener('click', initSortPriceDown);
	if (a.price < b.price) {
		return 1;
	}
	if (a.price > b.price) {
		return -1;
	}
};

function initSortPriceUp() {
	filteredDonutsArray.sort(sortPriceUp);
	if (filterSet.size > 0) {
		renderFromFilter();
	} else {
		generateDonuts();
	}
	toogleIconPrice.style.color = 'green'; //placeholder
}

// Timer
// 15 min
const stopTimer = () => {
	clearInterval(timerInterval);
	alert('Du var för långsam! Kundvagnen blev nollställd');
	reset();
};

const startTimer = (duration, display) => {
	isTimerStarted = true;

	let timer = duration,
		minutes,
		seconds;
	timerInterval = setInterval(() => {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		// display.textContent = minutes + ':' + seconds;

		if (--timer < 0) {
			// timer = duration;
			stopTimer();
		}
	}, 1000);
};

// Reset
// Resets everything
const reset = () => {
	location.reload();
};

generateFilterButtons();
