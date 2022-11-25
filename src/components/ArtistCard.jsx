import { classNames, formatFollower } from '~/utils';
import { Thumbnail } from '.';
import { Flexbox, Text } from './Ui';
import styles from '~/scss/components/ArtistCard.module.scss';

const cx = classNames.bind(styles);

const ArtistCard = ({ id, playlistId, name, thumbnail, thumbnailM, totalFollow, isLoading, thumbnailClassName, className, ...props }) => {
  return (
    <Flexbox alignCenter className={cx('artist-card-container', 'p-2', 'pointer', className)}>
      <div className={cx('artist-card__thumbnail', 'mr-2', thumbnailClassName)}>
        <Thumbnail avatar src={thumbnailM || thumbnail} isLoading={isLoading} />
      </div>
      <div className={'w-100'}>
        <Flexbox column>
          <Text
            className={cx('card-title', 'cl-white')}
            fz={16}
            isLoading={isLoading}
            skeletonWidth={'45%'}
            skeletonHeight={'18px'}
            skeletonClassName={'mb-1'}
          >
            {name}
          </Text>
          <Text fz={12} className={cx('cl-white', 'op-2')} isLoading={isLoading} skeletonWidth={'15%'}>
            Nghe si{totalFollow && ` \u2022 ${formatFollower(totalFollow)} Follower`}{' '}
          </Text>
        </Flexbox>
      </div>
    </Flexbox>
  );
};

export default ArtistCard;
