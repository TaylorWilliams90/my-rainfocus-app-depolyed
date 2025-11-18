'use client';
import Card from './designCard';
import React, { useState, useEffect } from 'react';
import { initialPortalFields, PortalField } from '../../types/attendeePortal'; 

const LOCAL_STORAGE_KEY = 'eventSetup_PortalFields';

const loadFields = (): PortalField[] | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure that every field in the parsed array has an 'isActive' property set to a boolean.
        const validatedFields = Array.isArray(parsed) 
          ? parsed.map(f => ({ ...f, isActive: !!f.isActive }))
          : initialPortalFields; // Fallback to initial fields if not an array
        
        return validatedFields;
      } catch (e) {
        console.error("Error parsing portal fields from localStorage, falling back to initial:", e);
        return initialPortalFields;
      }
    }
  }
  // Return null initially if no data saved, will be handled by useEffect.
  return null;
};

export default function Design() {
  const [fields, setFields] = useState<PortalField[]>(loadFields);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fields));
  }, [fields]);


   const handleToggle = (id: string, newIsActive: boolean) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, isActive: newIsActive } : field
      )
    );
  };

  return (
    <div className="design">
        <p><span>Step 3:</span> Design post-registration experiences.</p>
        <div className="wrapper-design">
            {fields.map(field => (
              <Card key={field.id} 
                field={field} 
                onToggle={handleToggle} />
            ))}
            
        </div>
    </div>
  );
}
