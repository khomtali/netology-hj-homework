'use strict';
const template = document.querySelector('.fa').parentElement,
      nav = document.querySelector('.tabs-nav'),
      content = document.querySelector('.tabs-content');

Array.from(content.children).forEach(article => {
  const navTab = nav.appendChild(template.cloneNode(true)).firstElementChild;
  navTab.classList.add('fa');
  navTab.classList.add(article.dataset.tabIcon);
  navTab.textContent = article.dataset.tabTitle;
});
nav.removeChild(template);

const firstTab = nav.firstElementChild;
firstTab.classList.add('ui-tabs-active');
for (let article of content.children) {
  if (article.dataset.tabTitle != firstTab.firstElementChild.textContent) {
    article.classList.add('hidden');
  }
}

for (let tab of nav.children) {
  tab.addEventListener('click', showArticle);
}
function showArticle(event) {
  for (let tab of nav.children) {
    tab.classList.remove('ui-tabs-active');
  }
  event.target.parentElement.classList.add('ui-tabs-active');
  for (let article of content.children) {
    if (article.dataset.tabTitle === event.target.textContent) {
      article.classList.remove('hidden');
    } else {
      article.classList.add('hidden');
    }
  }
}
