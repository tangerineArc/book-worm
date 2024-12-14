"use strict";

const seeds = [
    ["The Da Vinci Code", "Dan Brown", "English", 480, true],
    ["Angels & Demons", "Dan Brown", "English", 480, true],
    ["Origin", "Dan Brown", "English", 480, true],
    ["Lost Symbol", "Dan Brown", "English", 480, true],
    ["Deception Point", "Dan Brown", "English", 480, true],
    ["Digital Fortress", "Dan Brown", "English", 480, true],
    ["Inferno", "Dan Brown", "English", 480, true],
    ["Memory Man", "David Baldacci", "English", 480, true],
    ["The Alchemist", "Paulo Coelho", "English", 480, true],
    ["The Devil and Miss Prym", "Paulo Coelho", "English", 480, true],
    ["The Witch of Portobello", "Paulo Coelho", "English", 480, true],
    ["By the River Piedra I Sat Down and Wept", "Paulo Coelho", "English", 480, true],
    ["The Lost Hero", "Rick Riordan", "English", 480, true],
    ["The Son of Neptune", "Rick Riordan", "English", 480, true],
    ["The Mark of Athena", "Rick Riordan", "English", 480, true],
    ["The House of Hades", "Rick Riordan", "English", 480, true],
    ["The Lightning Thief", "Rick Riordan", "English", 480, true],
    ["The Namesake", "Jhumpa Lahiri", "English", 480, true],
    ["Bullet Train", "Kōtarō Isaka", "Japanese", 480, true],
    ["Crime and Punishment", "Fyodor Dostoevsky", "Russian", 480, true]
];

const books = [];

for (let seed of seeds) {
    createBook(...seed);
    addBookToDOM(books[0]);
}

const form = document.querySelector("form");
form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    
    createBook(data.title, data.author, data.language, data.numPages, data.hasRead === "yes");
    addBookToDOM(books[0]);

    document.querySelectorAll("form input").forEach(input => {
        input.value = "";
    });
});

function addBookToDOM(book) {
    const container = document.querySelector("main");

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
                <span>${"Mark as Unread"}</span>
            </button>
            <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x">
                    <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
                </svg> <!-- cross icon -->
                <span>Remove Book</span>
            </button>
        </div>
    `;
    container.insertBefore(newEntry, container.firstChild);
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