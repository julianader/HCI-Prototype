/** 
 * Comprehensive error messages for HCI study 
 * Includes apologetic, neutral, and non-apologetic messages 
 * Mixed with realistic and unrealistic scenarios 
 */ 
 
export type ErrorType = 'apologetic' | 'neutral' | 'non-apologetic'; 
export type ErrorCategory = 'validation' | 'system' | 'network' | 'unrealistic'; 
 
export interface ErrorMessage { 
  id: string; 
  type: ErrorType; 
  category: ErrorCategory; 
  title: string; 
  message: string; 
  icon: 'alert' | 'warning' | 'error' | 'wifi'; 
  bgColor: string; 
  borderColor: string; 
  textColor: string; 
  isRealistic: boolean; 
  applicableFields: string[] | 'global';
} 
 
// Apologetic Error Messages 
const APOLOGETIC_ERRORS: ErrorMessage[] = [ 
  { 
    id: 'apol-1', 
    type: 'apologetic', 
    category: 'validation', 
    title: 'We Apologize', 
    message: 'We are very sorry, but we encountered an issue validating your email. We apologize for the inconvenience. Please try a different email address.', 
    icon: 'alert', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: true, 
    applicableFields: ['email']
  }, 
  { 
    id: 'apol-2', 
    type: 'apologetic', 
    category: 'system', 
    title: 'Our Apologies', 
    message: 'We sincerely apologize. A database error occurred while processing your registration. We regret any inconvenience this may cause. Please try again in a moment.', 
    icon: 'alert', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'apol-3', 
    type: 'apologetic', 
    category: 'network', 
    title: 'We Apologize', 
    message: 'We are sorry, but our servers are experiencing connectivity issues. We apologize for this disruption. Please check your connection and try again.', 
    icon: 'wifi', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'apol-4', 
    type: 'apologetic', 
    category: 'network', 
    title: 'We Apologize', 
    message: 'We are very sorry, but we lost connection to our server. Please check your internet connection and try again.', 
    icon: 'wifi', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'apol-5', 
    type: 'apologetic', 
    category: 'unrealistic', 
    title: 'We Sincerely Apologize', 
    message: 'We are deeply sorry, but your name must contain exactly 3 parts separated by spaces. We apologize for this unusual requirement. Please adjust your name accordingly.', 
    icon: 'alert', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: false, 
    applicableFields: ['teamName', 'fullName'] // Used in teamName field
  }, 
  { 
    id: 'apol-6', 
    type: 'apologetic', 
    category: 'unrealistic', 
    title: 'We Apologize', 
    message: 'We are very sorry, but your phone number cannot contain the digit 7. We apologize for this limitation. Please provide a different number.', 
    icon: 'alert', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: false, 
    applicableFields: ['phone']
  }, 
  { 
    id: 'apol-7', 
    type: 'apologetic', 
    category: 'validation', 
    title: 'We Apologize', 
    message: 'We are sorry, but the phone number must start with +43 (Austrian country code). We apologize for the confusion.', 
    icon: 'alert', 
    bgColor: 'bg-emerald-50', 
    borderColor: 'border-emerald-300', 
    textColor: 'text-emerald-800', 
    isRealistic: false, 
    applicableFields: ['phone']
  }, 
]; 
 
// Neutral Error Messages 
const NEUTRAL_ERRORS: ErrorMessage[] = [ 
  { 
    id: 'neut-1', 
    type: 'neutral', 
    category: 'validation', 
    title: 'Form Error', 
    message: 'Email validation failed. Please enter a valid email address and try again.', 
    icon: 'warning', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-300', 
    textColor: 'text-slate-800', 
    isRealistic: true, 
    applicableFields: ['email']
  }, 
  { 
    id: 'neut-2', 
    type: 'neutral', 
    category: 'system', 
    title: 'Processing Error', 
    message: 'Form submission failed. Please review your entries and try again.', 
    icon: 'warning', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-300', 
    textColor: 'text-slate-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'neut-3', 
    type: 'neutral', 
    category: 'network', 
    title: 'Network Error', 
    message: 'Unable to connect to the server. Please check your internet connection and try again.', 
    icon: 'wifi', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-300', 
    textColor: 'text-slate-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'neut-4', 
    type: 'neutral', 
    category: 'unrealistic', 
    title: 'Validation Error', 
    message: 'Phone number must be between 8 and 12 digits. Current input does not meet this requirement.', 
    icon: 'warning', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-300', 
    textColor: 'text-slate-800', 
    isRealistic: false, 
    applicableFields: ['phone']
  }, 
  { 
    id: 'neut-5', 
    type: 'neutral', 
    category: 'unrealistic', 
    title: 'System Error', 
    message: 'Your browser does not support this registration method. Please use a different browser.', 
    icon: 'warning', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-300', 
    textColor: 'text-slate-800', 
    isRealistic: false, 
    applicableFields: 'global'
  }, 
  { 
    id: 'neut-6', 
    type: 'neutral', 
    category: 'network', 
    title: 'Connection Timeout', 
    message: 'The request took too long to complete. Please try again.', 
    icon: 'wifi', 
    bgColor: 'bg-slate-50', 
    borderColor: 'border-slate-300', 
    textColor: 'text-slate-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
]; 
 
// Non-Apologetic Error Messages 
const NON_APOLOGETIC_ERRORS: ErrorMessage[] = [ 
  { 
    id: 'non-1', 
    type: 'non-apologetic', 
    category: 'validation', 
    title: 'Invalid Input', 
    message: 'You made a mistake. Check your email format and try again.', 
    icon: 'error', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: true, 
    applicableFields: ['email']
  }, 
  { 
    id: 'non-2', 
    type: 'non-apologetic', 
    category: 'system', 
    title: 'Error', 
    message: 'Invalid data. Fix your information and resubmit.', 
    icon: 'error', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'non-3', 
    type: 'non-apologetic', 
    category: 'network', 
    title: 'Connection Failed', 
    message: 'Network unavailable. You must have an active internet connection to proceed.', 
    icon: 'wifi', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
  { 
    id: 'non-4', 
    type: 'non-apologetic', 
    category: 'unrealistic', 
    title: 'Invalid Entry', 
    message: 'Your name contains forbidden characters. Remove all vowels and try again.', 
    icon: 'error', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: false, 
    applicableFields: ['teamName', 'fullName']
  }, 
  { 
    id: 'non-5', 
    type: 'non-apologetic', 
    category: 'unrealistic', 
    title: 'Registration Blocked', 
    message: 'This email domain is not permitted. Use only @example.com addresses.', 
    icon: 'error', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: false, 
    applicableFields: ['email']
  }, 
  { 
    id: 'non-6', 
    type: 'non-apologetic', 
    category: 'validation', 
    title: 'Invalid Phone', 
    message: 'Phone number must start with +43 for Austrian numbers.', 
    icon: 'error', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: false, 
    applicableFields: ['phone']
  }, 
  { 
    id: 'non-7', 
    type: 'non-apologetic', 
    category: 'network', 
    title: 'Connection Lost', 
    message: 'WiFi connection lost. Please reconnect and try again.', 
    icon: 'wifi', 
    bgColor: 'bg-red-50', 
    borderColor: 'border-red-300', 
    textColor: 'text-red-800', 
    isRealistic: true, 
    applicableFields: 'global'
  }, 
]; 
 
export const ALL_ERRORS = [
  ...APOLOGETIC_ERRORS,
  ...NEUTRAL_ERRORS,
  ...NON_APOLOGETIC_ERRORS,
];

// Scenario definitions
export type ScenarioType = 'scenario1' | 'scenario2' | 'scenario3';

export interface ScenarioSequence {
  id: ScenarioType;
  name: string;
  sequence: ErrorType[]; // The order in which error types should be shown
}

export const SCENARIOS: ScenarioSequence[] = [
  {
    id: 'scenario1',
    name: 'Non-apologetic → Neutral → Apologetic',
    sequence: ['non-apologetic', 'neutral', 'apologetic'],
  },
  {
    id: 'scenario2',
    name: 'Neutral → Non-apologetic → Apologetic',
    sequence: ['neutral', 'non-apologetic', 'apologetic'],
  },
  {
    id: 'scenario3',
    name: 'Apologetic → Neutral → Non-apologetic',
    sequence: ['apologetic', 'neutral', 'non-apologetic'],
  },
];

// Current active scenario - can be changed to switch between scenarios
export let CURRENT_SCENARIO: ScenarioType = 'scenario2';

export function setCurrentScenario(scenario: ScenarioType): void {
  CURRENT_SCENARIO = scenario;
}

export function getCurrentScenario(): ScenarioSequence {
  return SCENARIOS.find(s => s.id === CURRENT_SCENARIO)!;
} 
 
/** 
 * Get a random error message 
 * Can filter by type or category 
 */ 
export function getRandomError( 
  type?: ErrorType, 
  category?: ErrorCategory,
  fieldName?: string
): ErrorMessage { 
  let filtered = ALL_ERRORS; 
 
  if (type) { 
    filtered = filtered.filter(e => e.type === type); 
  } 
 
  if (category) { 
    filtered = filtered.filter(e => e.category === category); 
  } 

  if (fieldName) {
      filtered = filtered.filter(e => 
          e.applicableFields === 'global' || e.applicableFields.includes(fieldName)
      );
  }
 
  if (filtered.length === 0) { 
    // Fallback if no specific error matches
    // Try to find a global one
    const globalErrors = ALL_ERRORS.filter(e => e.applicableFields === 'global');
    if (globalErrors.length > 0) {
        return globalErrors[Math.floor(Math.random() * globalErrors.length)];
    }
    return ALL_ERRORS[Math.floor(Math.random() * ALL_ERRORS.length)]; 
  } 
 
  return filtered[Math.floor(Math.random() * filtered.length)]; 
} 
 
/** 
 * Get errors by type 
 */ 
export function getErrorsByType(type: ErrorType): ErrorMessage[] { 
  return ALL_ERRORS.filter(e => e.type === type); 
} 
 
/** 
 * Get a random error that hasn't been shown recently 
 */ 
export function getRandomErrorExcluding( 
  recentErrorIds: string[], 
  type?: ErrorType,
  fieldName?: string
): ErrorMessage { 
  let filtered = ALL_ERRORS.filter(e => !recentErrorIds.includes(e.id)); 
 
  if (type) { 
    filtered = filtered.filter(e => e.type === type); 
  }

  if (fieldName) {
      filtered = filtered.filter(e => 
          e.applicableFields === 'global' || e.applicableFields.includes(fieldName)
      );
  }
 
  if (filtered.length === 0) { 
    return getRandomError(type, undefined, fieldName); 
  } 
 
  return filtered[Math.floor(Math.random() * filtered.length)]; 
} 
