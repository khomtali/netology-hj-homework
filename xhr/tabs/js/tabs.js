'use strict';
function tabsChange() {
  const tabs = document.getElementsByTagName('a');
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('loadstart', onLoadStart);
  xhr.addEventListener('loadend', onLoadEnd);
  xhr.addEventListener('load', onLoad);

  for (const tab of tabs) {
    if (tab.classList.contains('active')) {
      xhr.open('GET', tab.href, true);
      xhr.send();
    }
    tab.addEventListener('click', showTab);
  }
  function showTab(event) {
    event.preventDefault();
    for (const tab of tabs) {
      tab.classList.remove('active');
    }
    this.classList.add('active');
    xhr.open('GET', this.href, true);
    xhr.send();
  }
  function onLoad() {
    document.getElementById('content').innerHTML = xhr.responseText;
  }
  function onLoadStart() {
    document.getElementById('preloader').classList.remove('hidden');
    document.getElementById('content').innerHTML = '';
  }
  function onLoadEnd() {
    document.getElementById('preloader').classList.add('hidden');
  }
}
