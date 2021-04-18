import * as React from 'react';
import './Home.css';
import EventBox from '../Components/EventBox';
import StarryBackground from '../Components/StarryBackground';
import { EventType } from '../Types/ReusedTypes';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const Home = () => {
  const [events, setEvents] = React.useState<EventType[]>([])
  const [scrapTotal, setScrapTotal] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setEvents(currentEvents => [...currentEvents, {
        type: 'drifting-scrap',
        amount: getRandomInt(20, 50),
        id: getRandomInt(1, 10000000),
      }])
    }, 2000)
  }, []);

  const addToCollection = () => {
    setScrapTotal(scrapTotal + events[0].amount);

    setEvents([]);
  }

  return (
    <div className='home-main'>
      <div className='topBar'>
        <p className='home-title abel-font'>USER: DAVE</p>
        <div className='spacer'></div>
        <p className='home-title abel-font'>SCRAP RESERVE: {scrapTotal}</p>
      </div>
      <div className='home-events-container'>
        {events.length > 0 && <EventBox event={events[0]} collect={addToCollection} />}
      </div>
      <StarryBackground />
    </div>
  );
};

export default Home;