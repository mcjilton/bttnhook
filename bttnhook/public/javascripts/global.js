// Eventlist data array for filling in info box
var eventListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the event table on initial page load
    populateTable();

    // Event link click
    $('#eventList table tbody').on('click', 'td a.linkshowevent', showEventInfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/bttn/bttndata', function( data ) {

        // Stick our event data array into an eventlist variable in the global object
        eventListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowevent" rel="' + this._id + '">' + this.bttn_name + '</a></td>';
            tableContent += '<td>' + this.user + '</td>';
            tableContent += '<td>' + this.date + '</td>';
            tableContent += '<td>' + this.time + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#eventList table tbody').html(tableContent);
    });
};

// Show Event Info
function showEventInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisEventID = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = eventListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisEventID);

    // Get our User Object
    var thisEventObject = eventListData[arrayPosition];

    //Populate Info Box
    $('#eventbttnId').text(thisEventObject.bttn_id);
    $('#eventbttnName').text(thisEventObject.bttn_name);
    $('#eventUser').text(thisEventObject.user);
    $('#eventDate').text(thisEventObject.date);
    $('#eventTime').text(thisEventObject.time);
    $('#eventLocation').text(thisEventObject.location);

};

