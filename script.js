"use strict";

setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

document.querySelector(".theme-toggler").addEventListener("click", event => {
    setTheme(document.querySelector(".theme-toggler").id === "sun-icon");
});

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

let id = 0;
let books = [];

let sortOrder = "increasing";

for (let seed of seeds) {
    createBook(...seed);
    updateDisplay(books[0]);
}

const form = document.querySelector("form");
form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    
    createBook(data.title, data.author, data.language, data.numPages, data.hasRead === "yes");

    document.querySelector(".filter-controls > div:nth-child(2)").click(); // updates display and book array -> click all filter

    document.querySelectorAll("form input").forEach(input => {
        input.value = "";
    });
});

filterBooks();
sortBooks();

function sortBooks() {
    const operations = []; // maintains queue of sort-options

    const mainContainer = document.querySelector("main");

    const [orderSort, titleSort, authorSort, recencySort] = document.querySelectorAll(".sort-controls > div");

    orderSort.addEventListener("click", event => {
        if (sortOrder === "decreasing") {
            sortOrder = "increasing";
            
            orderSort.title = "sorted in ascending order";
            orderSort.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>
                </svg>
            `;
        } else {
            sortOrder = "decreasing";

            orderSort.title = "sorted in descending order";
            orderSort.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>
                </svg>
            `;
        }

        for (let option of [titleSort, authorSort, recencySort]) {
            if (option.className === "selected-sort") {
                option.click();
            }
        }
    });

    titleSort.addEventListener("click", event => {
        if (titleSort.className === "selected-sort") {
            unSort(titleSort);
            return;
        }
        handleSorting("title", titleSort);
    });
    authorSort.addEventListener("click", event => {
        if (authorSort.className === "selected-sort") {
            unSort(authorSort);
            return;
        }
        handleSorting("author", authorSort);
    });
    recencySort.addEventListener("click", event => {
        if (recencySort.className === "selected-sort") {
            unSort(recencySort);
            return;
        }
        handleSorting("id", recencySort);
    });

    function handleSorting(property, option) {
        books.sort((a, b) => {
            if (a[property] > b[property]) return -1;
            if (a[property] < b[property]) return 1;
            return 0;
        });

        if (sortOrder === "increasing") {
            books.reverse();
        }

        mainContainer.innerHTML = "";
        option.className = "selected-sort";

        structuredClone(books).reverse().forEach(book => {
            updateDisplay(book);
        });

        document.querySelector(".selected-filter").click();
        
        operations.push(option);
    }

    function unSort(option) {
        option.className = "";

        mainContainer.innerHTML = "";

        books.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        }); // decreasing order of recency is the default
        console.log(books);
        structuredClone(books).reverse().forEach(book => {
            updateDisplay(book);
        });

        const operationsCopy = [...operations];
        operations.length = 0;
        while(operationsCopy.length) {
            const operation = operationsCopy.shift();
            if (operation !== option) {
                operation.click();
            }
        }

        document.querySelector(".selected-filter").click(); // updates display and book array -> click all filter
    }
}

function filterBooks() {
    const mainContainer = document.querySelector("main");

    const [allFilter, readFilter, unreadFilter] = document.querySelectorAll(".filter-controls > div:not(:first-child)");

    readFilter.addEventListener("click", event => {
        mainContainer.innerHTML = "";

        const readBooks = books.filter(book => book.readStatus);
        readBooks.reverse();
        readBooks.forEach(book => {
            updateDisplay(book);
        });

        allFilter.className = "";
        unreadFilter.className = "";
        readFilter.className = "selected-filter";
    });

    allFilter.addEventListener("click", event => {
        mainContainer.innerHTML = "";

        const booksCopy = structuredClone(books);
        booksCopy.reverse();
        booksCopy.forEach(book => {
            updateDisplay(book);
        });

        unreadFilter.className = "";
        readFilter.className = "";
        allFilter.className = "selected-filter";
    });

    unreadFilter.addEventListener("click", event => {
        mainContainer.innerHTML = "";

        const unreadBooks = books.filter(book => !book.readStatus);
        unreadBooks.reverse();
        unreadBooks.forEach(book => {
            updateDisplay(book);
        });

        readFilter.className = "";
        allFilter.className = "";
        unreadFilter.className = "selected-filter";
    });
}

function updateDisplay(book) {
    const checkMarkIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
        </svg>
    `;

    const minusIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>
        </svg>
    `;

    const container = document.querySelector("main");

    const newEntry = document.createElement("div");
    newEntry.classList.add("book-item");

    newEntry.innerHTML = `
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
            </svg> <!-- book-icon -->
            <h2 class="item-title">${book.title}</h2>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11.5 15H7a4 4 0 0 0-4 4v2"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="7" r="4"/>
            </svg>
            <h3 class="item-author">${book.author}</h3>
        </div>
        <div>
            <p class="item-lang">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
                </svg> <!-- lang-logo -->
                <span>${book.language}</span>
            </p>
            <p class="item-pages">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 7.5H3"/><path d="M21 12H3"/><path d="M21 16.5H3"/>
                </svg>
                <span>${book.numPages}</span>
            </p>
        </div>
        <div>
            <button type="button" class="read-status-toggler">
                ${book.readStatus ? minusIcon : checkMarkIcon}
                <span>${book.readStatus ? "Mark as Unread" : "Mark as Read"}</span>
            </button>
            <button type="button" class="remove-book-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
                </svg> <!-- cross icon -->
                <span>Remove Book</span>
            </button>
        </div>
    `;

    container.insertBefore(newEntry, container.firstChild);

    const readStatusToggler = newEntry.querySelector(".read-status-toggler");
    readStatusToggler.addEventListener("click", event => {
        book.readStatus = !book.readStatus;

        readStatusToggler.innerHTML = book.readStatus ? 
        `${minusIcon} <span>Mark as Unread</span>` :
        `${checkMarkIcon} <span>Mark as Read</span>`;
    });

    const removeBookButton = newEntry.querySelector(".remove-book-button");
    removeBookButton.addEventListener("click", event => {
        newEntry.remove();
        books = books.filter(item => item.id !== book.id);
    });
}

function createBook(title, author, language, numPages, readStatus) {
    const book = new Book(title, author, language, numPages, readStatus, id ++);

    books.unshift(book);
}

function Book(title, author, language, numPages, readStatus, id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.language = language;
    this.numPages = numPages;
    this.readStatus = readStatus;
}

function setTheme(checker) {
    const themeToggler = document.querySelector(".theme-toggler");
    const root = document.documentElement;

    const drawSun = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`;
    const drawMoon = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;

    if (checker) {
        themeToggler.id = "moon-icon";
        themeToggler.innerHTML = drawMoon;
        root.className = "dark";
    } else {
        themeToggler.id = "sun-icon";
        themeToggler.innerHTML = drawSun;
        root.className = "light";
    }
}