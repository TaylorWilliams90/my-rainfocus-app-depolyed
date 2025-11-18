
'use client';

import React, { useState, useEffect } from 'react';
import { BaseSettingsData, EventFormat } from '../../types/event';

const LOCAL_STORAGE_KEY = 'eventSetup_BaseSettings';

const loadSettings = (): BaseSettingsData => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return {
    eventFormat: 'In-Person' as EventFormat,
    capacityLimit: null,
    primaryLanguage: 'English',
    registrationStartTime: '',
    registrationEndTime: '',
  };
};

export default function Base() {
  const [baseSettings, setBaseSettings] = useState<BaseSettingsData>(loadSettings);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(baseSettings));
    // Clear any previous message after a short delay
    const timer = setTimeout(() => setSaveMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [baseSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    

    let updatedValue: string | number | null = value;
    
    if (name === 'capacityLimit') {
      updatedValue = value ? parseInt(value) : null;
    }

    setBaseSettings(prevSettings => ({
      ...prevSettings,
      [name]: updatedValue,
    }));
  };


  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
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
        {saveMessage && <p>{saveMessage}</p>}
        </div>

    </div>
      
      
    </div>
  );
}
