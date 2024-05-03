import { format } from 'date-fns';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import { clock } from '@/assets/images';

import classes from './style.module.scss';

export const TopMenu: FC = () => {
  const { src } = clock;
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
        <Image src={src} width={15} height={15} alt='clock' />
        <span>{format(time, 'hh:mm a')}</span>
      </div>
    </div>
  );
};

export default TopMenu;
