import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Text } from '~/components/Ui';
import styles from '~/scss/components/Ui/Tippy.module.scss';
import { classNames } from '~/utils';

const cx = classNames.bind(styles);

export const Tippy = (props) => {
  const { children, content, position, space = 10, ...prop } = props;
  const [isShow, setIsShow] = useState(true);
  const [positionDetail, setPositionDetail] = useState({});
  const childrenRef = useRef(null);

  const handleMouseEnter = () => {
    console.log('set show');
    setIsShow(true);
  };

  const handleMouseLeave = () => {
    console.log('set hide');
    setIsShow(false);
  };

  useEffect(() => {
    // console.log({ childrenref: childrenRef.current });
    const clientReact = childrenRef.current.getBoundingClientRect();
    console.log({ clientReact: clientReact });
    const left = clientReact.right + space + 'px';
    const top = clientReact.top - clientReact.height / 2 + 'px';
    setPositionDetail({ left, top });
  }, []);

  return (
    <>
      {console.log(positionDetail)}
      {React.cloneElement(children, {
        ...children,
        ref: childrenRef,

        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      })}
      {content &&
        isShow &&
        createPortal(
          <div style={positionDetail} className={cx('tooltip-wrapper', 'bg-dark-alt', 'p-3')}>
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
