import { format } from 'date-fns';
import React, { FC } from 'react';
import { Cast, Trash } from 'react-bootstrap-icons';

import { IProduct } from '@/types/interfaces';

import classes from './style.module.scss';

type TProps = {
  product: IProduct;
};

const ProductItem: FC<TProps> = ({ product }) => {
  const { title, serialNumber, guarantee, price, order, date } = product;

  return (
    <div
      className={`${classes.productItem} d-flex justify-content-between align-items-center text-secondary`}
    >
      <Cast size={50} />

      <div>
        <p className='mb-2'>{title}</p>
        <p className={classes.productItem__serial}>{serialNumber}</p>
      </div>

      <p className='mb-0'>Free</p>

      <div>
        <div className='d-flex align-items-end gap-2'>
          <span className={classes.productItem__guaranteText}>from</span>
          <p className='mb-0'>{format(new Date(guarantee.end), 'dd/MM/yyyy')}</p>
        </div>
        <div className='d-flex align-items-end center gap-2'>
          <span className={classes.productItem__guaranteText}>to</span>
          <p className='mb-0'>{format(new Date(guarantee.end), 'dd/MM/yyyy')}</p>
        </div>
      </div>

      <p>New</p>

      <div>
        {price.map((oneprice) => {
          const isSymbol = oneprice.symbol === 'USD';

          return (
            <div key={oneprice.symbol} className={isSymbol ? classes.productItem__price : ''}>
              <span>{oneprice.value}</span>
              <span>$</span>
            </div>
          );
        })}
      </div>

      <p className={classes.productItem__groupName}>Some group name</p>

      <p>Order {order}</p>

      <div className='d-flex flex-column align-items center'>
        <p className='mb-0'>{format(new Date(date), 'dd/MM')}</p>
        <p className='mb-0'>{format(new Date(date), 'dd/MM/yyyy')}</p>
      </div>

      <div className={classes.productItem__trash}>
        <Trash size={20} />
      </div>
    </div>
  );
};

export default ProductItem;
