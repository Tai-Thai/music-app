import React from 'react';
import { classNames } from '~/utils';
import { Logo, SearchIcon } from '~/components/Icons';
import { Container, Grid, Col, Flexbox } from '~/components/Ui';
import styles from '~/scss/layouts/Header.module.scss';
import { Tippy } from '~/components';
import SearchField from './SearchField';

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
            <Flexbox alignCenter gx={2}>
              <SearchIcon className={cx('search-icon')} />
              <SearchField />
            </Flexbox>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
