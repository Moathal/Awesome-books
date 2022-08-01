const addBook = document.querySelector('.add-book');
const newBook = document.getElementById('book');
const newAuthor = document.getElementById('author');
const booksList = document.querySelector('.books-list')
let books = [
    {
book: 'Harry Potter',
author: 'J.K Rolling'
},
]

function resetBooksList () {
    for (let i = 0; i < books.length; i+=1) {
        let book = document.createElement('li');
       book.innerHTML = `<h3>${books[i].book}</h3>
        <h3>${books[i].author}</h3>
        <button  onclick=deleteBook(${i})>Remove</button>`
        booksList.appendChild(book);
    };
}


function deleteBook (button) {
    books.splice(button, 1);
};

addBook.addEventListener('click', () =>{
    let book = {book:'', author:''};
    book.book = newBook.value;
    book.author = newAuthor.value;
});