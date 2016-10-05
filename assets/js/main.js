$(function() {

    // focus/blur functionality
    checkInput();

    // submit form
    $('.js-submit-form').on('submit', function(e) {
        e.preventDefault();

        // hide all content
        $('.js-show-bcrumb').addClass('is-hidden');
        $('[class*=" js-content-"]').addClass('is-hidden');

        // show loading graphic
        $('.js-content-loading').removeClass('is-hidden');

        // capture the username
        var enteredUser = $('.js-entered-user').val();

        // lookup user's data
        userLookup(enteredUser);
    });

});