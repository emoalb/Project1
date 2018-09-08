const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_HkwP4Zk_Q';
const APP_SECRET = '0384210d71fd41a4967239846cbf0dab';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

function loginUser() {
    let username = $('#userNameInputLogin').val().toLowerCase();
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
    let username = $('#userNameInputRegister').val().toLowerCase();
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


function postEdit() {
    let editedContent  = {};
    editedContent._id =  $('#idEdit').val();
    editedContent.address = $('#addressInputEdit').val();
    editedContent.firstName = $('#firstNameInputEdit').val();
    editedContent.surName = $('#surNameInputEdit').val();
    editedContent.phoneNumber = $('#phoneNumberInputEdit').val();
    editedContent.creator = sessionStorage.getItem('username');
    $.ajax({
        method: 'PUT',
        url: BASE_URL + 'appdata/' + APP_KEY + '/phones/' + editedContent._id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {address:editedContent.address,firstName:editedContent.firstName,surName:editedContent.surName,phoneNumber:editedContent.phoneNumber,creator:editedContent.creator}
    }).then(function () {
        showInfo('Edited.');
        showHomeView();
    }).catch(handleAjaxError);
}

function deleteContact(contact) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/phones/'+ contact._id,
        headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function () {
        showHomeView();
        showInfo("Contact deleted!")
    }).catch(handleAjaxError)
}

function getAll() {
    let cat = $('#catalog');
    cat.empty();
    if(!sessionStorage.getItem('authToken')){
        showView('viewHome');
    }else {
        $.ajax({
            url: BASE_URL + 'appdata/' + APP_KEY + '/phones',
            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function (res) {

            for (let contact of res) {
                let tr = $('<tr>');
                tr.append(`<th>${contact.firstName}</th><th>${contact.surName}</th><th>${contact.address}</th><th>${contact.phoneNumber}</th><th>${contact.creator}</th>`);
                if(contact._acl.creator === sessionStorage.getItem('userId')){
                tr.append(   $(`<a href="#">[Edit]</a>`).on('click', function () {
                showEditView(contact);
                })).append(
                    $(`<a href="#">[Delete]</a>`).on('click', function () {
                        deleteContact(contact);
                    })
)                }
               cat.append(tr);
            }
            showView('viewHome');
            console.log(res);
        }).catch(handleAjaxError);
    }
}
    function logoutUser() {
    sessionStorage.clear();
    showHideMenuLinks();
    showHomeView();
    showInfo('Logout successful.');
}

function signInUser(res, message) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);
    showHomeView();
    showHideMenuLinks();
    showInfo(message);
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg);
}