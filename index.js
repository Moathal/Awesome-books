const addBook = document.getElementById('add-book');
const newBook = document.getElementById('book');
const newAuthor = document.getElementById('author');
const booksList = document.querySelector('.books-list');

class Book{
  constructor(book, author){
    this.book=book;
    this.author=author;
  }
}

class BookM{
    constructor(){
      this.Books=[];
    }
    resetBooksList() {
    booksList.innerHTML = '';
    for (let i = 0; i < this.Books.length; i += 1) {
      const book = document.createElement('div');
      book.classList.add('book');
      if(i%2===0){
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
    resetBooksList();
  }

}
let methods= new BookM();
if (localStorage.getItem('books') !== null) methods.Books = JSON.parse(localStorage.getItem('books'));


methods.resetBooksList();

booksList.addEventListener('click', (e) => {
  if (e.target.className === 'rem-btn') {
    methods.deleteBook(e.target.id);
  }
});

addBook.addEventListener('click', () => {
  let book = new Book(newBook.value, newAuthor.value)
  methods.Books.push(book);
  window.localStorage.setItem('books', JSON.stringify(methods.Books));
  methods.resetBooksList();
});
