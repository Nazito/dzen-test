import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { logo } from '@/assets/images';

import classes from './style.module.scss';

const Logo: React.FC = () => {
  const { src, width, height } = logo;
  return (
    <>
      <Link href={'/'} className={classes.logo}>
        <Image src={src} width={width} height={height} alt='Logo' />

        <p className={classes.logo__text}>inventory</p>
      </Link>
    </>
  );
};

export default Logo;
