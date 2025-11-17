
'use client';

import React, { useState } from 'react';
import { BaseSettingsData, EventFormat } from '../../types/event';

export default function Base() {
  const [baseSettings, setBaseSettings] = useState<BaseSettingsData>({
    eventFormat: 'In-Person', 
    capacityLimit: null,
    primaryLanguage: 'English',
    registrationStartTime: '',
    registrationEndTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    

    const updatedValue = name === 'capacityLimit' ? (value ? parseInt(value) : null) : value;

    setBaseSettings(prevSettings => ({
      ...prevSettings,
      [name]: updatedValue,
    }));
  };


  const handleSave = () => {
    console.log('Saving Base Settings:', baseSettings);

  };


  return (
    <div className="base-settings">
      <p><span>Step 1:</span> Base settings.</p>
      <div className="wrapper-base">

        <div className="box">
          <h6>Event Format</h6>
          <div className="box-text">Select the format (e.g., In-Person, Virtual, Hybrid).</div>
          <select
            name="eventFormat"
            value={baseSettings.eventFormat}
            onChange={handleChange}
          >
            <option value="In-Person">In-Person</option>
            <option value="Virtual">Virtual</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="box">
          <h6>Attendance Limit</h6>
          <div className="box-text">Set a maximum number of attendees for planning.</div>
          <input
            type="number"
            name="capacityLimit"
            value={baseSettings.capacityLimit === null ? '' : baseSettings.capacityLimit}
            onChange={handleChange}
            placeholder="e.g., 5000"
            min="1"
          />
        </div>

        <div className="box">
          <h6>Primary Language</h6>
          <div className="box-text">Default language for all system-generated text.</div>
          <select
            name="primaryLanguage"
            value={baseSettings.primaryLanguage}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        <div className="box">
          <h6>Registration Start</h6>
          <div className="box-text">The date and time registration opens.</div>
          <input
            type="datetime-local"
            name="registrationStartTime"
            value={baseSettings.registrationStartTime}
            onChange={handleChange}
          />
        </div>
        
        <div className="box">
          <h6>Registration End</h6>
          <div className="box-text">The date and time registration closes.</div>
          <input
            type="datetime-local"
            name="registrationEndTime"
            value={baseSettings.registrationEndTime}
            onChange={handleChange}
          />
        </div>

        <div className='base-save'>
        <button onClick={handleSave}>Save Base Settings</button>
        </div>

    </div>
      
      
    </div>
  );
}
