import React, { useState } from 'react';
import { convertToMinutes, formatRepeatTime } from '../../utils/timeUtils';

export default function RepeatTaskTimeControl({ task, setTask }) {
  const repeatString = formatRepeatTime(task.repeat);
  const [value, setValue] = useState(repeatString.split(' ')[0]);
  const [unit, setUnit] = useState(repeatString.split(' ')[1]); // Add unit state

  const options = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  const handleChangeValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setTask({
      ...task,
      repeat: convertToMinutes(Number(newValue), unit)
    });
  };

  const handleChangeUnit = (e) => { // Rename the function
    const newUnit = e.target.value;
    setUnit(newUnit); // Update the unit state
    setTask({
      ...task,
      repeat: convertToMinutes(Number(value), newUnit)
    });
  };

  return (
    <div className="input-group">
      <input
        className="input-theme"
        type="text"
        value={value}
        onChange={handleChangeValue}
      />
      <select
        value={unit} // Set the value to the unit state
        onChange={handleChangeUnit} // Use the renamed function
        className="dropdown-theme"
      >
        {options.map(option => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
