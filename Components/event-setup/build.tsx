'use client';
import Card from './buildCard';
import { initialRegistrationFields, RegistrationField } from '../../types/attendeeReg';
import React, { useState } from 'react';

type NewFieldState = Omit<RegistrationField, 'id'>;

const initialNewFieldData: NewFieldState = {
  fieldLabel: '',
  dataType: 'text',
  isRequired: false,
  isActive: true,
};

export default function Build() {

  const [fields, setFields] = useState<RegistrationField[]>(initialRegistrationFields);
  
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [newFieldData, setNewFieldData] = useState<NewFieldState>(initialNewFieldData);


  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    

    const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setNewFieldData(prevData => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  

  const handleOpenModal = () => {
    setNewFieldData(initialNewFieldData);
    setIsModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleAddField = () => {
    if (!newFieldData.fieldLabel.trim()) {

      console.error("Field Label cannot be empty.");
      return;
    }

    const newField: RegistrationField = {
      ...newFieldData,
      id: `field-${Date.now()}`, 
    };

    setFields(prevFields => [...prevFields, newField]);
    handleCloseModal(); 
  };
  return (
    <div className="build">
        <p><span>Step 2:</span> Build registration workflows.</p>
        <div className="wrapper-build">
            {fields.map(field => (
          <Card key={field.id} field={field} />
        ))}
            <div className="card-box add-new" onClick={handleOpenModal}>
              <div className="reg-addon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#5C00DC"/>
                </svg>
                <p className="small">Add Registration Workflow</p>
              </div>
            </div>
        </div>
        {isModalOpen && (
        <div className='modal-background' >
          <div className="modal-wrapper">
            <div className="modal-body">
              <h3>Add New Registration Field</h3>
              
              <div className="modal-form">
                <div className='form-row'>
                  <label className="label-name">Field Label</label>
                  <input
                    type="text"
                    name="fieldLabel"
                    value={newFieldData.fieldLabel}
                    onChange={handleNewFieldChange}
                    placeholder="e.g., Job Title"
                    className="text-name"
                  />
                </div>


                <div className='form-row'>
                  <label className="label-data">Data Type</label>
                  <select
                    name="dataType"
                    value={newFieldData.dataType}
                    onChange={handleNewFieldChange}
                    className="options"
                  >
                    <option value="text">Text (Short Answer)</option>
                    <option value="number">Number</option>
                    <option value="email">Email Address</option>
                    <option value="select">Select (Dropdown/Radio)</option>
                    <option value="checkbox">Checkbox (Boolean)</option>
                  </select>
                </div>


                <div className="check-wrapper">
                  <input
                    type="checkbox"
                    id="isRequired"
                    name="isRequired"
                    checked={newFieldData.isRequired}
                    onChange={handleNewFieldChange}
                    className="check-required"
                  />
                  <label htmlFor="isRequired" className="check-label">
                    Required Field 
                  </label>
                </div>

                
                <div className="check-wrapper">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={newFieldData.isActive}
                    onChange={handleNewFieldChange}
                    className="checkit"
                  />
                  <label htmlFor="isActive" className="check-label">
                    Active 
                  </label>
                </div>
              </div>


              <div className="modal-buttons">
                <button onClick={handleCloseModal} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleAddField} className="btn save-btn">
                  Save Field
                </button>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
