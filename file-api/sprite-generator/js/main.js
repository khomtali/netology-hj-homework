class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');
    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');
    this.images = [];
    this.imagesCount = 0;
    this.registerEvents();
  }
  registerEvents() {
    this.uploadButton.addEventListener('change', this.loadFile.bind(this));
    this.submitButton.addEventListener('click', this.generateSprite.bind(this));
  }
  loadFile( e ) {
    e.preventDefault();
    const imgTypeRegExp = /^image\//;
    Array.from(e.currentTarget.files).forEach((file) => {
      if (imgTypeRegExp.test(file.type)) {
        const imgElement = document.createElement('img');
        imgElement.addEventListener('load', (e) => {
          URL.revokeObjectURL(imgElement.src);
        });
        imgElement.src = URL.createObjectURL(file);
        this.images.push(imgElement);
      }
      this.imagesCount = this.images.length;
      this.imagesCountContainer.textContent = this.imagesCount;
    });
  }
  generateSprite() {
    const getCSSCode = (name, dx, dy) => {
      let cssImg = `.${name} {\n\tbackground-position: `;
      cssImg += dx === 0 ? '0 ' : `-${dx}px `;
      cssImg += dy === 0 ? '0' : `-${dy}px`;
      cssImg += `;\n\twidth: 34px;\n\theight: 34px;\n}\n\n`;
      return cssImg;
    }
    const side = Math.ceil(Math.sqrt(this.imagesCount));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let dx = 0, dy = 0, cssImgs = '';
    this.images.forEach((img, index) => {
      ctx.drawImage(img, dx, dy, img.width, img.height);
      cssImgs += getCSSCode(`icon_${index}`, dx, dy);
      dx += img.width;
      if (dx % (side * img.width) === 0) {
        dy += img.height;
        dx = 0;
      }
    });
    this.imageElement.src = canvas.toDataURL();
    let cssIcon = `.icon {\n\tdisplay: inline-block;\n\t
    background-image: url(${this.imageElement.outerHTML});\n}\n\n`;
    this.codeContainer.textContent = cssIcon + cssImgs;
  }
}

new SpriteGenerator(document.getElementById('generator'));
