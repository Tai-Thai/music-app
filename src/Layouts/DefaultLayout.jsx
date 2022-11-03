import React from 'react';
import { Col, Grid, Container } from '~/components/Ui';
import { Header, MusicPlayer, Sidebar } from './components';

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Container className='mt-5'>
        <Grid gy={0}>
          <Col lg={1}>
            <Sidebar />
          </Col>
          <Col lg={'fill'}>
            <main>{children}</main>
          </Col>
        </Grid>
      </Container>
      <MusicPlayer />
    </div>
  );
}

export default DefaultLayout;
