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
  validation?: (str: string) => boolean;
}

export const STEPS: Step[] = [
  {
    taxonomy: Taxonomy.KEYWORD,
    displayQuestion: "What type of event are you interested in?",
    value: "",
    validation: (str) => {
      return str.length > 0;
    }
  },
  {
    taxonomy: Taxonomy.CITY,
    displayQuestion: "What city is the event located?",
    value: "",
    validation: (str) => {
      return str.length > 0;
    }    
  },
  {
    taxonomy: Taxonomy.START_DATE_TIME,
    displayQuestion: "When does the event start?",
    value: "",
    validation: (str) => {
      return str.length > 0;
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
