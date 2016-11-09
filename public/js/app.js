firebase.initializeApp({
  apiKey: 'AIzaSyCbSU58xsrFvI4E-qqffzIAtDzU7tJKVCo',
  authDomain: 'mango-and-lime.firebaseapp.com',
  databaseURL: 'https://mango-and-lime.firebaseio.com',
  storageBucket: 'mango-and-lime.appspot.com',
  messagingSenderId: '729735237542'
});

customElements.define('button-group', class extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  constructor(...args) {
    super(...args);
    this.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => this.selected = button);
    });
  }

  get selected() {
    return this.getAttribute('selected');
  }

  set selected(selected) {
    const oldValue = this.selected;
    this.setAttribute('selected', selected.value);
    const newValue = this.selected;
    const detail = { oldValue, newValue };
    const event = new CustomEvent('vote', { detail });
    this.dispatchEvent(event);
  }
});

document.querySelector('button-group').addEventListener('vote', event => {
  if (event.detail.oldValue)
    firebase.database().ref(event.detail.oldValue).transaction(count => (count || 1) - 1);
  if (event.detail.newValue)
    firebase.database().ref(event.detail.newValue).transaction(count => (count || 0) + 1);
});
