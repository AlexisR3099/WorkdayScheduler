var today = moment(new Date()).format('dddd, MMMM MM, YYYY');
$(document).ready(function() {
    $('#currentDay').text(today)
});

function currentTime() {
    let thisHour = parseInt(moment(new Date()).format('H'));
    $('row').each(function() {
        let rowHour = $(this).data('hour');
        if(thisHour > rowHour) {
            $(':nth-child(2)', this).toggleClass('past');
        }
        else if(thisHour === rowHour) {
            $(':nth-child(2)', this).toggleClass('present');
        }
        else if(thisHour < rowHour) {
            $(':nth-child(2)', this).toggleClass('future');
        }
    })
}

currentTime();