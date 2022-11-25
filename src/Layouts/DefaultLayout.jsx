import React, { useState } from 'react';
import { Col, Grid, Container } from '~/components/Ui';
import { classNames } from '~/utils';
import { Header, MusicPlayer, Sidebar } from './components';
import styles from '~/scss/layouts/DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('');

  return (
    <div className={cx('wrapper')} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header />
      <Container className={cx('mt-5', 'main-wrapper')}>
        <Grid gy={0}>
          <Col lg={1}>
            <Sidebar />
          </Col>
          <Col lg={11}>
            <main className={cx('main-container')}>{React.cloneElement(children, { ...children.props, setBackgroundImage })}</main>
          </Col>
        </Grid>
      </Container>
      <MusicPlayer />
    </div>
  );
}

export default DefaultLayout;
