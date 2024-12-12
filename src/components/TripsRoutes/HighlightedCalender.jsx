import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { Dayjs } from 'dayjs';

function HighlightedCalendar({  highlightedDates }) {
  const [value, setValue] = useState(null);


  // Custom function to render highlighted dates
  const renderDay = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const isHighlighted = highlightedDates.some(
      (highlightedDate) => date.isSame(highlightedDate, 'day')
    );

    if (isHighlighted) {
      return React.cloneElement(dayComponent, {
        style: { backgroundColor: '#ffeb3b', color: 'black' }, // Example highlight style
      });
    }
    return dayComponent;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        renderDay={renderDay}  // This will highlight the dates
         // Disable date selection
       // Optional, if you want to prevent editing but still show the picker
        openTo="day" // Optional to always show the calendar in day view
      />
    </LocalizationProvider>
  );
}

export default HighlightedCalendar;
