import donutsArray from './store/donuts';
import generateSlideshow from './store/slideshow';

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

let filteredDonutsArray = [...donutsArray];

const donutsArrayLucia = [
  // placeholder, add 1 to basket free of charge 13/12
  {
    id: 13,
    name: 'Luciamunk',
    price: 1,
    categories: ['sprinkles', 'filled'],
    images: ['img/new-york-cheesecake.webp', 'img/new-york-cheesecake.webp'],
    rating: 5,
  },
];

const thisDate = new Date();

const day = thisDate.getDay();
const hour = thisDate.getHours();
const month = thisDate.getMonth();
const date = thisDate.getDate();

/*
 Page load rules
*/

/* Christmas rule */
const christmasCheck = () => {
  if (month === 11 && date === 24) {
    document.body.style.backgroundImage = "url('/img/christmasbg.webp')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    const christmasPrizeColor = document.querySelectorAll('.donuts__item_info p:first-child');
    for (let i = 0; i < christmasPrizeColor.length; ++i) {
      christmasPrizeColor[i].style.color = 'red';
    }
  }
};

/* Weekend rule */
const weekendPrice = () => {
  if ((day >= 5 && hour >= 15) || day === 6 || (day === 1 && hour <= 3)) {
    for (const obj of donutsArray) {
      obj.price = Math.round(obj.price * 1.15);
    }
  }
};
weekendPrice();

/** *******************************************************
 * Adding to Cart
 ********************************************************* */
const cartItems = [];
const cartTotalSum = 0;
const donutListEl = document.querySelector('.donuts');

let donutListElQuantityButtons = donutListEl.querySelectorAll('.donuts__item_quantity > button');
let donutListElAddToCartButtons = donutListEl.querySelectorAll('.donuts__item_addcart');

const generateButtonListeners = () => {
  donutListElQuantityButtons = donutListEl.querySelectorAll('.donuts__item_quantity > button');
  donutListElAddToCartButtons = donutListEl.querySelectorAll('.donuts__item_addcart');

  for (const button of donutListElQuantityButtons) {
    if (button.getAttribute('data-type') === 'decrease') {
      button.addEventListener('click', () => {
        donutDecreaseCount(button.getAttribute('data-id'));
      });
    } else if (button.getAttribute('data-type') === 'increase') {
      button.addEventListener('click', () => {
        donutIncreaseCount(button.getAttribute('data-id'));
      });
    }
  }

  for (const button of donutListElAddToCartButtons) {
    button.addEventListener('click', () => {
      donutAddToCart(button.getAttribute('data-id'));
    });
  }
};

const updateCartDOM = () => {
  /* To get total price of cart */
  const cartSum = cartItems.reduce((accumulator, object) => accumulator + object.totPrice, 0);
  /* To check if there is more than 15 donuts in total in cart */
  const cartCount = cartItems.reduce((accumulator, object) => accumulator + object.count, 0);

  const cartCounterDisplay = document.querySelector('#cart-counter');
  const cartCounter = cartCount;
  cartCounterDisplay.textContent = cartCounter;

  checkForSpecialRules(cartSum, cartCount);
};

const donutIncreaseCount = (id) => {
  const donutEl = document.querySelector(`[data-id="${id}"]`);
  const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
  let currentCount = Number(currentCountEl.value) + 1;
  const intId = Number(id);
  const donutObject = donutsArray.find((item) => item.id === intId);

  if (currentCount > 99) {
    currentCount = 99;
  }

  currentCountEl.value = currentCount;
  donutEl.querySelector('.donuts__item_addcart span').innerText = donutObject.price * currentCount;

  const price = donutObject.price * currentCount >= 0 ? donutObject.price * currentCount : donutObject.price;
  donutEl.querySelector('.donuts__item_addcart span').innerText = price;

  for (const donut of cartItems) {
    if (donut.id === id && donut.count > 0) {
      donut.count -= 1;
      donut.totPrice = donut.count * donut.price;
      console.log(cartItems);
      renderCart();
    }
  }
};

const donutDecreaseCount = (id) => {
  const donutEl = document.querySelector(`[data-id="${id}"]`);
  const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
  const currentCount = Number(currentCountEl.value) - 1;
  const intId = Number(id);
  const donutObject = donutsArray.find((item) => item.id === intId);

  if (currentCountEl.value > 0) {
    currentCountEl.value = currentCount;
    donutEl.querySelector('.donuts__item_addcart span').innerText = donutObject.price * currentCount;
  }

  const price = donutObject.price * currentCount >= 0 ? donutObject.price * currentCount : donutObject.price;
  donutEl.querySelector('.donuts__item_addcart span').innerText = price;

  for (const donut of cartItems) {
    if (donut.id === id && donut.count > 0) {
      donut.count -= 1;
      donut.totPrice = donut.count * donut.price;
      console.log(cartItems);
      renderCart();
    }
  }
};

const donutAddToCart = (id) => {
  const intId = Number(id);
  const currentCount = Number(document.querySelector(`[data-id="${id}"] .donuts__item_quantity input`).value);

  if (currentCount > 0) {
    const donutObject = donutsArray.find((item) => item.id === intId);
    const donutsCost = donutObject.price * currentCount;

    // if (!isTimerStarted) {
    //   startTimer(60 * 15);
    // }

    // const totalCartSum = cartItems.reduce((accumulator, donut) => accumulator + donut.totPrice, 0);
    // console.log(totalCartSum);
    // let donutsCost;
    // for (const donut of donutsArray) {
    //   if (donut.id === id) {
    //     donutsCost = donut.price * currentCount;
    //   }
    // }
    document.querySelector(`[data-id="${id}"] .donuts__item_quantity input`).value = '0';

    if (cartTotalSum + donutsCost > 2000) {
      alert('Du kan inte beställa för mer än 2000kr');
      return;
    }

    const existsInCart = cartItems.find((item) => item.id === intId);

    if (existsInCart) {
      for (const item of cartItems) {
        item.count += currentCount;
        item.totPrice += donutsCost;
      }
    } else {
      cartItems.push({
        ...donutObject,
        count: currentCount,
        totPrice: donutsCost,
      });
    }

    updateCartDOM();
    renderCart();

    // if (currentCount > 0 && cartItems.length > 0) {
    // if (currentCount > 0) {
    //   for (const item of cartItems) {
    //     if (item.id === id) {
    //       item.count += currentCount;
    //       item.totPrice += currentCount * item.price;
    //       updateCartDOM();
    //       renderCart();
    //       return;
    //     }
    //   }

    //   for (const donut of donutsArray) {
    //     if (donut.id === id) {
    //       cartItems.push({
    //         ...donut,
    //         count: currentCount,
    //         totPrice: currentCount * donut.price,
    //       });
    //       updateCartDOM();
    //       renderCart();
    //       return;
    //     }
    //   }
    // }
  }
};

const renderCart = () => {
  let cartItemsToRender = '';
  for (const donut of cartItems) {
    console.log(donut);
    const donutElement = /* html */ `
			<li data-id="cart-${donut.id}">
				<div className="name">
					<img src=${donut.images[0]} width="30" height="30"/>
					<p>${donut.name}</p>
				</div>
				<div className="donuts__item_quantity">
					<button 
						class="button button--background"
						onClick="updateCartQuantity('cart-${donut.id}', 'dec')"
					>-</button>
					<input type="number" value="${donut.count}" data-id="cart-${donut.id}"/>
					<button 
						class="button button--background" 
						onClick="updateCartQuantity('cart-${donut.id}', 'inc')"
					>+</button>
					<p>${donut.totPrice} kr</p>
				</div>
			</li>`;
    cartItemsToRender += donutElement;
  }
  document.querySelector('#cart article ul').innerHTML = cartItemsToRender;
  updateCartDOM();
};

const updateCartQuantity = (id, button) => {
  const donutInCart = cartItems.find((donut) => `cart-${donut.id}` === id);
  donutInCart.count = button === 'dec' ? donutInCart.count - 1 : donutInCart.count + 1;
  const cartDonutInput = document.querySelector(`input[data-id="${id}"]`);
  cartDonutInput.value = donutInCart.count;
  renderCart();
};

/** *******************************************************
 * Special Rules
 ********************************************************* */

const checkForSpecialRules = (cartSum, cartCount) => {
  const freightSum = Math.round(25 + cartSum * 0.1); // 25 kr standard fee + 10% of total
  const freightSumDisplay = document.getElementById('freight-sum');
  const cartSumDisplay = document.getElementById('cart-sum');
  const deliveryTime = document.getElementById('delivery-time');
  const checkDiscountCode = document.querySelector('[name="discount-code"]');
  checkDiscountCode.addEventListener('keyup', updateCartDOM);
  let cartSumAndFreightSum = cartSum + freightSum;

  const FreightSumInSEK = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  }).format(freightSum);
    /* const cartSumInSEK = new Intl.NumberFormat('sv-SE', {
          style: 'currency', currency: 'SEK'
      }).format(cartSum); <-- never displayed */
  const cartSumAndFreightSumInSEK = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  }).format(cartSumAndFreightSum);

  cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSumInSEK}.`;
  freightSumDisplay.textContent = `Frakt: ${FreightSumInSEK}.`;
  deliveryTime.textContent = 'Beställningen skickas 30 minuter efter orderläggning.';

  /* No invoice alternative above 800kr rule */
  if (cartSum >= 800) {
    document.getElementById('invoice-radio').disabled = true;
  } else {
    document.getElementById('invoice-radio').disabled = false;
  }

  /* Lucia donut rule */
  const lucia = {
    month: 11, // month/date index start at 0, so 11 = 12.
    date: 13,
  };

  if (month === lucia.month && date === lucia.date && cartItems.length >= 1) {
    cartItems.push(...donutsArrayLucia);
    donutsArrayLucia.pop();
  }

  /* Monday before 10:00 rule */
  if (day === 1 && hour <= 10) {
    cartSumAndFreightSum = Math.round(cartSumAndFreightSumInSEK * 0.9); // 10 % discount
    cartSumDisplay.textContent = `Totalpris: Måndagsrabatt: 10 % på hela beställningen ${cartSumAndFreightSumInSEK}.`;
  } else {
    cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSumInSEK}.`;
  }

  /* More than 15 donuts in total rule */
  if (cartCount >= 15) {
    cartSumAndFreightSum = cartSum; // no freight cost added
    cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSumInSEK}.`;
    freightSumDisplay.textContent = 'Fraktfritt.';
  } else {
    cartSumAndFreightSum = cartSum + freightSum;
    freightSumDisplay.textContent = `Frakt: ${FreightSumInSEK}.`;
  }

  /* Free order with coupon rule */
  if (checkDiscountCode.value === 'a_damn_fine-cup_of-coffee') {
    cartSumAndFreightSum = 0;
    cartSumDisplay.textContent = 'Din beställning är kostnadsfri!';
    freightSumDisplay.textContent = 'Fraktfritt.';
  } else {
    cartSumAndFreightSum = cartSum + freightSum;
  }

  /* Weekend deliver time rule */
  if (day === 6 || day === 0) {
    deliveryTime.textContent = 'Beställningen skickas 90 minuter efter orderläggning.';
  }

  /* Night deliver time rule */
  if (day !== 6 || (day !== 0 && hour >= 0 && hour <= 5)) {
    deliveryTime.textContent = 'Beställningen skickas 45 minuter efter orderläggning.';
  }

  /* friday 11-13 rule */
  if (day === 5 && hour >= 11 && hour <= 13) {
    deliveryTime.textContent = 'Leveranstiden är beräknad till 15:00';
  }

  /* thuesday even week rule */
  const countWeekNumber = () => {
    const startDate = new Date(thisDate.getFullYear(), 0, 1);
    const days = Math.floor((thisDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);

    if (weekNumber % 2 === 0 && day === 5 && cartSumAndFreightSum >= 25) {
      cartSumAndFreightSum -= 25;
      cartSumDisplay.textContent = `Totalpris efter 25 kr rabatt: ${cartSumAndFreightSumInSEK}.`;
    }
  };

  countWeekNumber();

  /* More than 10 of same donut rule */
  const checkSameDonut = () => {
    for (const donuts of cartItems) {
      if (donuts.count >= 10 && donuts.discount === false) {
        donuts.totPrice = Math.round(donuts.totPrice * 0.9);
        donuts.discount = true;
      } else if (donuts.count < 10 && donuts.discount === true) {
        donuts.discount = false;
      }
    }
  };
  checkSameDonut();
};

/** *******************************************************
 * Create HTML output
 ********************************************************* */

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
  donutListEl.innerHTML = '';

  for (const donut of filteredDonutsArray) {
    donutListEl.innerHTML += /* html */ `
      <article class="donuts__item" data-id=${donut.id}>
        <h2>${donut.name}</h2>
				<div class="donuts__item_image">
					<button id ="prev-${donut.id}" class="prev">&#10094;</button>
					<img id = "img-0-${donut.id}" src="${donut.images[0]}" alt="A picture of a donut"/>
          <img id = "img-1-${donut.id}" class = "hiddenImg" src="${donut.images[1]}" alt="A picture of a donut"/>
					<button id ="next-${donut.id}" class="next">&#10095;</button>
				</div>
				<div class="donuts__item_info">
					<p>${donut.price} kr</p>
					<p>${generateStarRating(donut.rating)}</p>
				</div>
        <div class="donuts__item_quantity">
          <button 
						class="button button--background" 
						data-id=${donut.id}
						data-type='decrease'
					><i class="fa-solid fa-minus" title="Decrease count"></i></button>
          <input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
          >= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
          <button 
						class="button button--background" 
						data-id=${donut.id}
						data-type='increase'
					><i class="fa-solid fa-plus" title="Increase count"></i></button>
        </div>
        <button 
					class="donuts__item_addcart button button--background" 
					data-id=${donut.id}
				>Lägg till för <span>${donut.price}</span> kr</button>
      </article>
    `;
  }

  generateButtonListeners();
  generateSlideshow();
};

const generateCategories = () => {
  for (const donut of donutsArray) {
    for (const category of donut.categories) {
      categorySet.add(category);
    }
  }
};

/** *******************************************************
 * Input field validation
 ********************************************************* */

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
const socialSecurityInputField = document.querySelector('[name="social-security-number"]');

const cardRadioInput = document.querySelector('#card-radio');
const invoiceRadioInput = document.querySelector('#invoice-radio');

const paymentOptionRadios = Array.from(document.querySelectorAll('[name="payment-method"]'));

const personalDataCheckbox = document.querySelector('[name="personal-data"]');

const orderButton = document.querySelector('#order-btn');

const cardForm = document.querySelector('#card-payment-form');
const invoiceForm = document.querySelector('#invoice-payment-form');

const formValidation = {
  name: false,
  address: false,
  postCode: false,
  city: false,
  tel: false,
  email: false,
  payment: false,
  personalData: false,
};

const cardPaymentValidation = {
  cardNumber: false,
  expirationDate: false,
  cvc: false,
};

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

const submitOrder = () => {
  alert('Order lagd!');
  console.log('Order lagd!');
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

nameInputField.addEventListener('keyup', () => {
  formValidation.name = nameInputField.value.indexOf(' ') > 0;
  activateOrderButton();
});

addressInputField.addEventListener('keyup', () => {
  formValidation.address = /\d/.test(addressInputField.value) ? /[A-Za-zÅåÄäÖö]/.test(addressInputField.value) : false;
  activateOrderButton();
});

postCodeInputField.addEventListener('keyup', () => {
  formValidation.postCode = postCodeInputField.value.length === 5;
  activateOrderButton();
});

cityInputField.addEventListener('keyup', () => {
  formValidation.city = cityInputField.value !== '';
  activateOrderButton();
});

telInputField.addEventListener('keyup', () => {
  formValidation.tel = cityInputField.value !== '';
  activateOrderButton();
});

emailInputField.addEventListener('keyup', () => {
  formValidation.email = cityInputField.value !== '';
  activateOrderButton();
});

for (const radio of paymentOptionRadios) {
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
      default:
        cardForm.style.display = 'flex';
        invoiceForm.style.display = 'none';
        cardNumberInputField.setAttribute('required', '');
        cardExpirationInputField.setAttribute('required', '');
        cvcInputField.setAttribute('required', '');
        socialSecurityInputField.removeAttribute('required');
    }
  });
}

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

document.querySelector('form').addEventListener('reset', (event) => {
  // A warning text for accessibility
  // eslint-disable-next-line no-restricted-globals
  if (confirm('Är du säker att du vill återställa formuläret?')) {
    event.preventDefault();
    reset();
  }
});

/** *******************************************************
 * Filter/sorting Menu
 ********************************************************* */

const filterButton = document.querySelector('#filterMenuButton');
const resetButton = document.querySelector('#filterMenuResetButton');
const filterElement = document.querySelector('#filterMenu');
const searchInput = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector('#searchButton');
let filterMenuVisible = false;

const searchQuery = (query) => {
  if (query && query !== '') {
    const filteredArray = donutsArray.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    filteredDonutsArray = filteredArray;

    generateDonuts();
  }
};

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
});

resetButton.addEventListener('click', () => {
  filteredDonutsArray = [...donutsArray];
  generateDonuts();
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

// eslint-disable-next-line no-unused-vars
const addCategorySort = (category) => {
  if (filterSet.has(category)) {
    filterSet.delete(category);
  } else {
    filterSet.add(category);
  }

  filteredDonutsArray = [];
  for (const donut of donutsArray) {
    for (const cat of donut.categories) {
      if (filterSet.has(cat) && !filteredDonutsArray.find((filteredDonut) => filteredDonut.id === donut.id)) {
        filteredDonutsArray.push(donut);
      }
    }
  }

  generateDonuts();
};

const inputButtons = document.querySelectorAll('.navbar__dropdown_item_categories input');
for (const input of inputButtons) {
  input.addEventListener('click', (e) => addCategorySort(e.target.name));
}

const toogleIconPrice = document.querySelector('#price-sort');
const toogleIconRating = document.querySelector('#rating-sort');
const toogleIconName = document.querySelector('#name-sort');

toogleIconPrice.style.transform = 'scale(-1, 1)';
toogleIconRating.style.transform = 'scale(-1, 1)';
toogleIconName.style.transform = 'scale(-1, 1)';

toogleIconPrice.addEventListener('click', initSortPriceDown);
toogleIconRating.addEventListener('click', initSortRatingDown);
toogleIconName.addEventListener('click', initSortNameDown);

/* Name */
const sortNameDown = (a, b) => {
  toogleIconName.removeEventListener('click', initSortNameDown);
  toogleIconName.addEventListener('click', initSortNameUp);
  if (a.name < b.name) {
    return -1;
  }

  return 1;
};

function initSortNameDown() {
  filteredDonutsArray.sort(sortNameDown);
  generateDonuts();

  toogleIconName.style.transition = '0.6s ease';
  toogleIconName.style.transform = 'rotate(-0.5turn)';
}
const sortNameUp = (a, b) => {
  toogleIconName.removeEventListener('click', initSortNameUp);
  toogleIconName.addEventListener('click', initSortNameDown);
  if (a.name < b.name) {
    return 1;
  }

  return -1;
};

function initSortNameUp() {
  filteredDonutsArray.sort(sortNameUp);
  generateDonuts();

  toogleIconName.style.transition = '0.6s ease';
  toogleIconName.style.transform = 'scale(-1, 1)';
  toogleIconName.style.transform = 'rotate(deg0)';
}
/* Rating */
const sortRatingDown = (a, b) => {
  toogleIconRating.removeEventListener('click', initSortRatingDown);
  toogleIconRating.addEventListener('click', initSortRatingUp);
  if (a.rating < b.rating) {
    return -1;
  }

  return 1;
};

function initSortRatingDown() {
  filteredDonutsArray.sort(sortRatingDown);
  generateDonuts();

  toogleIconRating.style.transition = '0.6s ease';
  toogleIconRating.style.transform = 'rotate(-0.5turn)';
}
const sortRatingUp = (a, b) => {
  toogleIconRating.removeEventListener('click', initSortRatingUp);
  toogleIconRating.addEventListener('click', initSortRatingDown);
  if (a.rating < b.rating) {
    return 1;
  }

  return -1;
};

function initSortRatingUp() {
  filteredDonutsArray.sort(sortRatingUp);
  generateDonuts();

  toogleIconRating.style.transition = '0.6s ease';
  toogleIconRating.style.transform = 'scale(-1, 1)';
  toogleIconRating.style.transform = 'rotate(deg0)';
}
/* Price */
const sortPriceDown = (a, b) => {
  toogleIconPrice.removeEventListener('click', initSortPriceDown);
  toogleIconPrice.addEventListener('click', initSortPriceUp);
  if (a.price < b.price) {
    return -1;
  }

  return 1;
};

function initSortPriceDown() {
  filteredDonutsArray.sort(sortPriceDown);
  generateDonuts();

  toogleIconPrice.style.transition = '0.6s ease';
  toogleIconPrice.style.transform = 'rotate(-0.5turn)';
}
const sortPriceUp = (a, b) => {
  toogleIconPrice.removeEventListener('click', initSortPriceUp);
  toogleIconPrice.addEventListener('click', initSortPriceDown);
  if (a.price < b.price) {
    return 1;
  }

  return -1;
};

function initSortPriceUp() {
  filteredDonutsArray.sort(sortPriceUp);
  generateDonuts();

  toogleIconPrice.style.transition = '0.6s ease';
  toogleIconPrice.style.transform = 'scale(-1, 1)';
  toogleIconPrice.style.transform = 'rotate(deg0)';
}

// Timer
// 15 min
// Reset
// Resets everything
const reset = () => {
  window.location.reload();
};

const stopTimer = () => {
  clearInterval(timerInterval);
  alert('Du var för långsam! Kundvagnen blev nollställd');
  reset();
};

const startTimer = (duration) => {
  isTimerStarted = true;

  const timer = duration;
  let minutes;
  let seconds;
  timerInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // display.textContent = minutes + ':' + seconds;

    if (timer - 1 < 0) {
      // timer = duration;
      stopTimer();
    }
  }, 1000);
};

const cartToogleSwitch = () => {
  if (cartSection.style.display === 'none') {
    donutSection.style.display = 'none';
    navbarMenu.style.display = 'none';
    cartSection.style.display = 'block';
    if (navbarDropDown.style.display === 'flex') {
      navbarDropDown.style.display = 'none';
    }
  } else {
    donutSection.style.display = 'flex';
    navbarMenu.style.display = 'flex';
    cartSection.style.display = 'none';
  }
};

const cartToogle = document.querySelector('#cart-icon');
cartToogle.addEventListener('click', cartToogleSwitch);

const donutSection = document.querySelector('section.donuts');
const cartSection = document.querySelector('section#cart');
const navbarMenu = document.querySelector('.navbar__menu');
const navbarDropDown = document.querySelector('.navbar__dropdown');
cartSection.style.display = 'none';

generateDonuts();
generateCategories();
christmasCheck();
