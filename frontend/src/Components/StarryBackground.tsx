import * as React from 'react';
import './StarryBackground.css';

let stars: JSX.Element[] = [];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const StarryBackground = () => {
  React.useEffect(() => {
    for (let i = 0; i < 50; i++) {
      stars.push(
        <div
          style={{ top: `${getRandomInt(0, 99)}vh`, left: `${getRandomInt(0, 99)}vw` }}
          className='starry-star'
        />
      )
    }
  }, []);

  return (
    <div className='starry-main'>
      {stars}
    </div>
  );
};

export default StarryBackground;