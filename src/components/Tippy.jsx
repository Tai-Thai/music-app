import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Text } from '~/components/Ui';
import styles from '~/scss/components/Ui/Tippy.module.scss';
import { classNames } from '~/utils';

const cx = classNames.bind(styles);

const Tippy = (props) => {
  const { children, content, placement, space = 10, ...prop } = props;
  const [isShow, setIsShow] = useState(false);
  const [positionDetail, setPositionDetail] = useState({});
  const childrenRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    // console.log('set show');
    setIsShow(true);
  };

  const handleMouseLeave = () => {
    // console.log('set hide');
    setIsShow(false);
  };
  const getPosition = (_placement = placement, arrSuggested = []) => {
    let top = 'unset',
      left = 'unset';
    // this is children
    const nodeOffset = childrenRef.current.getBoundingClientRect();
    // this is tooltip
    const tooltipOffset = tooltipRef.current.getBoundingClientRect();
    switch (_placement) {
      case 'top':
        left = nodeOffset.left + nodeOffset.width / 2 - tooltipOffset.width / 2;
        top = nodeOffset.top - tooltipOffset.height - space;
        break;
      case 'top-start':
        left = nodeOffset.left;
        top = nodeOffset.top - tooltipOffset.height - space;
        break;
      case 'top-end':
        left = nodeOffset.right;
        top = nodeOffset.top - tooltipOffset.height - space;
        break;
      case 'bottom':
        left = nodeOffset.left + nodeOffset.width / 2 - tooltipOffset.width / 2;
        top = nodeOffset.bottom + space;
        break;
      case 'bottom-start':
        left = nodeOffset.left;
        top = nodeOffset.bottom + space;
        break;
      case 'bottom-end':
        left = nodeOffset.right;
        top = nodeOffset.bottom + space;
        break;
      case 'left':
        left = nodeOffset.left - tooltipOffset.width - space;
        top = nodeOffset.top + nodeOffset.height / 2 - tooltipOffset.height / 2;
        break;
      case 'left-start':
        left = nodeOffset.left - tooltipOffset.width - space;
        top = nodeOffset.top;
        break;
      case 'left-end':
        left = nodeOffset.left - tooltipOffset.width - space;
        top = nodeOffset.bottom;
        break;
      case 'right':
        left = nodeOffset.right + space;
        top = nodeOffset.top + nodeOffset.height / 2 - tooltipOffset.height / 2;
        break;
      case 'right-start':
        left = nodeOffset.right + space;
        top = nodeOffset.top;
        break;
      case 'right-end':
        left = nodeOffset.right + space;
        top = nodeOffset.bottom;
        break;
      default:
        left = window.innerWidth / 2 - tooltipOffset.width / 2;
        top = window.innerHeight / 2 - tooltipOffset.height / 2;
        break;
    }
    // if placement is center or content is not hide => return
    if (
      _placement === 'center' ||
      !(left < 0 || top < 0 || left + tooltipOffset.width > window.innerWidth || top + tooltipOffset.height > window.innerHeight)
    ) {
      console.log('STOP________________________________________________________', content);
      return { top: top + 'px', left: left + 'px' };
    }
    // if (left < 0 || top < 0 || left + tooltipOffset.width > window.innerWidth || top + tooltipOffset.height > window.innerHeight) {
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
      const position = getPosition();
      setPositionDetail(position);
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

        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      })}
      {content &&
        isShow &&
        createPortal(
          <div ref={tooltipRef} style={positionDetail} className={cx('tooltip-wrapper', 'bg-dark-alt', 'px-3', 'py-2')}>
            <Text fz={14} className={cx('cl-white')}>
              {content}
            </Text>
          </div>,
          document.body
        )}
    </>
  );
};
Tippy.propTypes = {};

export default Tippy;
