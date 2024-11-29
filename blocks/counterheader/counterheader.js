import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const topDiv = document.createElement('div');
  topDiv.classList.add('counter-main-section');

  [...block.children].forEach((row) => {
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('counter-inner-part');
    while (row.firstElementChild) {
      innerDiv.append(row.firstElementChild);
    }

    [...innerDiv.children].forEach((div) => {
        // div.className = 'counter-data';
        if (div.firstElementChild) {
          div.className = 'counter-heading';
        } else {
          div.className = 'counter-sub-heading';
        }
    });

    topDiv.append(innerDiv);
  });

  // ul.querySelectorAll('picture > img').forEach((img) => {
  //   img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  // });

  block.textContent = '';
  block.append(topDiv);
}
