import React from 'react'
import { RegistrationField } from '../../types/attendeeReg'; 
interface CardProps {
  field: RegistrationField;
}

const BuildCard: React.FC<CardProps> = ({ field }) => {
  return (
    <div className="card-box">
      <div className="reg-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.5 14.5L13.5 20.5L12.08 19.08L15.67 15.5H4.5V3.5H6.5V13.5H15.67L12.08 9.92L13.5 8.5L19.5 14.5Z" fill="#5C00DC"/>
        </svg>
        <h5>{field.fieldLabel}</h5>
      </div>
      <div className="reg-info">
        Type: **{field.dataType}** {field.isRequired && <span style={{ marginLeft: '10px', color: '#E71356' }}> (Required)</span>}
        <br />
        Status: {field.isActive ? 'Active' : 'Disabled'}
      </div>
    </div>
  )
}

export default BuildCard
