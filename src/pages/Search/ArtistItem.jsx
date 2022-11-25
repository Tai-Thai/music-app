import React from 'react';
import PropTypes from 'prop-types';
import { classNames, formatFollower } from '~/utils';
import styles from '~/scss/pages/Search.module.scss';
import { Thumbnail } from '~/components';
import { Flexbox, Text } from '~/components/Ui';

const cx = classNames.bind(styles);

const ArtistItem = (props) => {
  const { name, thumbnailM, thumbnail, totalFollow, ...prop } = props;
  return (
    <Flexbox column className={cx('w-100', 'pointer')} {...props}>
      <Thumbnail avatar src={thumbnailM || thumbnail} />
      <div>
        <Flexbox column alignCenter>
          <Text fz={20} tagName={'h4'} className={cx('mt-2')} maxLine={1}>
            {name}
          </Text>
          <Text fz={16} className={cx('mt-2')} maxLine={1}>
            {totalFollow && `${formatFollower(totalFollow)} Follower`}
          </Text>
        </Flexbox>
      </div>
    </Flexbox>
  );
};

ArtistItem.propTypes = {};

export default ArtistItem;
