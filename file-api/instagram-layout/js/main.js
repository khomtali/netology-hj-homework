const addClass = (className, context) => context.classList.add(className),
      removeClass = (className, context) => context.classList.remove(className),
      hasClass = (className, context) => context.classList.contains(className);
class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.positions = container.querySelectorAll('.layout__item');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  registerEvents() {
    this.positions.forEach((position) => {
      position.addEventListener('dragover', this.showFrame.bind(this));
    });
    this.positionsContainer.addEventListener('drop', this.loadFile.bind(this));
    this.actionButton.addEventListener('click', this.makeImgLayout.bind(this));
  }
  showFrame(e) {
    e.preventDefault();
    for (let position of this.positions) {
      position.classList.remove('layout__item_active');
    }
    if (e.target.tagName === 'IMG') {
      return;
    } else {
      e.target.classList.add('layout__item_active');
    }
  }
  loadFile(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const imageTypeRegExp = /^image\//;
    if (imageTypeRegExp.test(file.type)) {
      this.showImage(file, e.target);
      this.result.textContent = '';
    } else {
      this.result.textContent = 'Файл не является изображением.';
    }
    e.target.classList.remove('layout__item_active');
  }
  showImage(imageFile, position) {
    let img = document.createElement('img');
    img.src = URL.createObjectURL(imageFile);
    img.addEventListener('load', event => {
      URL.revokeObjectURL(event.currentTarget.src);
    });   
    img.classList.add('layout__image');
    for (let layout in this.layout) {
      const className = 'layout__item_' + layout;
      if (position.classList.contains('layout__item_' + layout)) {
        this.layout[layout] = img;
      }
    }
    /* const canvas = document.createElement('canvas');
    canvas.width = position.offsetWidth;
    canvas.height = position.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    img.src = canvas.toDataURL(); */
    position.appendChild(img);
  }
  makeImgLayout() {
    const canvas = document.createElement('canvas');
    canvas.width = this.positionsContainer.clientWidth;
    canvas.height = this.positionsContainer.clientHeight;
    const ctx = canvas.getContext('2d');
    let dx = 0, dy = 0;
    let img = this.layout.left;
    let container = img.parentElement;
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, container.offsetWidth, container.offsetHeight);
    dx = container.offsetWidth;
    img = this.layout.top;
    container = img.parentElement;
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, container.offsetWidth, container.offsetHeight);
    dy = container.offsetHeight;
    img = this.layout.bottom;
    container = img.parentElement;
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, container.offsetWidth, container.offsetHeight);
    this.result.value = `<img src="${canvas.toDataURL()}">`;
  }
}

new iLayout(document.getElementById('layout'));
