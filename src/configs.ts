import { isValidExactFormat } from './utils/date';

export const Taxonomy = {
  KEYWORD: "keyword",
  CITY: "city",
  START_DATE_TIME: "startDateTime",
  END_DATE_TIME: "endDateTime",
} as const;

export type Taxonomy = typeof Taxonomy[keyof typeof Taxonomy];

export type Step = {
  taxonomy: Taxonomy;
  displayQuestion: string;
  value: string;
  placeholder?: string;
  validation?: (str: string) => string | null;
}

export const STEPS: Step[] = [
  {
    taxonomy: Taxonomy.KEYWORD,
    displayQuestion: "What type of event are you interested in?",
    value: "",
    placeholder: "eg. basketball",
    validation: (str: string) => {
      if(str.length === 0) {
        return 'Please enter a type of event!';
      }
      return null;
    }
  },
  {
    taxonomy: Taxonomy.CITY,
    displayQuestion: "What city is the event located?",
    value: "",
    placeholder: "eg. New York",
    validation: (str: string) => {
      if(str.length === 0) {
        return 'Please enter a city!';
      }
      return null;
    }  
  },
  {
    taxonomy: Taxonomy.START_DATE_TIME,
    displayQuestion: "When does the event start?",
    value: "",
    placeholder: "eg. 2020-08-01T14:00:00Z",
    validation: (str: string) => {
      if(str.length === 0) {
        return 'Please enter event start time!';
      } else if (!isValidExactFormat(str)) {
        return 'Please make sure format is: (eg. 2020-08-01T14:00:00Z)!';
      }

      return null;
    }  
  },  /*
  {
    taxonomy: Taxonomy.END_DATE_TIME,
    displayQuestion: "When does the event end?",
    value: "",
    validation: (str) => {
      return str.length > 0;
    }       
  },  */
];
