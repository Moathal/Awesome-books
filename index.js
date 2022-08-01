const addBook = document.getElementById('add-book');
const newBook = document.getElementById('book');
const newAuthor = document.getElementById('author');
const booksList = document.querySelector('.books-list');
let books = [];

if (localStorage.getItem('books') !== null) books = JSON.parse(localStorage.getItem('books'));

function resetBooksList() {
  booksList.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `<h4>${books[i].book}</h4>
        <h4>${books[i].author}</h4>
        <button id=${i} class="rem-btn" >Remove</button><br> <br>`;
    booksList.appendChild(book);
  }
}
resetBooksList();

function deleteBook(buttonid) {
  books.splice(buttonid, 1);
  window.localStorage.setItem('books', JSON.stringify(books));
  resetBooksList();
}

booksList.addEventListener('click', (e) => {
  if (e.target.className === 'rem-btn') {
    deleteBook(e.id);
  }
});

addBook.addEventListener('click', () => {
  const book = { book: '', author: '' };
  book.book = newBook.value;
  book.author = newAuthor.value;
  books.push(book);
  window.localStorage.setItem('books', JSON.stringify(books));
  resetBooksList();
});
