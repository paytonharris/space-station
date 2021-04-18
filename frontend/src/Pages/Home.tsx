import * as React from 'react';
import './Home.css';
import EventBox from '../Components/EventBox';
import StarryBackground from '../Components/StarryBackground';
import { EventType } from '../Types/ReusedTypes';
import { Request } from '../globalTypes';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let ws: WebSocket;

const Home = () => {
  const [events, setEvents] = React.useState<EventType[]>([])
  const [scrapTotal, setScrapTotal] = React.useState(0);

  const handleMessage = (data: string) => {
    console.log(data);
  
    try {
      let request = JSON.parse(data) as Request;
  
      switch (request.event) {
        case 'scrap-metal-available':
          setEvents([{ id: getRandomInt(0, 10000), type: 'drifting-scrap', amount: request.amount ?? 0 }]);
          break;
        case 'scrap-metal-update':
          setScrapTotal(request.amount ?? scrapTotal);
          break;
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    ws = new WebSocket('ws://localhost:8999/');
    ws.onopen = function() {
      //ws.send('some kind of json object here');
    };
    ws.onmessage = function(e) {
      handleMessage(e.data);
    };
    
  }, []);

  const addToCollection = () => {
    const request: Request = { event: 'scrap-metal-collected', amount: events[0].amount, method: 'POST' }

    ws.send(JSON.stringify(request))

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