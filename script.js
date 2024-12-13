"use strict";

const books = [];

createBook("The Da Vinci Code", "Dan Brown", "English", 480, true);
createBook("Angels & Demons", "Dan Brown", "English", 480, true);
createBook("Origin", "Dan Brown", "English", 480, true);
createBook("Lost Symbol", "Dan Brown", "English", 480, true);
createBook("Deception Point", "Dan Brown", "English", 480, true);
createBook("Digital Fortress", "Dan Brown", "English", 480, true);
createBook("Inferno", "Dan Brown", "English", 480, true);
createBook("Adventures of Huckleberry Finn", "Mark Twain", "English", 480, true);
createBook("The Adventures of Tom Sawyer", "Mark Twain", "English", 480, true);
createBook("David Copperfield", "Charles Dickens", "English", 480, true);
createBook("Hard Times", "Charles Dickens", "English", 480, true);
createBook("Memory Man", "David Baldacci", "English", 480, true);
createBook("The Alchemist", "Paulo Coelho", "English", 480, true);
createBook("The Devil and Miss Prym", "Paulo Coelho", "English", 480, true);
createBook("The Witch of Portobello", "Paulo Coelho", "English", 480, true);
createBook("By the River Piedra I Sat Down and Wept", "Paulo Coelho", "English", 480, true);
createBook("The Lost Hero", "Rick Riordan", "English", 480, true);
createBook("The Son of Neptune", "Rick Riordan", "English", 480, true);
createBook("The Mark of Athena", "Rick Riordan", "English", 480, true);
createBook("The House of Hades", "Rick Riordan", "English", 480, true);
createBook("The Lightning Thief", "Rick Riordan", "English", 480, true);
createBook("The Namesake", "Jhumpa Lahiri", "English", 480, true);
createBook("Bullet Train", "Kōtarō Isaka", "Japanese", 480, true);
createBook("Crime and Punishment", "Fyodor Dostoevsky", "Russian", 480, true);

displayBooks();

function displayBooks() {
    const container = document.querySelector("main");

    for (let book of books) {
        const newEntry = document.createElement("div");
        newEntry.classList.add("book-item");

        newEntry.innerHTML = `
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-marked">
                    <path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
                </svg> <!-- book-icon -->
                <h2 class="item-title">${book.title}</h2>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-pen">
                    <path d="M11.5 15H7a4 4 0 0 0-4 4v2"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="7" r="4"/>
                </svg>
                <h3 class="item-author">${book.author}</h3>
            </div>
            <div>
                <p class="item-lang">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages">
                        <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
                    </svg> <!-- lang-logo -->
                    <span>${book.language}</span>
                </p>
                <p class="item-pages">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rows-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 7.5H3"/>
                        <path d="M21 12H3"/><path d="M21 16.5H3"/>
                    </svg>
                    <span>${book.numPages}</span>
                </p>
            </div>
            <div>
                <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check">
                        <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                    </svg> <!-- check icon -->
                    <span>Mark as Read</span>
                </button>
                <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x">
                        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
                    </svg> <!-- cross icon -->
                    <span>Remove Book</span>
                </button>
            </div>
        `;
        container.appendChild(newEntry);
    }
}

function createBook(title, author, language, numPages, readStatus) {
    const book = new Book(title, author, language, numPages, readStatus);

    books.unshift(book);
}

function Book(title, author, language, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.numPages = numPages;
    this.readStatus = readStatus;
}