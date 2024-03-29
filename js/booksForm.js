class Author {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class Book {
  constructor() {
    this.books = [];
  }

  addBook(bookName, publishDate, bookCoverFile, price, authorName, authorEmail) {
    const author = new Author(authorName, authorEmail);
    const reader = new FileReader();

    reader.onload = () => {
      const bookCoverDataURL = reader.result; // Get the data URL
      const book = {
        name: bookName,
        publishDate: publishDate,
        bookCover: bookCoverDataURL,
        price: price,
        author: author
      };

      const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

      existingBooks.push(book);

      localStorage.setItem("books", JSON.stringify(existingBooks));
    };

    reader.readAsDataURL(bookCoverFile); // Read the file as a data URL
  }


  getBooks() {
    return this.books;
  }


  getBooks() {
    return this.books;
  }
}

const bookObject = new Book();
const numberOfBooks = localStorage.getItem("numberOfBooks");
let counter = 1;

(function () {
  'use strict';

  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        event.preventDefault();

        let bookName = document.getElementById("bookName").value;
        let publishDate = document.getElementById("publishDate").value;
        let bookCoverInput = document.getElementById("bookCover");
        let bookCoverFile = bookCoverInput.files[0]; // Get the file object
        let price = document.getElementById("price").value;
        let authorName = document.getElementById("authorName").value;
        let authorEmail = document.getElementById("authorEmail").value;

        bookObject.addBook(bookName, publishDate, bookCoverFile, price, authorName, authorEmail);

        document.getElementById("bookName").value = "";
        document.getElementById("publishDate").value = "";
        document.getElementById("bookCover").value = ""
        document.getElementById("price").value = "";
        document.getElementById("authorName").value = "";
        document.getElementById("authorEmail").value = "";

        form.classList.remove('was-validated');

        counter++;

        if (counter > numberOfBooks) {
          let existingBooks = JSON.parse(localStorage.getItem("books"));

          if (!existingBooks) {
            existingBooks = [];
          }

          console.log(bookObject.getBooks())
          existingBooks.push(...bookObject.getBooks());

          localStorage.setItem("books", JSON.stringify(existingBooks));
          window.location.href = "booksTable.html";
        } else {
          updateCounter();
        }

      }
    }, false);

  });
})();

document.addEventListener("DOMContentLoaded", function () {
  updateCounter();
});

function updateCounter() {
  document.getElementById("bookNumber").textContent = counter;
}

const bookCoverInput = document.getElementById('bookCover');