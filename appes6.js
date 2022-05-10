class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author =  author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById("book-list");

        // Create element
        const row = document.createElement("tr");

        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `

        // Append
        list.appendChild(row);
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, className){
        const div = document.createElement('div');

        div.className = `alert ${className}`

        div.appendChild(document.createTextNode(message))

        const container = document.querySelector(".container");
        const form = document.querySelector('#book-form')

        container.insertBefore(div, form);

        // Disappear after 3secs
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000)
    }

    deleteBook(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove()
        }
    }
}

// Local Storage
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books')) 
        }

        return books
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            // Add book to UI
            ui.addBookToList(book)
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event Listeners to add book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value

    // Instantiate book
    const book = new Book(title, author, isbn)

    // Instantiate UI
    const ui = new UI;

    // Validation
    if (title === '' || author === '' || isbn === ''){
       ui.showAlert("Please fill in the fields", "error")
    } else{

    //  Add book
    ui.addBookToList(book);

    // Add to Local Storage
    Store.addBook(book)

    // Show alerts
    ui.showAlert('Book added', 'success');
    }
    

    // clear fields
    ui.clearFields()

    e.preventDefault();
})

// Event Listener to delete book
document.querySelector('#book-list').addEventListener('click', function(e){
    // instantiate UI
    const ui = new UI()

    // delete book
    ui.deleteBook(e.target)

    // remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // Show alert
    ui.showAlert('Book deleted', 'success')
})