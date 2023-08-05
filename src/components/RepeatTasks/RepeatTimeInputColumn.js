import React, { useState } from 'react';
import { formatRepeatTime, convertToMinutes } from '../../utils/timeUtils';

export default function RepeatTimeInputColumn({ task, setTask }) {
    const [value, setValue] = useState(formatRepeatTime(task.repeat).split(" ")[0]);
    const [unit, setUnit] = useState(formatRepeatTime(task.repeat).split(" ")[1]);
  
    const handleValueChange = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      setTask({
        ...task,
        repeat: convertToMinutes(Number(newValue), unit)
      });
    };
  
    const handleUnitChange = (e) => {
      const newUnit = e.target.value;
      setUnit(newUnit);
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
          onChange={handleValueChange}
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="dropdown-theme"
        >
          <option value="minute">Minutes</option>
          <option value="hour">Hours</option>
          <option value="day">Days</option>
          <option value="week">Weeks</option>
          <option value="month">Months</option>
          <option value="year">Years</option>
        </select>
      </div>
    );
  }