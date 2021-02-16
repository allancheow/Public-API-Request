//console.log(`I'm connected`);

// Initial variables to be used
const randomUserURL = `https://randomuser.me/api/?results=12`;
const galleryDIV = document.querySelector(`#gallery`);
const script = document.querySelector(`script`);
const body = document.querySelector(`body`);
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
 * 
 * 
 * @param {text} url URL of API end point
 * @returns {object} people array object
 */
const getEmployees = async (url) => {
    const employeesJSON = await getJSON(url);
    employeesJSON.results.forEach( employee => generateHTML(employee) );
}

/**
 * 
 * @param { } data 
 */
const generateHTML = (person) => {
    console.log(person);
    galleryHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`;
    galleryDIV.insertAdjacentHTML(`beforeend`, galleryHTML);
}

getEmployees(randomUserURL);