import donutsArray from './donuts';
/**
 * Slideshow
 *This script is separeted from main.js for testing import/export with vite.
 */
function generateSlideshow() {
  function switchImage(e) {
    const index = e.currentTarget.id.replace('prev-', '').replace('next-', '');
    const img0 = document.querySelector(`#img-0-${index}`);
    const img1 = document.querySelector(`#img-1-${index}`);

    if (img0.classList.contains('hiddenImg')) {
      img0.classList.toggle('hiddenImg');
      img0.classList.add('showImg');
      img1.classList.add('hiddenImg');
      img1.classList.remove('showImg');
    } else {
      img0.classList.add('hiddenImg');
      img0.classList.remove('showImg');
      img1.classList.remove('hiddenImg');
      img1.classList.add('showImg');
    }
  }

  const prevBtns = document.querySelectorAll('button.prev');
  const nextBtns = document.querySelectorAll('button.next');

  prevBtns.forEach((btn) => {
    btn.addEventListener('click', switchImage);
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', switchImage);
  });
}

export default generateSlideshow;
