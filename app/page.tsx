'use client'

import React, { useState } from 'react';
import Base from '../Components/event-setup/base';
import Build from '../Components/event-setup/build';
import Design from '../Components/event-setup/design';

const STEPS = [
  { name: 'Base Setup', Component: Base },
  { name: 'Build Configuration', Component: Build },
  { name: 'Design Customization', Component: Design },
];

interface EventInfo {
    name: string;
    date: string;
    location: string;
}

const initialEventInfo: EventInfo = {
    name: "RainFocus Summit",
    date: "December 15th",
    location: "Lehi, Utah",
};

export default function Home() {

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [eventInfo, setEventInfo] = useState<EventInfo>(initialEventInfo);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempEventInfo, setTempEventInfo] = useState<EventInfo>(initialEventInfo);

  const CurrentComponent = STEPS[currentStepIndex].Component;
  const hasPreviousStep = currentStepIndex > 0;
  const hasNextStep = currentStepIndex < STEPS.length - 1;

  const handleNext = () => {
    if (hasNextStep) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    }
    else {
      alert("Setup complete!");
    }
  };
  const handlePrevious = () => {
    if (hasPreviousStep) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

   const openEditModal = () => {
    setTempEventInfo(eventInfo); // Load current data into temp state for editing
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempEventInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEventInfo = () => {
    if (!tempEventInfo.name || !tempEventInfo.date || !tempEventInfo.location) {
        console.error("All fields must be filled out.");
        return;
    }
    setEventInfo(tempEventInfo); 
    closeEditModal();
  };

  return (
    <div className="wrapper-layout">
      <div className="event-info-header">
        <div className="left-info">
          <img src="/img/Logo.png" alt="Event Logo" />
          <div className="event-details">
            <h1>{eventInfo.name}</h1>
            <p>
                {eventInfo.date} <br/>
                {eventInfo.location}
            </p>
          </div>
        </div>
        <div className="right-info">
          <button onClick={openEditModal}>Edit info</button>
        </div>
      </div>
      <div className="event-dis">
      <h2>Event setup guide</h2>
      <p>See the available list of modules below. We suggest that you start with the attendee module.</p>
      </div>
      <div className="attendee-wapper">
        <div className="top-bar"></div>
        <div className="attendee-header">
          <div className="attendee-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <g clipPath="url(#clip0_13517_223)">
                <path d="M16.46 13.14C17.8685 12.4331 18.9973 11.2715 19.6636 9.84331C20.3299 8.41512 20.4948 6.80387 20.1315 5.27033C19.7683 3.73679 18.8982 2.3707 17.662 1.39314C16.4259 0.415586 14.896 -0.116226 13.32 -0.116226C11.744 -0.116226 10.2142 0.415586 8.97802 1.39314C7.74186 2.3707 6.87175 3.73679 6.5085 5.27033C6.14525 6.80387 6.31012 8.41512 6.97643 9.84331C7.64274 11.2715 8.77149 12.4331 10.18 13.14C7.18854 13.9979 4.56621 15.824 2.72398 18.3322C0.881742 20.8404 -0.0762889 23.8889 1.82521e-05 27H26.64C26.7163 23.8889 25.7583 20.8404 23.9161 18.3322C22.0738 15.824 19.4515 13.9979 16.46 13.14Z" fill="#E71356"/>
                <path d="M24.13 35C30.1333 35 35 30.1333 35 24.13C35 18.1267 30.1333 13.26 24.13 13.26C18.1267 13.26 13.26 18.1267 13.26 24.13C13.26 30.1333 18.1267 35 24.13 35Z" fill="#AB99FF"/>
                <path d="M19.45 14.34C17.1463 15.4283 15.3011 17.2954 14.2399 19.6117C13.1787 21.928 12.9698 24.5447 13.65 27H26.65C26.6898 24.4391 26.043 21.9143 24.7768 19.6879C23.5107 17.4615 21.6713 15.6149 19.45 14.34Z" fill="#5C00DC"/>
              </g>
              <defs>
                <clipPath id="clip0_13517_223">
                  <rect width="35" height="35" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h3>Attendee</h3>
        </div>
        <CurrentComponent />
        <div className="component-navigation">
        {hasPreviousStep && (
            <button onClick={handlePrevious} style={{ marginRight: '10px' }}>
              {'<'} Previous Step ({STEPS[currentStepIndex - 1].name})
            </button>
          )}
          {hasNextStep ? (
            <button onClick={handleNext}>
              Next Step ({STEPS[currentStepIndex + 1].name})
            </button>
          ) : (
            <button disabled>
              Finish Setup
            </button>
          )}
        </div>
      </div>
      {isEditModalOpen && (
        <div className='modal-background ' >
          <div className="modal-wrapper">
            <div className="modal-body">
              <h3>Edit Event Details</h3>
              
              <div className='modal-form'>
                <div className='form-row'>
                  <label>Event Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tempEventInfo.name}
                    onChange={handleEditChange}
                    placeholder="e.g., RainFocus Annual Summit"
                  />
                </div>
                <div className='form-row'>
                  <label>Event Date</label>
                  <input
                    type="text"
                    name="date"
                    value={tempEventInfo.date}
                    onChange={handleEditChange}
                    placeholder="e.g., December 15th - 17th"
                  />
                </div>
                <div className='form-row'>
                  <label>Event Location</label>
                  <input
                    type="text"
                    name="location"
                    value={tempEventInfo.location}
                    onChange={handleEditChange}
                    placeholder="e.g., Lehi, Utah (Virtual/Hybrid)"
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button onClick={closeEditModal}>
                  Cancel
                </button>
                <button onClick={saveEventInfo}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
