// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// let activities = JSON.parse(localStorage.getItem(storedSchedule))
var activities;
console.log(activities);
if (localStorage.getItem("storedSchedule") === null) {
  activities = [];
} else {
  activities = JSON.parse(localStorage.getItem("storedSchedule"));
  console.log(activities);
}

$(function () {
  var hrs = 8;
  var curHr = dayjs().hour();
  const contEL = $('#container')


  // TODO: Add code to display the current date in the header of the page.

  setInterval(function () {
    let timeNow = dayjs().format('ddd MMM DD YY HH:mm:ss a');
    $("#currentDay").text(timeNow);
  }, 1000);
  //TODO:Create a function to dynamically generate standard business hr blocks
  //"standard hours" 9-5
  for (let i = 0; i <= hrs; i++) {
    var h = i + 9;
    createHrBlock(h)
  }
  function createHrBlock(h) {

    const hourContainer = $("<div>");
    hourContainer.addClass('row time-block');
    hourContainer.attr('id', h);
    contEL.append(hourContainer);
    const blockTitleDiv = $('<div>');
    blockTitleDiv.addClass('col-2 col-md-1 hour text-center py-3');
    blockTitleDiv.text(h + ":00");
    const txtArea = $('<textarea>');
    txtArea.addClass('col-8 col-md-10 description');
    txtArea.attr('rows', "3");
    txtArea.attr('id', h + "-txt")
    const svBtn = $("<button>");
    svBtn.addClass("btn saveBtn col-2 col-md-1");
    svBtn.attr('aria-label', 'save');
    hourContainer.append(blockTitleDiv, txtArea, svBtn);
    const iBlock = $('<i>');
    iBlock.addClass("fas fa-save");
    iBlock.attr('aria-hidden', 'true');
    svBtn.append(iBlock);
    applyTime(h)
    getActivities(h);

  }
  // localStorage.clear()
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  contEL.on('click', '.saveBtn', function (event) {
    const parID = $(this).parent().attr('id');
    var idEL = $('#' + parID);
    // console.log(parID);
    var txtA = (idEL.children().eq(1).val());
    const activ = {
      time: parID,
      evt: txtA
    }
    activities[parID - 9] = activ;
    localStorage.setItem("storedSchedule", JSON.stringify(activities));
    console.log(txtA);
    //send entered text to local storage from id.textarea
    // console.log(idEL.children());

  })
  // TODO: Add code to apply the past, present, or future class to each time
  function applyTime(h) {
    if (h < curHr && h > 8) {
      $("#" + h).addClass('past');
    } else if (h === curHr) {
      $("#" + h).addClass('present');
    } else {
      $("#" + h).addClass('future');
    }

  }

  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //



  function getActivities(k) {
    // activities = JSON.parse(localStorage.getItem("storedSchedule"))
    if (activities.length === 0) {
      console.log("No activities yet");
    } else if(activities[k]!== null) {
      var cur = $("#" + k - 9 + "-txt")
      console.log(cur);
      console.log(k - 9);
    }else {
      

    }

  }

});
