// NAVBAR EVENT
$('#check').change(function() {
    if ($('#check').prop('checked')) {
        $('.user-dropdown').removeClass('top-up');
        $('.user-dropdown').addClass('top-down');

    } else {
        $('.user-dropdown').removeClass('top-down');
        $('.user-dropdown').addClass('top-up');
    }
});

$('#check-left').change(function() {
    if ($('#check-left').prop('checked')) {
        $('.body-left').addClass('left-up');
        $('.body-left').removeClass('left-down');
        $('.body-right').removeClass('xl-right');
        $('.body-right').addClass('md-right');
    } else {
        $('.body-left').removeClass('left-up');
        $('.body-left').addClass('left-down');
        $('.body-right').removeClass('md-right');
        $('.body-right').addClass('xl-right');
        $('.note').addClass('invis');
    }
});