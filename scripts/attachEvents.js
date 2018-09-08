function attachAllEvents() {
    $("#linkHome").on('click', showHomeView);
    $("#linkLogin").on('click', showLoginView);
    $("#linkRegister").on('click', showRegisterView);
    $("#linkCreateNew").on('click', showCreateNewView);
    $("#linkLogout").on('click', logoutUser);

    $("#formLogin").on('submit', loginUser);
    $("#formRegister").on('submit', registerUser);
    $("#formCreateNew").on('submit', createNew);
    $("#formEdit").on('submit',postEdit);

    $("form").on('submit', function (event) {
        event.preventDefault()
    });

    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show();
        },
        ajaxStop: function () {
            $("#loadingBox").hide();
        }
    });
    $("#infoBox, #errorBox").on('click', function() {
        $(this).fadeOut();
    });
}