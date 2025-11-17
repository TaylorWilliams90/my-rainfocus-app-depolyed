export type EventFormat = 'In-Person' | 'Virtual' | 'Hybrid';


export interface BaseSettingsData {
  eventFormat: EventFormat;
  capacityLimit: number | null; 
  primaryLanguage: string;
  registrationStartTime: string; 
  registrationEndTime: string;   
}