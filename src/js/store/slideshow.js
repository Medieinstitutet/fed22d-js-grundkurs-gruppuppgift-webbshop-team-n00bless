import donutsArray from './donuts';
/**
 * Slideshow section
 *
 */
function generateSlideshow() {
  function prevImage(e) {
    const index = e.currentTarget.id.replace('prev-', '');
    const imgContainer = document.querySelector(`#img-${index}`);
    const currentSrc = imgContainer.getAttribute('src');
    console.log('prev');

    if (currentSrc === donutsArray[index].images[0]) {
      imgContainer.setAttribute('src', donutsArray[index].images[1]);
    } else {
      imgContainer.setAttribute('src', donutsArray[index].images[0]);
    }
  }

  function nextImage(e) {
    const index = e.currentTarget.id.replace('next-', '');
    const imgContainer = document.querySelector(`#img-${index}`);
    const currentSrc = imgContainer.getAttribute('src');
    console.log('next');
    if (currentSrc === donutsArray[index].images[0]) {
      imgContainer.setAttribute('src', donutsArray[index].images[1]);
    } else {
      imgContainer.setAttribute('src', donutsArray[index].images[0]);
    }
  }

  const prevBtns = document.querySelectorAll('button.prev');
  const nextBtns = document.querySelectorAll('button.next');

  prevBtns.forEach((btn) => {
    btn.addEventListener('click', prevImage);
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', nextImage);
  });
}

export default generateSlideshow;
