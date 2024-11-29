import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  const topDiv = document.createElement("div");
  topDiv.classList.add("counter-main-section");

  [...block.children].forEach((row) => {
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("counter-inner-part");
    while (row.firstElementChild) {
      innerDiv.append(row.firstElementChild);
    }

    [...innerDiv.children].forEach((div, index) => {
      if (index === 0 && div.firstElementChild) {
        div.className = "counter-heading";
      } else {
        div.className = "counter-sub-heading";
      }
    });

    topDiv.append(innerDiv);
  });

  block.textContent = "";
  block.append(topDiv);
}
