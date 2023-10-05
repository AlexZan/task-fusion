import React, { useState } from 'react';
// import { convertToMinutes, formatRepeatTime } from '../../utils/timeUtils';

export default function RepeatTaskTimeDropDown({ task, onTimeChange, onUnitChange }) {
  const [value, setValue] = useState(task.value ?? '1');
  const [unit, setUnit] = useState(task.unit ?? 'day');

  const options = [
    { value: "minute", label: "Minute" },
    { value: "hour", label: "Hour" },
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  const handleTimeChange = (e) => {
    // Ensure value is a number before informing parent
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue); // Update local state
      onTimeChange(newValue); // Inform parent about change
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value); // Update local state
    onUnitChange(e.target.value); // Inform parent about change
  };

  return (
    <div className="input-group">
      <input
        className="input-theme"
        type="number"
        value={value}
        onChange={handleTimeChange}
        min={1} // Consider appropriate minimum
      />
      <select
        value={unit}
        onChange={handleUnitChange}
        className="dropdown-theme"
      >
        {options.map(option => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

