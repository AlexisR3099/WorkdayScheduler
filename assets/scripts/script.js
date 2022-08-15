var today = moment(new Date()).format('dddd, MMMM MM, YYYY');
$(document).ready(function() {
    $('#currentDay').text(today)
});