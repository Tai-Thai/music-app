import { classNames, seconds2time } from '~/utils';
import { Grid, Col, Flexbox, Text } from '~/components/Ui';
import styles from '~/scss/components/SongCardHorizontal.module.scss';
import { Thumbnail } from '~/components';
import { MoreVerticalIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const SongCardHorizontal = ({
  encodeId,
  thumbnail,
  title,
  artistsNames,
  textType: type,
  isLoading,
  thumbnailClassName,
  className,
  duration,
  ...props
}) => {
  return (
    <Flexbox alignCenter className={cx('p-2', 'song-card-horizontal', 'pointer', className)} {...props}>
      <div className={cx('song-card__thumbnail', thumbnailClassName)}>
        <Thumbnail src={thumbnail} isLoading={isLoading} />
      </div>
      <Grid className={cx('w-100')} gx={2}>
        <Col lg={8}>
          <Flexbox column justifyCenter className={cx('h-100')}>
            <Text
              className={cx('card-title', 'cl-white')}
              maxLine={1}
              fz={16}
              isLoading={isLoading}
              skeletonWidth={'50%'}
              skeletonHeight={'18px'}
              skeletonClassName={'mb-1'}
            >
              {title}
            </Text>
            <Text
              maxLine={1}
              fz={12}
              className={cx('cl-white', 'op-2')}
              isLoading={isLoading}
              skeletonWidth={'15%'}
              skeletonHeight={'10px'}
              skeletonClassName={'mb-1'}
            >
              {type === 'Playlist' && `${type} \u2022 `}
              {artistsNames}
            </Text>
            <Text
              maxLine={1}
              fz={12}
              className={cx('cl-white', 'op-2')}
              isLoading={isLoading}
              skeletonWidth={'10%'}
              skeletonHeight={'10px'}
            >
              {duration && seconds2time(duration)}
            </Text>
          </Flexbox>
        </Col>

        <Col lg={4}>
          {isLoading || (
            <Flexbox justifyCenter alignCenter className={cx('song-card__options-icon', 'h-100')}>
              <MoreVerticalIcon />
            </Flexbox>
          )}
        </Col>
      </Grid>
    </Flexbox>
  );
};

export default SongCardHorizontal;
