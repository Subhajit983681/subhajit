import { createOptimizedPicture } from '../../scripts/aem.js';

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
            if (div.querySelector('strong')) {
              div.className = 'counter-value';
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
