const throttle = ( handler, ms ) => {
	let timeout;
  return () => {
  	clearTimeout( timeout );
    timeout = setTimeout( handler, ms );
  }
};
class TextEditor {
	constructor( container, storageKey = '_text-editor__content' ) {
  	this.container = container;
    this.contentContainer = container.querySelector( '.text-editor__content' );
    this.hintContainer = container.querySelector( '.text-editor__hint' );
    this.filenameContainer = container.querySelector( '.text-editor__filename' );
    this.storageKey = storageKey;
    this.registerEvents();
    this.load( this.getStorageData() );
  }
  registerEvents() {
  	const save = throttle( this.save.bind( this ), 1000 );
    this.contentContainer.addEventListener( 'input', save );
    this.contentContainer.addEventListener( 'dragover', this.showHint.bind( this ) );
    this.contentContainer.addEventListener( 'drop', this.loadFile.bind( this ) );
    this.contentContainer.addEventListener( 'drop', this.hideHint.bind( this ) );
    this.contentContainer.addEventListener( 'dragleave', this.hideHint.bind( this ) );
  }
  loadFile( e ) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const txtTypeRegExp = /^text\/plain/;
    this.setFilename( file.name );
    if ( txtTypeRegExp.test( file.type ) ) {
      this.readFile( file );
    } else {
      this.load( 'Файл не может быть прочитан. Загрузите .txt' );
    }
  }
  readFile( file ) {
    const reader = new FileReader();
    this.load();
    reader.addEventListener( 'loadend', e => {
      this.load( e.currentTarget.result );
    });
    reader.readAsText( file );
  }
  setFilename( filename ) {
  	this.filenameContainer.textContent = filename;
  }
  showHint( e ) {
    e.preventDefault();
    this.hintContainer.classList.add( 'text-editor__hint_visible' );
  }
  hideHint() {
    this.hintContainer.classList.remove( 'text-editor__hint_visible' );
  }
  load( value ) {
  	this.contentContainer.value = value || '';
  }
  getStorageData() {
  	return localStorage[ this.storageKey ];
  }
  save() {
  	localStorage[ this.storageKey ] = this.contentContainer.value;
  }
}

new TextEditor( document.getElementById( 'editor' ));
