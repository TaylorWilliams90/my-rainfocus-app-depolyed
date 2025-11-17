import React from 'react';

export default function Header() {
  return (
    <nav>
        <div className="top-nav">
            <div className="logo">
                <img src="/img/Small.png" alt="rainFocus Icon" />   
            </div>
            <div className="event-logo">
                <img src="/img/Icon.png" alt="Event Icon" />
            </div>
        </div>
        <div className="bottom-nav">
            <div className="user-circle">
                FL
            </div>
        </div>
    </nav>
  );
}