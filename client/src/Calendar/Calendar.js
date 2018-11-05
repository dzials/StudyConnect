import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';


// TODO - have this component source from redux
$(function() {

	// page is now ready, initialize the calendar...

	$('#calendar').fullCalendar({

		// weekends: false // will hide Saturdays and Sundays
	})
});


export default class Calendar extends Component {

  render() {
    return (
		<div id='calendar'></div>
    )
  }
}
