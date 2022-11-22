/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';
import { Container, Grid, Col, Flexbox, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/layouts/MusicPlayer.module.scss';
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon, VolumeIcon } from '~/components/Icons';
import { Thumbnail, Tippy } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getLyric, getSong } from '~/apis';
import { seconds2time } from '~/utils';
import { pushListenedSongs, setCurrentSongId, setIndexCurrentSong, setPointerHistory } from '~/features/playlist/playlistSlice';
import { request } from '~/services';
const cx = classNames.bind(styles);

function MusicPlayer() {
  const { currentSongId: songId, indexCurrentSong, playlist, listenedSongs, pointerHistory } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const [currentSong, setCurrentSong] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [error, setError] = useState('error');
  const [muted, setMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef(null);
  const durationBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const timeLeftRef = useRef(null);
  const timeRightRef = useRef(null);
  console.log({ songId, currentSong, indexCurrentSong, playlist, listenedSongs });
  console.log({ pointerHistory, listenedSongs, length: listenedSongs.length });

  // animation of time line input type range
  const handleInputRangeAnimation = function (target) {
    target.style.setProperty('--duration', `${target.value}%`);
  };

  // duration bar when drag drop input range
  const handleDurationBarChange = function (e) {
    const seekTime = (audioRef.current.duration / 100) * durationBarRef.current.value;
    handleInputRangeAnimation(durationBarRef.current);
    audioRef.current.currentTime = seekTime;
  };
  // duration bar update value audio
  const handleTimeUpdate = (e) => {
    // audio
    const target = e.target;
    if (target.duration) {
      const durationPercent = Math.floor((target.currentTime / target.duration) * 100);
      // set duration bar value
      durationBarRef.current.value = durationPercent;
      // set animation duration bar
      handleInputRangeAnimation(durationBarRef.current);
      // set time
      timeRightRef.current.innerText = seconds2time(target.duration - target.currentTime);
      timeLeftRef.current.innerText = seconds2time(target.currentTime);
    }
  };

  // handle volume slider
  const handleVolumeChange = () => {
    setMuted(false);
    const volumeValue = volumeBarRef.current.value / 100;
    // set volume value to audio
    audioRef.current.volume = volumeValue;
    // set muted if volume value = 0
    if (volumeValue === 0) setMuted(true);
    // handle animation timeline
    handleInputRangeAnimation(volumeBarRef.current);
  };

  // handle on end song => next song
  const audioOnEnd = () => {
    handleNextSong();
  };

  // handle play & pause events
  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // handle shuffle
  const handleShuffle = () => setIsShuffle(!isShuffle);

  // handle previous and next song
  const handlePreviousSong = () => {
    if (pointerHistory === null) return;
    let indexPrevSongInPlaylist; // index in playlist
    if (pointerHistory - 1 < 0) {
      indexPrevSongInPlaylist = listenedSongs[listenedSongs.length - 1];
    } else {
      indexPrevSongInPlaylist = listenedSongs[pointerHistory - 1];
    }
    dispatch(setPointerHistory(pointerHistory - 1 < 0 ? listenedSongs.length - 1 : pointerHistory - 1));
    dispatch(setIndexCurrentSong(indexPrevSongInPlaylist));
  };
  const handleNextSong = () => {
    let nextIndex;
    const lengthListenedSongs = listenedSongs.length; // length of list of songs listened
    if (pointerHistory >= lengthListenedSongs - 1 || pointerHistory === null) {
      if (isShuffle) {
        do {
          // fix 10
          nextIndex = Math.floor(Math.random() * 10 || playlist?.song?.items.length);
        } while (listenedSongs.includes(nextIndex));
      } else {
        nextIndex = pointerHistory === null ? 0 : indexCurrentSong + 1;
        if (nextIndex > playlist?.song?.items.length) nextIndex = 0;
      }
      dispatch(setPointerHistory(lengthListenedSongs <= 0 ? 0 : lengthListenedSongs));
      dispatch(setIndexCurrentSong(nextIndex));
      dispatch(pushListenedSongs(nextIndex));
      return;
    }
    // next pointer in list of songs listened
    dispatch(setPointerHistory(pointerHistory + 1));
    dispatch(setIndexCurrentSong(listenedSongs[pointerHistory + 1]));
  };
  // handle loop song
  const handleLoop = () => setIsLoop(!isLoop);

  // handle muted
  const handleMutedChange = () => setMuted(!muted);

  const handleGetCurrentSong = async () => {
    setIsLoading(true);
    try {
      const [streamUrls, infoSong] = await Promise.all([request.get(`/song?id=${songId}`), request.get(`/infosong?id=${songId}`)]);
      const streamUrl = streamUrls?.data ? (streamUrls.data[320] !== 'VIP' && streamUrls.data[320]) || streamUrls.data[128] : '';
      // if (streamUrl === '') alert(streamUrls.msg);
      setCurrentSong({
        ...infoSong.data,
        streamUrl
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // set volume bar = volume audio
    volumeBarRef.current.value = audioRef.current.volume * 100; // 1 * 100 - input value 100%
    handleInputRangeAnimation(volumeBarRef.current);
  }, []);

  useEffect(() => {
    console.log({ actions: 'get song', songId });
    if (songId) {
      handleGetCurrentSong();
      setIsPlaying(true);
    }
  }, [songId]);

  // fix
  useEffect(() => {
    console.log({ actions: 'get song', error });
    if (!error.includes('success')) {
      handleGetCurrentSong();
    }
  }, [error]);

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
                {/* <Flexbox alignCenter gx={1}>
                  <img src={currentSong?.thumbnail || currentSong?.thumbURL} alt='' className={cx('thumbnail')} />
                  <span>
                    <Text fz={14} tagName={'h4'} maxLine={2} className={cx('cl-white')}>
                      {currentSong?.title || ''}
                    </Text>
                    <Text fz={10} bold className={cx('cl-white', 'op-2')}>
                      {currentSong?.artists && currentSong?.artists[0] ? currentSong?.artists[0].name : ''}
                    </Text>
                  </span>
                </Flexbox> */}

                <Grid gx={1} className='align-items-center'>
                  <Col lg={5}>
                    <Thumbnail
                      isLoading={isLoading}
                      className={cx('thumbnail2', 'relative')}
                      src={currentSong?.thumbnail || currentSong?.thumbURL}
                    >
                      {isPlaying && <div className={cx('equalizer')}></div>}
                    </Thumbnail>
                  </Col>
                  <Col lg={7} className={'align-items-center'}>
                    <div>
                      <Text fz={14} isLoading={isLoading} maxLine={2} tagName={'h4'} className={cx('cl-white')}>
                        {currentSong?.title || ''}
                      </Text>
                      <Text fz={10} bold isLoading={isLoading} skeletonClassName={cx('mt-1')} className={cx('cl-white', 'op-2')}>
                        {currentSong?.artists && currentSong?.artists[0] ? currentSong?.artists[0].name : ''}
                      </Text>
                    </div>
                  </Col>
                </Grid>
              </Col>
              <Col lg={'fill'}>
                <Flexbox column alignCenter justifyBetween gy={3} className={cx('h-100')}>
                  <Flexbox gx={4}>
                    <ShuffleIcon className={cx('control-btn', 'cl-white', { active: isShuffle })} onClick={handleShuffle} />
                    <PreviousIcon className={cx('control-btn', 'cl-white')} onClick={handlePreviousSong} />
                    <Tippy content={`play and pause`} placement='top'>
                      <div>
                        <Flexbox
                          alignCenter
                          justifyCenter
                          className={cx('play-btn', 'rounded', 'bg-secondary', 'pointer')}
                          onClick={handlePlay}
                        >
                          {isPlaying ? (
                            <PlayIcon className={cx('control-btn', 'show-animation', 'cl-white')} />
                          ) : (
                            <PauseIcon className={cx('control-btn', 'show-animation', 'cl-white')} />
                          )}
                        </Flexbox>
                      </div>
                    </Tippy>
                    <NextIcon className={cx('control-btn', 'cl-white')} onClick={handleNextSong} />
                    <RepeatOneIcon className={cx('control-btn', 'cl-white', { active: isLoop })} onClick={handleLoop} />
                  </Flexbox>
                  <Grid className={cx('align-items-center w-100')} gx={2}>
                    <Col lg={1}>
                      <Flexbox alignCenter justifyCenter>
                        <Text ref={timeLeftRef} fz={12}>
                          00:00
                        </Text>
                      </Flexbox>
                    </Col>
                    <Col lg={10}>
                      <Flexbox alignCenter justifyCenter className={'w-100'}>
                        <input
                          ref={durationBarRef}
                          type='range'
                          defaultValue={0}
                          className={cx('duration-bar')}
                          onChange={handleDurationBarChange}
                        />
                      </Flexbox>
                    </Col>
                    <Col lg={1}>
                      <Flexbox alignCenter justifyCenter>
                        <Text ref={timeRightRef} fz={12}>
                          00:00
                        </Text>
                      </Flexbox>
                    </Col>
                  </Grid>
                  <audio
                    ref={audioRef}
                    autoPlay={isPlaying}
                    loop={isLoop}
                    muted={muted}
                    src={
                      currentSong?.streamUrl
                        ? currentSong?.streamUrl
                        : 'https://stream.nixcdn.com/NhacCuaTui2026/WaitingForYou-MONOOnionn-7733882.mp3?st=8hRiCvjotE2Zf8nfXqDTTg&e=1668156600&t=1668071682206'
                    }
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={audioOnEnd}
                  ></audio>
                </Flexbox>
              </Col>
              <Col lg={2}>
                <Flexbox gx={1} alignCenter>
                  <div className={cx({ 'volume-muted': muted }, 'relative pointer')} onClick={handleMutedChange}>
                    <VolumeIcon className={cx('volume-icon')} />
                  </div>
                  <input ref={volumeBarRef} type='range' className={cx('duration-bar', 'volume-bar')} onChange={handleVolumeChange} />
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
