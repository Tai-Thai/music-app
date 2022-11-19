import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartIcon, HomeIcon, LogoutIcon, PlayListIcon, UserIcon } from '~/components/Icons';
import { Col, Flexbox, Grid, Tippy } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/layouts/Sidebar.module.scss';
import { routes } from '~/configs';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <Flexbox column gy={2}>
      <div>
        <Flexbox gy={3} column alignCenter className={`bg-dark-alt px-3 py-5 rounded w-fit m-auto`}>
          <Tippy content={'Home'}>
            <NavLink to={routes.home} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
              <HomeIcon />
            </NavLink>
          </Tippy>
          <Tippy content={'Playlist'}>
            <NavLink to={routes.playlist} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
              <PlayListIcon />
            </NavLink>
          </Tippy>
          <Tippy content={'Collection'}>
            <NavLink to={routes.collection} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
              <HeartIcon className={cx('heart-icon')} />
            </NavLink>
          </Tippy>
          <Tippy content={'Some thing'}>
            <NavLink to={`/me2`} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
              <PlayListIcon />
            </NavLink>
          </Tippy>
        </Flexbox>
      </div>

      <div>
        <Flexbox gy={3} column alignCenter className={`bg-dark-alt px-3 py-5 rounded w-fit m-auto`}>
          <Tippy content={'Me'}>
            <NavLink to={routes.profile} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
              <UserIcon />
            </NavLink>
          </Tippy>
          <Tippy content={'Me'}>
            <NavLink to={`/me2`} className={({ isActive }) => `${cx('nav-link', { active: isActive })} `}>
              <LogoutIcon />
            </NavLink>
          </Tippy>
        </Flexbox>
      </div>
    </Flexbox>
  );
}

export default Sidebar;
