import { format } from 'date-fns';
import Link from 'next/link';
import React, { FC } from 'react';
import { ListUl, Trash } from 'react-bootstrap-icons';

import { IOrder } from '@/types/interfaces';

import classes from './style.module.scss';

type TProps = {
  order: IOrder;
};

const OrderItem: FC<TProps> = ({ order }) => {
  const { title, date } = order;

  return (
    <div
      className={`${classes.orderItem} d-flex justify-content-between align-items-center text-secondary`}
    >
      <p>{title}</p>

      <Link href={'/groups'} className={classes.orderItem__menuIcon}>
        <ListUl size={20} color='dark' />
      </Link>

      <div>
        <p className='m-1'>20</p>
        <p className='m-0'>Products</p>
      </div>

      <div>
        <p className='m-1'>{format(new Date(date), 'dd/MM')}</p>
        <p className='m-0'>{format(new Date(date), 'dd/MM/yyyy')}</p>
      </div>

      <div>
        <p className='m-1'>2500$</p>
        <p className='m-0'>250 000.50 uah</p>
      </div>

      <div className={classes.orderItem__trash}>
        <Trash size={20} />
      </div>
    </div>
  );
};

export default OrderItem;
