const draggables = document.querySelectorAll('.draggable');

draggables.forEach((elm) => {
  const slider = elm.querySelector('.slider');
  slider.value = '50';
  slider.setAttribute('min', 1);
  slider.setAttribute('max', 100);
  slider.oninput = function () {
    this.style.background = `linear-gradient(to right, #4299e1 ${+this.value}%, #fff ${+this.value}%, white 100%)`;
  };
});