import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { Col, Nav } from 'react-bootstrap';
import { GearFill, PersonFill } from 'react-bootstrap-icons';

import { ASIDE_ROUTES } from '@/constants';

import classes from './style.module.scss';

const AsideBar: FC = () => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  return (
    <div className='d-flex flex-column align-items-center gap-4'>
      <div className={`${classes.user} shadow`}>
        <PersonFill size={80} />
        <div className={`${classes.user__settingsBtn} shadow`}>
          <GearFill size={20} />
        </div>
      </div>
      <Nav className='mb-3'>
        <Col className='d-flex flex-column align-items-center'>
          {ASIDE_ROUTES.map(({ label, path }) => {
            return (
              <Link
                key={path}
                href={path}
                className={`${classes.navLink} nav-link ${asPath === path && classes['navLink--active']}`}
              >
                {t(`app.${label}`)}
              </Link>
            );
          })}
        </Col>
      </Nav>
    </div>
  );
};

export default AsideBar;
