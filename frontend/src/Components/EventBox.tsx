import * as React from 'react';
// import GlowBox from './GlowBox';
import './EventBox.css';
import { EventType } from '../Types/ReusedTypes';
import GlowBox from './GlowBox';

interface EventBoxPropsType {
  event: EventType
  numberOfEvents?: number
  collect: () => void
}

const EventBox: React.FunctionComponent<EventBoxPropsType> = ({ event, numberOfEvents, collect }) => {
  const [eventIsDismissing, setEventIsDismissing] = React.useState(false);

  let messageText = '';

  if (event.type === 'drifting-scrap') {
    if (event.amount === 1) {
      messageText = '1 piece of scrap metal is floating by.'
    } else {
      messageText = `${event.amount} pieces of scrap metal are floating by.`
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log('button!');
    setEventIsDismissing(true);

    setTimeout(() => {
      collect();
    }, 500);
  }

  return (
    <div className={`eventbox-main${eventIsDismissing ? ' shrink' : ''}`}>
      <GlowBox>
        <div>
          <p className='eventbox-p syne-font'>{messageText}</p>
        </div>
      </GlowBox>
      <a className='eventbox-button syne-font' onClick={handleClick}>collect</a>
    </div>
  );
};

export default EventBox;