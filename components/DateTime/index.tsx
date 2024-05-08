import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { ClockFill } from 'react-bootstrap-icons';

import classes from './style.module.scss';

const DateTime: FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <span>Today</span>

      <div className={classes.topmenu__time}>
        <span>{format(time, 'dd MMM, yyyy')}</span>

        <ClockFill size={15} className='text-success' />
        <span>{format(time, 'hh:mm a')}</span>
      </div>
    </div>
  );
};

export default DateTime;
