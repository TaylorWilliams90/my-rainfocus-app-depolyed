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
        
        const validatedFields = Array.isArray(parsed) 
          ? parsed.map(f => ({ ...f, isActive: !!f.isActive }))
          : initialPortalFields; 
        
        return validatedFields;
      } catch (e) {
        console.error("Error parsing portal fields from localStorage, falling back to initial:", e);
        return initialPortalFields;
      }
    }
  }
  
  return null;
};

export default function Design() {
  const [fields, setFields] = useState<PortalField[]>(initialPortalFields);
  const [isLoaded, setIsLoaded] = useState(false);
useEffect(() => {
    const loadedData = loadFields();
    if (loadedData) {
        setFields(loadedData);
    }
    
    setIsLoaded(true); 
  }, []); 

  useEffect(() => {
    if (isLoaded) { 
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fields));
    }
  }, [fields, isLoaded]);


   const handleToggle = (id: string, newIsActive: boolean) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, isActive: newIsActive } : field
      )
    );
  };

  if (!isLoaded) {
      // Show a temporary loading state until localStorage check is complete
      return <p>Loading preferences...</p>;
  }

    if (fields === null) {
    return null; 
  }

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

