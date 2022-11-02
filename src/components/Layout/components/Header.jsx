import React from 'react';
import { classNames } from '~/utils';
import { Logo, SearchIcon } from '~/components/Icons';
import { Container, Grid, Col, Flexbox } from '~/components/Ui';
import styles from '~/scss/components/Layout/Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
  return (
    <Container>
      <Grid className={`align-items-center ${cx('wrapper')}`}>
        <Col lg={1}>
          <Logo />
        </Col>
        <Col>
          <Flexbox alignCenter>
            <Flexbox className={cx('search-icon')}>
              <SearchIcon />
            </Flexbox>
            <input type='text' className={cx('search-field', 'ml-2')} placeholder={'Search'} />
          </Flexbox>
        </Col>
      </Grid>
    </Container>
  );
}

export default Header;
