import React, { useState } from 'react';
import { Col, Grid, Container } from '~/components/Ui';
import { classNames } from '~/utils';
import { Header, MusicPlayer, Sidebar } from './components';
import styles from '~/scss/layouts/DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  return (
    <div className={cx('wrapper')}>
      <div className={cx('main-container')}>
        <Header />
        <Container className='mt-5'>
          <Grid gy={0}>
            <Col lg={1}>
              <Sidebar />
            </Col>
            <Col lg={11}>
              <main>{children}</main>
            </Col>
          </Grid>
        </Container>
      </div>
      <MusicPlayer />
      <div
        className={cx('background-image')}
        style={{ backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png)' }}
      ></div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default DefaultLayout;
