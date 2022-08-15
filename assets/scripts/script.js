var today = moment(new Date()).format('dddd, MMMM MM, YYYY');
$(document).ready(function() {
    $('#currentDay').text(today)
});

function currentTime() {
    let thisHour = parseInt(moment(new Date()).format('H'));
    $('.row').each(function() {
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

$('.description').click(function() {
    let thisTask = $('p', this);
    let taskText = thisTask.text().trim();
    if(taskText.length > 0) {
        let textInput = $('<input>').addClass('form-control').val(taskText);
        thisTask.replaceWith(textInput);
    } else {
        let textInput = $('<input>').addClass('form-control').val(taskText).attr('placeholder', 'Enter your tasks here!');
        thisTask.replaceWith(textInput);
    }
});

$('.row').on('mouseleave', 'input', function() {
    let thisTask = $(':nth-child(2) input');
    let userTask = thisTask.val();
    let pElement = $('<p>').text(userTask);
    thisTask.replaceWith(pElement);
});

$('.saveBtn').click(function() {
    let parentHour = $(this).parent().data('hour');
    let thisArray = "_" + parentHour;
    let arrayContent = $(this).siblings('div').find('p').text().trim();
    let newArray = eval(thisArray + "=[\"" + arrayContent + "\"];");
    localStorage.setItem("\"" + thisArray + "\"", JSON.stringify(newArray));
});

function fromLocalStorage() {
    $('.row').each(function(i) {
        let rowHour = $(this).data('hour');
        let newArrayName = "_" + rowHour;
        let localStorageObj = localStorage.getItem("\"" + newArrayName + "\"");
        let objText = JSON.parse(localStorageObj);
        $(this).find('p').text(objText);
    })
};

$('#eraseBtn').click(function() {
    if(window.confirm('Erase all tasks?')) {
        localStorage.clear()
        fromLocalStorage();
    }
})

currentTime();
fromLocalStorage();
