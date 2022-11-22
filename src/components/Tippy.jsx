import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Text } from '~/components/Ui';
import styles from '~/scss/components/Ui/Tippy.module.scss';
import { classNames } from '~/utils';

const cx = classNames.bind(styles);

const Tippy = (props) => {
  const { children, content, placement, interactive = false, space = 10, ...prop } = props;
  const [isShow, setIsShow] = useState(false);
  const [positionDetail, setPositionDetail] = useState({});
  const childrenRef = useRef(null);
  const tippyContainerRef = useRef(null);

  const handleMouseEnter = () => {
    // console.log('set show');
    setIsShow(true);
  };

  const handleMouseLeave = () => {
    // console.log('set hide');
    setIsShow(false);
  };

  const handleInteractive = () => {
    if (interactive) {
      setIsShow(true);
    }
  };

  const handleNodeClick = () => {
    setIsShow(!isShow);
  };
  const getPosition = (_placement = placement, arrSuggested = []) => {
    let top = 0,
      left = 0,
      padding = 0;
    // this is children
    const nodeOffset = childrenRef.current.getBoundingClientRect();
    // this is tooltip
    const tippyOffset = tippyContainerRef.current.getBoundingClientRect();
    const PLACEMENT_CALC = {
      x: {
        top: nodeOffset.top + nodeOffset.height / 2 - tippyOffset.height / 2
      },
      xStart: {
        top: nodeOffset.top
      },
      xEnd: {
        top: nodeOffset.bottom - tippyOffset.height
      },
      left: {
        left: nodeOffset.left - tippyOffset.width,
        padding: `0 ${space}px 0 0`
      },
      right: {
        left: nodeOffset.right,
        padding: `0 0 0 ${space}px`
      },
      y: {
        left: nodeOffset.left + nodeOffset.width / 2 - tippyOffset.width / 2
      },
      yStart: {
        left: nodeOffset.left
      },
      yEnd: {
        left: nodeOffset.right - tippyOffset.width
      },
      top: {
        top: nodeOffset.top - tippyOffset.height,
        padding: `0 0 ${space}px 0`
      },
      bottom: {
        top: nodeOffset.bottom,
        padding: `${space}px 0 0 0`
      }
    };

    switch (_placement) {
      case 'top':
        left = PLACEMENT_CALC.y.left;
        top = PLACEMENT_CALC.top.top;
        padding = PLACEMENT_CALC.top.padding;
        break;
      case 'top-start':
        left = PLACEMENT_CALC.yStart.left;
        top = PLACEMENT_CALC.top.top;
        padding = PLACEMENT_CALC.top.padding;
        break;
      case 'top-end':
        left = PLACEMENT_CALC.yEnd.left;
        top = PLACEMENT_CALC.top.top;
        padding = PLACEMENT_CALC.top.padding;
        break;
      case 'bottom':
        left = PLACEMENT_CALC.y.left;
        top = PLACEMENT_CALC.bottom.top;
        padding = PLACEMENT_CALC.bottom.padding;
        break;
      case 'bottom-start':
        left = PLACEMENT_CALC.yStart.left;
        top = PLACEMENT_CALC.bottom.top;
        padding = PLACEMENT_CALC.bottom.padding;
        break;
      case 'bottom-end':
        left = PLACEMENT_CALC.yEnd.left;
        top = PLACEMENT_CALC.bottom.top;
        padding = PLACEMENT_CALC.bottom.padding;
        break;
      case 'left':
        left = PLACEMENT_CALC.left.left;
        top = PLACEMENT_CALC.x.top;
        padding = PLACEMENT_CALC.left.padding;
        break;
      case 'left-start':
        left = PLACEMENT_CALC.left.left;
        top = PLACEMENT_CALC.xStart.top;
        padding = PLACEMENT_CALC.left.padding;
        break;
      case 'left-end':
        left = PLACEMENT_CALC.left.left;
        top = PLACEMENT_CALC.xEnd.top;
        padding = PLACEMENT_CALC.left.padding;
        break;
      case 'right':
        left = PLACEMENT_CALC.right.left;
        top = PLACEMENT_CALC.x.top;
        padding = PLACEMENT_CALC.right.padding;
        break;
      case 'right-start':
        left = PLACEMENT_CALC.right.left;
        top = PLACEMENT_CALC.xStart.top;
        padding = PLACEMENT_CALC.right.padding;
        break;
      case 'right-end':
        left = PLACEMENT_CALC.right.left;
        top = PLACEMENT_CALC.xEnd.top;
        padding = PLACEMENT_CALC.right.padding;
        break;
      default:
        left = window.innerWidth / 2 - tippyOffset.width / 2;
        top = window.innerHeight / 2 - tippyOffset.height / 2;
        break;
    }
    // if placement is center or content is not hide => return
    if (
      _placement === 'center' ||
      !(left < 0 || top < 0 || left + tippyOffset.width > window.innerWidth || top + tippyOffset.height > window.innerHeight)
    ) {
      console.log('STOP Placement: _____________________________' + _placement, content);
      return { top, left, padding };
    }
    // if (left < 0 || top < 0 || left + tippyOffset.width > window.innerWidth || top + tippyOffset.height > window.innerHeight) {
    console.log('Placement: ', _placement);
    // console.log({ top: top + 'px', left: left + 'px' });
    const suggestPlacement = [
      'top',
      'bottom',
      'top-start',
      'bottom-start',
      'top-end',
      'bottom-end',
      'left',
      'right',
      'left-start',
      'right-start',
      'left-end',
      'right-end'
    ];
    if (arrSuggested.length >= suggestPlacement.length) return getPosition('center', arrSuggested);
    let _suggestIndex;
    _suggestIndex = suggestPlacement.indexOf(_placement) + 1;
    if (_suggestIndex >= suggestPlacement.length) _suggestIndex = 0;
    arrSuggested.push(_suggestIndex);
    console.log('suggestPlacement: =====> ', suggestPlacement[_suggestIndex]);

    return getPosition(suggestPlacement[_suggestIndex], arrSuggested);
    // }
  };

  const handleSetPosition = () => {
    if (isShow) {
      const { top, left, padding } = getPosition();
      setPositionDetail({ top: top + 'px', left: left + 'px', padding });
    }
  };

  // set position when component mounted
  useEffect(() => {
    handleSetPosition();
  }, [isShow]);

  useEffect(() => {
    let timeId;
    const handleResize = () => {
      if (timeId) clearTimeout(timeId); // clearTimeout
      timeId = setTimeout(() => {
        handleSetPosition(); // handle get new position when window is resized
      }, 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* {console.log(positionDetail)} */}
      {React.cloneElement(children, {
        ...children,
        ref: childrenRef,

        onClick: children.props.onClick || handleNodeClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      })}
      {createPortal(
        <div
          ref={tippyContainerRef}
          style={positionDetail}
          className={cx('tippy-container')}
          onMouseEnter={handleInteractive}
          onMouseLeave={handleMouseLeave}
        >
          {content && isShow && (
            <div className={cx('tooltip-wrapper', 'bg-dark-alt', 'px-3', 'py-2')}>
              <Text fz={14} className={cx('cl-white')}>
                {content}
              </Text>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};
Tippy.propTypes = {};

export default Tippy;
