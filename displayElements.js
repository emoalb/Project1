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
    } else { // We have logged in user
        $("#linkLogin").hide();
        $("#linkRegister").hide();
        $("#linkCreateBook").show();
        $("#linkCreateNew").show();
        $("#linkLogout").show();
        $('#loggedInUser').text("Welcome, " + sessionStorage.getItem('username') + "!")
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
    showView('viewHome');
}

function showLoginView() {
    showView('viewLogin');
    $('#formLogin').trigger('reset');
}

function showRegisterView() {
    $('#formRegister').trigger('reset');
    showView('viewRegister')
}

function showCreateNewView() {
    $('#formCreateNew').trigger('reset');
    showView('viewCreateNew')
}