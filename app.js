// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn =  isbn
}

// UI Constructor
function UI(){}

// Create a prototype
UI.prototype.addBookToList = function(book){
    const list = document.getElementById("book-list")

    // Create element tr
    const row = document.createElement("tr");

    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById("title").value = "";
    document.getElementById("author").value  = "";
    document.getElementById("isbn").value = "";
}

// Show Alerts
UI.prototype.showAlert = function(message, className){
    // Create a div
    const div = document.createElement("div")
    // Create a className
    div.className = `alert ${className}`
    // Create textNode
    div.appendChild(document.createTextNode(message))
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert form
    container.insertBefore(div, form)

    // Disappear after three seconds
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)}

// Delete Book
UI.prototype.deleteBook = function(target){
    if (target.className === "delete"){
        target.parentElement.parentElement.remove()
    }
}

// Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function(e){
    // Get form values
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value

    // Instantiate book
    const book = new Book(title, author, isbn)

    // Instantiate ui
    const ui = new UI()


    if (title === "" || author === "" || isbn === ""){
        ui.showAlert('Please fill in the fields', 'error')
    } else {
    
    // Add book to list
    ui.addBookToList(book)

    // Show success
    ui.showAlert("Book added", "success")

    // Clear fields
    ui.clearFields()
    }

    

    e.preventDefault()
})

// Event Listeners for delete book
document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate ui
    const ui = new UI()

    // delete book
    ui.deleteBook(e.target);

    // show alert
    ui.showAlert("Book deleted", "success")

    e.preventDefault();
})