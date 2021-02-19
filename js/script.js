// Initiate variables to be used
const randomUserURL = `https://randomuser.me/api/?nat=us&results=12`;
const galleryDIV = document.querySelector(`#gallery`);
const employeeList = [];
let employees;
let galleryHTML;
let modalHTML;

/**
 * function to fetch object from API and display
 * error to console on failed attempts.
 * 
 * @param {text} url URL of API end point
 * @returns {object} Response object
 */
const getJSON = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * function to call getJSON and iterate over generate 
 * employee cards to display on page
 * 
 * @param {text} url URL of API end point
 */
const getEmployees = async (url) => {
    const employeesJSON = await getJSON(url);
    employees = employeesJSON.results;
    employees.map( employee => generateHTML(employee) );
}

/**
 * function to generate each employee card with 
 * details of employee
 * 
 * @param {object} employee object details
 */
const generateHTML = (employee) => {
    // build an employees array for modal
    employeeList.push(employee);
    galleryHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        </div>`;
    galleryDIV.insertAdjacentHTML(`beforeend`, galleryHTML);
};

/**
 * function to format employees mobile number
 * 
 * @param {text} number phone number
 * @return {text} formatted number
 */
const formatPhoneNumber = (number) => {
    //Filter only numbers from the input
    let cleaned = ('' + number).replace(/\D/g, '');    
    //Check if the input is of correct
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    //Change this to format for any country code.
    return match ? ['(', match[1], ') ', match[2], '-', match[3]].join('') : null;
}


/**
 * function to format date of birth
 * 
 * @param {text} date ISO date format
 * @return {text} formatted date
 */
const formattedDate = (date) => new Date(date).toLocaleDateString();

/**
 * function to generate select employee modal with 
 * additional details of employee
 * 
 * @param {object} employee object details
 */
const generateModalHTML = (employee) => {
    modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${formatPhoneNumber(employee.phone)}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${formattedDate(employee.dob.date)}</p>
                </div>
            </div>
        </div>`;

        // IMPORTANT: Below is only for exceeds tasks 
        // <div class="modal-btn-container">
        //     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        //     <button type="button" id="modal-next" class="modal-next btn">Next</button>
        // </div>
    galleryDIV.insertAdjacentHTML(`beforeend`, modalHTML);
};

/**
 * function to open selected employee details
 * to page within a modal
 * 
 * @param {object} cardPath array of clicked objects
 */
const openModal = (cardPath) => {
    // Targets employee card container selected
    const employeeCard = cardPath[cardPath.indexOf(galleryDIV) - 1];
    if (employeeCard !== undefined) {
        // Create an array of employee cards to reference for the modal
        const cardsArray = [...document.getElementsByClassName("card")];
        // Returns the index of the selected employee cards
        const indexOfEmployeeCard = cardsArray.indexOf(employeeCard);
        employeeCard.className === `card` ? generateModalHTML(employeeList[indexOfEmployeeCard]) : null;
    }
}

/**
 * function to employee modal from page by
 * removing the last child from gallery DIV
 */
const closeModal = () => galleryDIV.removeChild(galleryDIV.lastChild);


galleryDIV.addEventListener(`click`, e => {
    const eventPath = e.composedPath();
    openModal(eventPath);
    e.target.textContent === `X` ? closeModal() : null;
});

// Setup initial page state
getEmployees(randomUserURL);