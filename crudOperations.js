const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_HkwP4Zk_Q';
const APP_SECRET = '0384210d71fd41a4967239846cbf0dab';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};
const BOOKS_PER_PAGE = 10;

function loginUser() {
    let username = $('#userNameInputLogin').val();
    let password = $('#inputPasswordLogin').val();

    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        console.log(res);
        signInUser(res, 'Login successful.')
    }).catch(handleAjaxError)
}

function registerUser() {
    let regexValidator = /[A-Za-z]/;
    let username = $('#userNameInputRegister').val();
    let password = $('#inputPasswordRegister').val();
    let repeat = $('#repeatPasswordRegister').val();
    if (repeat !== password) {
        showError("Passwords should match!");
    }else if(password.length<3){
        showError("Passwords should be at least 3 characters!");
    }else if(!username.match(regexValidator)){

        showError("User Name should contain only letters!");
    }
    else {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Registration successful.')
        }).catch(handleAjaxError)

    }
}

/* function listBooks() {
    $.ajax({
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        showView('viewBooks')
        displayPaginationAndBooks(res.reverse())
    }).catch(handleAjaxError)
}
*/

function createNew() {
    let firstName = $('#firstNameInput').val();
    let surName = $('#surNameInput').val();
    let phoneNumber = $('#phoneNumberInput').val();
    let address = $('#addressInput').val();
    let creator = sessionStorage.getItem('username');
    if(!surName){
     surName = " ";
    }
    let data = {
        firstName,
        surName,
        phoneNumber,
        address,
        creator
    };
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'appdata/' + APP_KEY + '/phones',
        data: data,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function () {
      showHomeView();
        showInfo('Book created.')
    }).catch(handleAjaxError)
}

function getAll() {
    if(sessionStorage.getItem('authToken')===null){

        showView('viewHome');
    }else {

        $.ajax({
            url: BASE_URL + 'appdata/' + APP_KEY + '/phones',
            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function (res) {
            let cat = $('#catalog');
            cat.empty();
            for (let contact of res) {
                let tr = $('<tr>');
                tr.append(`<th>${contact.firstName}</th><th>${contact.surName}</th><th>${contact.address}</th><th>${contact.phoneNumber}</th><th>${contact.creator}</th>`);
               cat.append(tr);
            }
            showView('viewHome');
            console.log(res)
        }).catch(handleAjaxError)
    }
}
function logoutUser() {
    sessionStorage.clear();
    showHomeView();
    showHideMenuLinks();
    showInfo('Logout successful.')
}

function signInUser(res, message) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);
    showHomeView();
    showHideMenuLinks();
    showInfo(message)
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg)
}