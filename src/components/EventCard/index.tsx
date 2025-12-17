import type { Event } from "../../api/events";

const EventCard = ({ event }: { event: Event}) => {
  return (
    <li key={event.id} className="mb-4 flex gap-5 rounded-lg bg-gray-700 shadow-lg shadow-black/25 p-6 m-4">    
      {event.images?.[0] && (
        <div className='w-[100px]'>
          <img
            src={event.images[0].url}
            alt={event.name}
            className='w-full object-cover rounded'
          />
        </div>
      )}
      <div>
        <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{event.name}</a>
        <div>{event.dates.start.localDate} {event.dates.start.localTime || ''}</div>
        <div>
          {event._embedded?.venues && event._embedded.venues.length > 0 ? (
            <>
              {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}
              {event._embedded.venues[0].state ? `, ${event._embedded.venues[0].state.name}` : ''}
              , {event._embedded.venues[0].country.name}
            </>
          ) : (
            'Venue information not available'
          )}
        </div>
      </div>
    </li>
  );    
}

export default EventCard;