import React, { useState } from 'react';
import { convertToMinutes, formatRepeatTime } from '../../utils/timeUtils';

export default function RepeatTimeDropdownColumn({ task, setTask }) {
  const [value, setValue] = useState(formatRepeatTime(task.repeat).split(' ')[0]);

  const options = [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
      { value: "custom", label: "Custom" },
  ];

  const handleChangeValue = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      // Determine the current unit based on the existing repeat value
      const unit = formatRepeatTime(task.repeat).split(' ')[1];

      // Convert the new value to minutes using the existing unit
      setTask({
          ...task,
          repeat: convertToMinutes(Number(newValue), unit)
      });
  };

  const handleChange = (e) => {
      const newUnit = e.target.value;
      // Convert the existing value to minutes using the new unit
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
              value={formatRepeatTime(task.repeat)}
              onChange={handleChange}
              className="dropdown-theme"
          >
              {options.map(option => (
                  <option value={option.value} key={option.value}>{option.label}</option>
              ))}
          </select>
      </div>
  );
}
