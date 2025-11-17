export interface PortalField {
  id: string;
  fieldLabel: string;
  content: string;
  
}

export const initialPortalFields: PortalField[] = [
  {
    id: 'field-1',
    fieldLabel: 'My Registration',
    content: 'Display registration tier (e.g., VIP Pass, General Admission). Allow them to download or print their digital pass/QR code.'
  },
  {
    id: 'field-2',
    fieldLabel: 'Build My Schedule',
    content: 'A powerful link to the session catalog and scheduling tool. Should show currently booked sessions, if any.'
  },
  {
    id: 'field-3',
    fieldLabel: 'Housing & Travel',
    content: 'Provide confirmed hotel details if booked, or links to the official booking site and travel guides.'
  },
  {
    id: 'field-4',
    fieldLabel: 'Networking Hub',
    content: 'Access to the attendee directory to find peers, speakers, or sponsors, and schedule 1:1 meetings.'
  },
  {
    id: 'field-5',
    fieldLabel: 'FAQ/Support',
    content: 'Quick access to the help documentation, support contacts, or a chatbot.'
  },
];
