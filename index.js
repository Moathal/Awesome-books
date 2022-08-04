const addBook = document.getElementById('add-book');
const newBook = document.getElementById('book');
const newAuthor = document.getElementById('author');
const booksList = document.querySelector('.books-list');
const pages = document.querySelectorAll('.page');
const header = document.querySelector('header');
const date = document.querySelector('.date');
let link = 'a';
class Book {
  constructor(book, author) {
    this.book = book;
    this.author = author;
  }
}

class BookM {
  constructor() {
    this.Books = [];
    this.dayTime = { hour: 0, timing: '' };
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.daySuffix = '';
  }

  resetBooksList() {
    booksList.innerHTML = '';
    for (let i = 0; i < this.Books.length; i += 1) {
      const book = document.createElement('div');
      book.classList.add('book');
      if (i % 2 === 0) {
        book.classList.add('bg-danger');
      } else {
        book.classList.add('bg-light');
      }
      book.innerHTML = `<p>"${this.Books[i].book}" by
          ${this.Books[i].author}</p>
          <button id=${i} class="rem-btn" >Remove</button><br> <br>`;
      booksList.appendChild(book);
    }
  }

  deleteBook(buttonid) {
    this.Books.splice(buttonid, 1);
    window.localStorage.setItem('books', JSON.stringify(this.Books));
    this.resetBooksList();
  }

  decideDaySuffix(day) {
    if (day <= 20 && day > 10) {
      day %= 10;
    } else if (day <= 30 && day > 20) {
      day %= 20;
    } else if (day > 30) this.daySuffix = 'st';
    switch (day) {
      case 1:
        this.daySuffix = 'st';
        break;
      case 31:
        this.daySuffix = 'st';
        break;
      case 2:
        this.daySuffix = 'nd';
        break;
      case 3:
        this.daySuffix = 'rd';
        break;
      default:
        this.daySuffix = 'th';
    }
  }

  amPM(hour) {
    if (hour < 12 && hour > 0) {
      this.dayTime.hour = hour;
      this.dayTime.timing = 'am';
    } else if (hour === 0) {
      this.dayTime.hour = 12;
      this.dayTime.timing = 'am';
    } else if (hour > 12) {
      this.dayTime.hour = hour % 12;
      this.dayTime.timing = 'pm';
    } else {
      this.dayTime.hour = 12;
      this.dayTime.timing = 'pm';
    }
  }
}

const methods = new BookM();
if (localStorage.getItem('books') !== null) methods.Books = JSON.parse(localStorage.getItem('books'));

methods.resetBooksList();

function updateDate() {
  const d = new Date();
  const month = methods.months[d.getMonth()];
  methods.decideDaySuffix(d.getDay());
  const day = `${d.getDay()}${methods.daySuffix}`;
  methods.amPM(d.getHours());
  date.innerText = `${month} ${day} ${d.getFullYear()}, ${methods.dayTime.hour}:${d.getMinutes()}:${d.getSeconds()} ${methods.dayTime.timing}`;
}

setInterval(updateDate, 1000);

booksList.addEventListener('click', (e) => {
  if (e.target.className === 'rem-btn') {
    methods.deleteBook(e.target.id);
  }
});

addBook.addEventListener('click', () => {
  const book = new Book(newBook.value, newAuthor.value);
  methods.Books.push(book);
  window.localStorage.setItem('books', JSON.stringify(methods.Books));
  methods.resetBooksList();
});

header.addEventListener('click', (e) => {
  link = e.target.innerText.replace(/\s/g, '');
  pages.forEach((page) => page.classList.remove('active'));
  document.getElementById(link).classList.add('active');
});
