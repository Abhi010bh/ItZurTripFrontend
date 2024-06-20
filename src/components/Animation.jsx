import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useState} from "react";

function Animate({ onChangeDate }) {
  const [value, setValue] = useState(null);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    onChangeDate(newValue); 
  };


  return (
    
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
    
  );
}

export default Animate;