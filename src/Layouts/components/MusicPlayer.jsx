import React from 'react';
import { Container, Grid, Col, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/layouts/MusicPlayer.module.scss';
import { NextIcon, PauseIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon, VolumeIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

function MusicPlayer() {
  const handleInputRangeChange = function (e) {
    e.target.style.setProperty('--duration', `${e.target.value}%`);
  };
  return (
    <div className={cx('wrapper', 'py-5')}>
      <Container>
        <Grid>
          <Col lg={1}>
            <div />
          </Col>
          <Col lg={'fill'}>
            <Grid className='align-items-center'>
              <Col lg={2}>
                <Flexbox alignCenter gx={1}>
                  <img
                    src='https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/7/e/3/f/7e3f46007388adc8f25eead90b92bb07.jpg'
                    alt=''
                    className={cx('thumbnail')}
                  />
                  <span>
                    <h4 className={cx('bold', 'fz-14', 'cl-white')}>Seasons in</h4>
                    <span className={cx('bold', 'fz-10', 'cl-white', 'op-2')}>James</span>
                  </span>
                </Flexbox>
              </Col>
              <Col lg={'fill'}>
                <Flexbox column alignCenter justifyBetween gy={3} className={cx('h-100')}>
                  <Flexbox gx={4}>
                    <ShuffleIcon className={cx('control-btn', 'cl-white')} />
                    <PreviousIcon className={cx('control-btn', 'cl-white')} />
                    <Flexbox alignCenter justifyCenter className={cx('play-btn', 'rounded', 'bg-secondary')}>
                      <PauseIcon className={cx('control-btn', 'cl-white')} />
                    </Flexbox>
                    <NextIcon className={cx('control-btn', 'cl-white')} />
                    <RepeatOneIcon className={cx('control-btn', 'cl-white')} />
                  </Flexbox>
                  <input
                    type='range'
                    name=''
                    step='0'
                    min='0'
                    max='100'
                    defaultValue={0}
                    className={cx('duration-bar')}
                    onChange={handleInputRangeChange}
                  />
                </Flexbox>
              </Col>
              <Col lg={2}>
                <Flexbox gx={1} alignCenter>
                  <VolumeIcon className={cx('volume-icon')} />
                  <input type='range' name='' id='' className={cx('duration-bar', 'volume-bar')} onChange={handleInputRangeChange} />
                </Flexbox>
              </Col>
            </Grid>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}

export default MusicPlayer;
