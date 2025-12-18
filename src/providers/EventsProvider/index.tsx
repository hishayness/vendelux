// biome-ignore assist/source/organizeImports: ignore error
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { eventsApi, type SearchParams, type Event } from "../../api/events";

type EventsProviderProps = {
  children: React.ReactNode;
};

const Taxonomy = {
  KEYWORD: "keyword",
  CITY: "city",
  START_DATE_TIME: "startDateTime",
  END_DATE_TIME: "endDateTime",
} as const;

type Taxonomy = typeof Taxonomy[keyof typeof Taxonomy];

type Step = {
  taxonomy: Taxonomy;
  displayQuestion: string;
  value: string;
}

type EventsContextProps = {
  steps: Step[];
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onStepUpdate: (index: number, value: string) => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onSearch: (latestSteps: Step[]) => void;
  clearSession: () => void;
  errors: string | null;
  loading: boolean;
  onFilter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  filterText: string;
}

const EventsContext = createContext<EventsContextProps | null>(null);

const STEPS: Step[] = [
  {
    taxonomy: Taxonomy.KEYWORD,
    displayQuestion: "What type of event are you interested in?",
    value: "",
  },
  {
    taxonomy: Taxonomy.CITY,
    displayQuestion: "What city is the event located?",
    value: "",
  },
  {
    taxonomy: Taxonomy.START_DATE_TIME,
    displayQuestion: "When does the event start?",
    value: "",
  },  /*
  {
    taxonomy: Taxonomy.END_DATE_TIME,
    displayQuestion: "When does the event end?",
    value: "",
  },  */
];

// eslint-disable-next-line react-refresh/only-export-components
export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
}

export const EventsProvider = (props: EventsProviderProps) => {
  const { children } = props;
  const session = sessionStorage.getItem('eventsSession');
  const sessionData = session ? JSON.parse(session) : null;
  const [events, setEvents] = useState<Event[]>([]);
  const [steps, setSteps] = useState<Step[]>(sessionData?.steps || STEPS);
  const [currentStep, setCurrentStep] = useState(sessionData?.currentStep || 0);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");

  /**
  * Clears the current session data and resets the state
  */  
  const clearSession = useCallback(() => {
    sessionStorage.removeItem('eventsSession');
    setSteps(STEPS);
    setCurrentStep(0);
    setFilterText('');
    setEvents([]);
  }, []);

  /**
  * Saves the current steps and step index to session storage
  * @param {Step[]} latestSteps
  * @param {number} latestCurrentStep
  */  
  const saveSession = useCallback((latestSteps: Step[], latestCurrentStep: number) => {
    const sessionData = {
      steps: latestSteps,
      currentStep: latestCurrentStep,
    };
    sessionStorage.setItem('eventsSession', JSON.stringify(sessionData));
  }, []);

  /**
  * Fetches events based on the provided search parameters
  * @param {SearchParams} params
  */  
  const fetchEvents = useCallback(async (params: SearchParams) => {
    try {
      setFilterText('');
      setLoading(true);
      setErrors(null);
      const data = await eventsApi.search(params);
      setEvents(data._embedded?.events || []);
    } catch (error) {
      setErrors(error?.response?.data?.errors?.[0]?.detail || "Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
  * Performs the search based on the latest steps
  * @param {Step[]} latestSteps
  */
  const onSearch = useCallback((latestSteps: Step[]) => {
    const queryParams = latestSteps.reduce((acc, step) => {
      if (step.value) {
        acc[step.taxonomy] = step.value;
      }
      return acc;
    }, {} as SearchParams);
    
    fetchEvents(queryParams);
  }, [fetchEvents]);

  /**
  * Performs the search based on the latest steps
  * @param {Step[]} latestSteps
  */
  const onStepUpdate = useCallback((stepIndex: number, stepValue: string) => {
    // Need this so we can automatically fetch events on last step since setSteps is asynchronous
    let latestSteps: Step[] = [];

    setSteps(prev => {
      latestSteps = prev.map((step, index) => (index === stepIndex ? { ...step, value: stepValue } : step))
      return latestSteps;
    });

    // Save session after updating step with the next index
    saveSession(latestSteps, stepIndex + 1);

    // If it's the last step, perform the search
    if (stepIndex === latestSteps.length - 1) {
      onSearch(latestSteps);
    }
  }, [onSearch, saveSession]);

  const onFilter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFilterText((e.target as HTMLInputElement).value.toLowerCase());
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only trigger on initial mount
  useEffect(() => {
    // Session exists and was completed, fetch events right away
    if (sessionData && sessionData.currentStep === steps.length) {
      fetchEvents(sessionData.steps.reduce((acc: SearchParams, step: Step) => {
        if (step.value) {
          acc[step.taxonomy] = step.value;
        }
        return acc;
      }, {}));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const values = useMemo(() => {
    return {
      steps,
      events: events.filter(event => event.name.toLowerCase().includes(filterText)),
      setEvents,
      onStepUpdate,
      currentStep,
      setCurrentStep,
      onSearch,
      clearSession,
      errors,
      loading,
      onFilter,
      filterText,
    };
  }, [events, steps, currentStep, onStepUpdate, clearSession, onSearch, errors, loading, onFilter, filterText]);

  return (
    <EventsContext.Provider value={values}>
      {children}
    </EventsContext.Provider>
  );
}