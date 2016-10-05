function checkInput() {
    $('.js-entered-user').on('focus paste', function() {
        // focus on field
        if (!$(this).parent().hasClass('is-focused')) {
            $(this).parent().addClass('is-focused');
        }

        // show clear icon
        $(this).next().removeClass('is-hidden');
    }).on('blur', function() {
        // unfocus field
        $(this).parent().removeClass('is-focused');

        // clear input
        $('.js-clear-input-btn').on('click',function() {
            $('.js-entered-user').val("");      // clear value out
            $(this).addClass('is-hidden');
        });
    });
}

function showProperContent(type) {

    if (type == 'data') var otherType = 'repos';
    else if (type == 'repos') var otherType = 'data';

    // current section should be active
    $('.js-crumb-'+type).removeClass('is-hidden').addClass('is-active');
    $('.js-content-'+type).removeClass('is-hidden');

    // other section should be hidden
    $('.js-crumb-'+otherType).removeClass('is-active').addClass('is-hidden');
    $('.js-content-'+otherType).addClass('is-hidden');

    $('.js-show-bcrumb').removeClass('is-hidden');

}

function cleanDate(date) {
    var d = new Date(date).toUTCString();
    d = $.trim(d.split(' ').slice(0,4).join(' ').split(',')[1]);    // remove hours & day of week

    var separate = d.split(' ');

    var day = separate[0];
    var month = separate[1];
    var year = separate[2];

    return month + " " + day + ", " + year;
}

function setActivePage(pageNum) {
    // remove is-active from all page links
    $('.js-page-click').each(function() {
        $(this).removeClass('is-active');
    });

    // add is-active to appropriate page link
    $('[data-page='+pageNum+']').addClass('is-active');
}

function openCloseSection(el) {
    if (el.next().hasClass('is-hidden')) {
        // open
        el.next().removeClass('is-hidden');
        el.find('.glyphicon-chevron-right').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
    } else {
        // close
        el.next().addClass('is-hidden');
        el.find('.glyphicon-chevron-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
    }
}

function hideComments(id) {
    $('.js-hide-commits').on('click', function() {
        $(this).parent().parent().addClass('is-hidden');
        $('.js-commit-btn-'+id).removeClass('is-hidden');
    });
}