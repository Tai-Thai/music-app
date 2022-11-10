import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartIcon, HomeIcon, LogoutIcon, PlayListIcon, UserIcon } from '~/components/Icons';
import { Col, Flexbox, Grid } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/layouts/Sidebar.module.scss';
import { routes } from '~/configs';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <Flexbox column gy={2}>
      <div>
        <Flexbox gy={3} column alignCenter className={`bg-dark-alt px-3 py-5 rounded w-fit m-auto`}>
          <NavLink to={routes.home} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
            <HomeIcon />
          </NavLink>
          <NavLink to={routes.playlist} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
            <PlayListIcon />
          </NavLink>
          <NavLink to={routes.collection} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
            <HeartIcon className={cx('heart-icon')} />
          </NavLink>
          <NavLink to={`/me2`} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
            <PlayListIcon />
          </NavLink>
        </Flexbox>
      </div>

      <div>
        <Flexbox gy={3} column alignCenter className={`bg-dark-alt px-3 py-5 rounded w-fit m-auto`}>
          <NavLink to={routes.profile} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
            <UserIcon />
          </NavLink>
          <NavLink to={`/me2`} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
            <LogoutIcon />
          </NavLink>
        </Flexbox>
      </div>
    </Flexbox>
  );
}

export default Sidebar;
