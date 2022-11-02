import React from 'react';
import { classNames } from '~/utils';
import { Logo, SearchIcon } from '~/components/Icons';
import { Container, Grid, Col, Flexbox } from '~/components/Ui';
import styles from '~/scss/Layouts/Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div>
      <Container>
        <Grid className={`align-items-center ${cx('wrapper')}`}>
          <Col lg={1}>
            <Logo className={cx('logo')} />
          </Col>
          <Col lg={'fill'}>
            <Flexbox alignCenter>
              <SearchIcon className={cx('search-icon')} />
              <input type='text' className={cx('search-field', 'ml-2')} placeholder={'Search'} />
            </Flexbox>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
