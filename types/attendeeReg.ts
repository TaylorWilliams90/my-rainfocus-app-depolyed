export interface RegistrationField {
  id: string;
  fieldLabel: string;
  dataType: 'text' | 'number' | 'email' | 'select' | 'checkbox';
  isRequired: boolean;
  isActive: boolean;
}

export const initialRegistrationFields: RegistrationField[] = [
  {
    id: 'field-1',
    fieldLabel: 'First Name',
    dataType: 'text',
    isRequired: true,
    isActive: true,
  },
  {
    id: 'field-2',
    fieldLabel: 'Last Name',
    dataType: 'text',
    isRequired: true,
    isActive: true,
  },
  {
    id: 'field-3',
    fieldLabel: 'Email',
    dataType: 'email',
    isRequired: true,
    isActive: true,
  },
];

export const newFieldTemplate: Omit<RegistrationField, 'id'> = {
  fieldLabel: 'New Custom Field',
  dataType: 'text',
  isRequired: false,
  isActive: true,
};