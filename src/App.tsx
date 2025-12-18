import { AnimatePresence, motion } from 'framer-motion';
import { useEventsContext } from './providers/EventsProvider';
import { useState } from 'react';
import Button from './components/Button';
import EventCard from './components/EventCard';

const App = () => {
  const { currentStep, setCurrentStep, steps, onStepUpdate, clearSession, events, loading, onFilter, filterText, errors } = useEventsContext();
  const [value, setValue] = useState('');

  const onStepSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onStepUpdate(currentStep, value);
    setValue('');
    setCurrentStep(currentStep + 1);
  }

  return (
    <>
      <div className="flex gap-5 m-5">
        <section className="w-200 mx-auto my-12 rounded-lg bg-gray-700 shadow-lg shadow-black/25 p-6 m-4">
          <form className="flex flex-col">
            <div className="relative min-h-[100px]">
              <AnimatePresence>
                {steps.map((step, index) => (
                  currentStep === index 
                  ? 
                    <motion.div className="absolute" key={step.taxonomy} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <label className="block mb-2 text-lg">
                        {step.displayQuestion}
                        <input name={step.taxonomy} onChange={e => setValue(e.target.value)} className="p-3 mt-2 w-full" type="text" value={value || step.value} />
                      </label>
                    </motion.div> 
                  : null
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-4">
              {currentStep > 0 && <Button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>}
              <Button type="submit" onClick={onStepSubmit} disabled={steps?.[currentStep]?.validation?.(value) === false}>
                {currentStep < steps.length - 1 ? "Next" : "Show Events"}
              </Button>
            </div>
          </form>
          <ul>
            <li></li>
          </ul>
        </section>
        <section className="w-200 mx-auto my-12 rounded-lg bg-gray-700 shadow-lg shadow-black/25 p-6 m-4 relative">
          {steps.map((step) => 
            (step.value.length > 0 && <div key={step.taxonomy} className="my-4">
              <strong>{step.displayQuestion}</strong> 
              <div>{step.value}</div>
            </div>)
          )}
          <Button onClick={clearSession} className="mt-4 absolute top-4 right-4">Clear Session</Button>   
        </section>
      </div>
      <div>
        {loading && <div className="m-8 p-4">
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],    // Pulse opacity for a breathing effect
            }}
            transition={{
              duration: .3,
              repeat: Infinity,
              ease: "easeInOut",
            }}          
          >Loading</motion.div>
        </div>}
        {errors && <div className="m-8 p-4 text-red-500">Error: {errors}</div>}
        {!loading && !errors && currentStep === steps.length && events.length === 0 && (
          <div className="m-8 p-4">No events found for the given criteria.</div>
        )}
        {events.length > 0 &&
          <>
            <div className="m-5">
              <div className="flex items-center">
                <input type="text" placeholder="Filter events..." className="m-4 p-2 w-60 border border-gray-300 rounded" onKeyUp={e => onFilter(e)}/>
                {filterText && <div className="m-4">Filtering by: <strong>{filterText}</strong></div>}
              </div>
              <div className="m-4">
                Showing {events.length} event{events.length > 1 ? 's' : ''}
              </div>
            </div>
            <ul className="m-4 p-0">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))} 
            </ul>
          </>
        }
      </div>
    </>
  )
}

export default App;