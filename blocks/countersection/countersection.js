import { createOptimizedPicture } from '../../scripts/aem.js';

function animateCounter(element, start, end, duration) {
  const increment = (end - start) / (duration / 10);
  let current = start;

  const counterInterval = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(counterInterval);
    }
    element.textContent = Math.round(current);
  }, 10);
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('counter-block');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('counter-items');
    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    [...li.children].forEach((div, index) => {
      if (index === 0 && div.firstElementChild) {
        div.className = "counter";

        const strongElement = div.querySelector('strong');
        if (strongElement) { // Check if strongElement exists
          strongElement.className = "new-counter";

          // Apply animation to the counter
          const endValue = parseInt(strongElement.textContent, 10);
          if (!isNaN(endValue)) {
            strongElement.textContent = '0'; // Set initial value to 0
            animateCounter(strongElement, 0, endValue, 2000); // Animate from 0 to endValue in 2 seconds
          }
        }
      } else {
        div.className = "counter-content";
      }
    });

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
