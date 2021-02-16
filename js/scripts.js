//console.log(`I'm connected`);

// Initiate variables to be used
const randomUserURL = `https://randomuser.me/api/?results=12`;
const galleryDIV = document.querySelector(`#gallery`);
const modalContainer = document.querySelector(`.modal-container`);
const modalBtn = document.querySelector(`#modal-close-btn`);
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
 * function to call getJSON and iterate over generate employee cards to 
 * display on page
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
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`;
    galleryDIV.insertAdjacentHTML(`beforeend`, galleryHTML);
};

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
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
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


galleryDIV.addEventListener(`click`, e =>{    
    const eventPath = e.composedPath();
    //this will let you get the card that was clicked no matter what element they click on specifically
    const employeeCard = eventPath[eventPath.indexOf(galleryDIV) - 1];
    if (employeeCard) {
      //this will provide a live list of the cards which you can reference when you create the modal. The indexes of these
      const cardsArray = [...document.getElementsByClassName("card")];
      const indexOfEmployeeCard = cardsArray.indexOf(employeeCard);
      generateModalHTML(employeeList[indexOfEmployeeCard]);
    }
});



// Setup initial page state
getEmployees(randomUserURL);