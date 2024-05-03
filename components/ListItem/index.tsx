import React, { FC, ReactNode } from 'react';
import { Card } from 'react-bootstrap';

import classes from './style.module.scss';

type TProps = {
  children: ReactNode;
};

const ListItem: FC<TProps> = ({ children }) => {
  return (
    <Card body className={classes.list_item}>
      {children}
    </Card>
  );
};

export default ListItem;
