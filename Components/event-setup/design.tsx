'use client';
import Card from './designCard';
import React, { useState } from 'react';
import { initialPortalFields, PortalField } from '../../types/attendeePortal'; 


export default function Design() {
  const [fields, setFields] = useState<PortalField[]>(initialPortalFields)
  return (
    <div className="design">
        <p><span>Step 3:</span> Design post-registration experiences.</p>
        <div className="wrapper-design">
            {fields.map(field => (
              <Card key={field.id} field={field} />
            ))}
            
        </div>
    </div>
  );
}
