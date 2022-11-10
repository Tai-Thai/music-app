import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '~/scss/pages/Collection.module.scss';
import { Thumbnail } from '~/components';
import { classNames } from '~/utils';
import { Col, Flexbox, Text } from '~/components/Ui';
import { PauseIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const CollectionItem = (props) => {
  const [first, setFirst] = useState(true);
  console.log({ setFirst: setFirst });
  return (
    <Col lg={3} className={cx('collection-item-wrapper')}>
      <Thumbnail
        className={cx('collection-item', 'relative')}
        src={'https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png'}
      >
        <div className={cx('collection-item__content')}>
          <Flexbox column className={cx('collection-item__content-top')}>
            <Text fz={24}>Limits</Text>
            <Text fz={10} className={'op-3'}>
              John watts
            </Text>
          </Flexbox>
          <Text fz={10} className={cx('like-amounts')}>
            2.3m likes
          </Text>
        </div>
        <Flexbox alignCenter justifyCenter className={cx('collection-item__play', 'rounded', 'pointer')}>
          <PauseIcon className={cx('cl-secondary')} />
        </Flexbox>
      </Thumbnail>
    </Col>
  );
};

CollectionItem.propTypes = {};

export default CollectionItem;
