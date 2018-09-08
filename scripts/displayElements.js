function showView(viewName)
{
    $('.container > section').hide(); // Hide all views
    $('#infoBox,#errorBox,#loadingBox').hide();
    $('#' + viewName).show() // Show the selected view only
}
function showHideMenuLinks() {
    $("#linkHome").show();
    if (sessionStorage.getItem('authToken') === null) { // No logged in user
        $("#linkLogin").show();
        $("#linkRegister").show();
        $("#linkCreateNew").hide();
        $("#linkLogout").hide();
        $('#loggedInUser').text('')
    } else {
        let lowerCaseValidator = /[a-z]/;
        // We have logged in user
        let userName = sessionStorage.getItem('username');
        if(lowerCaseValidator.test(userName[0])){
        userName=userName[0].toUpperCase()+userName.slice(1);
        }
        $("#linkLogin").hide();
        $("#linkRegister").hide();
        $("#linkCreateBook").show();
        $("#linkCreateNew").show();
        $("#linkLogout").show();
        $('#loggedInUser').text("Welcome, " + userName + "!")
    }
}

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.show();
    setTimeout(function() {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.text("Error: " + errorMsg);
    errorBox.show();
    setTimeout(function() {
        $('#errorBox').fadeOut()
    }, 3000)
}

function showHomeView() {
    getAll();
}

function showLoginView() {
    showView('viewLogin');
    $('#formLogin').trigger('reset');
}

function showRegisterView() {

    showView('viewRegister')
}

function showCreateNewView() {
    $('#formCreateNew').trigger('reset');
    showView('viewCreateNew')
}
function showEditView(contact) {
    $('#formEdit').trigger('reset');
    $('#addressInputEdit').val(contact.address);
    $('#firstNameInputEdit').val(contact.firstName);
    $('#surNameInputEdit').val(contact.surName);
    $('#phoneNumberInputEdit').val(contact.phoneNumber);
    $('#idEdit').val(contact._id);
    showView('viewEdit');
}