const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

let changeOrder = (startingPoint, oldBottom, oldMiddle, oldTop) => {
    if (startingPoint.classList.contains('middle')) {
      oldBottom.classList.remove('bottom');
      oldBottom.classList.add('middle');

      oldMiddle.classList.remove('middle');
      oldMiddle.classList.add('top');

      oldTop.classList.remove('top');
      oldTop.classList.add('bottom');

    } else if (startingPoint.classList.contains('bottom')) {

      oldBottom.classList.remove('bottom');
      oldBottom.classList.add('top');

      oldMiddle.classList.remove('middle');
      oldMiddle.classList.add('bottom');

      oldTop.classList.remove('top');
      oldTop.classList.add('middle');
    }
};

let setUpPageAnimations = () => {
  var pages = document.querySelectorAll('.page');
  pages.forEach((page) => {
    page.addEventListener('click', (e) => {

      var oldBottom = document.querySelector('.bottom');
      var oldMiddle = document.querySelector('.middle');
      var oldTop = document.querySelector('.top');

      if (page.classList.contains('top')) { return; }
        pages.forEach((pageElem) => { 
          if (isReduced == false) {
            pageElem.classList.add('mid-transition');
            pageElem.ontransitionend = () => {
              changeOrder(page, oldBottom, oldMiddle, oldTop)
              pageElem.classList.remove('mid-transition');
            };
          } else {
            changeOrder(page, oldBottom, oldMiddle, oldTop)
          }
        });
          
      });
    });
};

let setUpEventProgressiveDisclosure = () => {
  let events = document.querySelectorAll('.event');
  events.forEach((eventEl) => {
    eventEl.classList.toggle('expanded');
    eventEl.addEventListener('click', (e) => {
      eventEl.classList.toggle('expanded');
    });
  });

};

document.body.classList.remove('no-js');

document.addEventListener("DOMContentLoaded", () => {
  setUpPageAnimations();
  setUpEventProgressiveDisclosure();
});
