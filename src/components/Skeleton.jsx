import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Skeleton.module.scss';

const cx = classNames.bind(styles);

export const SkeletonContainer = (props) => {
  const { children, className, tagName: TagName = 'div', isLoading, skeletonWidth, skeletonHeight, skeletonColor, ...prop } = props;
  const _className = cx(className, { 'skeleton-container': isLoading });
  return (
    <TagName
      className={_className}
      style={{ width: isLoading && skeletonWidth, height: isLoading && skeletonHeight, backgroundColor: skeletonColor }}
      {...prop}
    >
      {children}
    </TagName>
  );
};

export const Skeleton = forwardRef((props, ref) => {
  const {
    children,
    className,
    style = {},
    skeletonType,
    tagName: TagName = 'div',
    isLoading,
    skeletonWidth,
    skeletonHeight,
    skeletonClassName,
    skeletonStyle = {},
    ...prop
  } = props;
  const content = skeletonType === 'text' && isLoading ? '.' : children;
  const _skeletonStyle = isLoading ? skeletonStyle : {};
  const _className = cx(className, {
    [skeletonClassName]: isLoading,
    'skeleton-loading': isLoading,
    [`skeleton-${skeletonType}`]: skeletonType && isLoading
  });
  // if (skeletonStyle && skeletonType == 'thumbnail') {
  //   console.log({ skeletonStyle, _skeletonStyle });
  //   console.log({
  //     ...style,
  //     ...skeletonStyle,
  //     width: isLoading && skeletonWidth,
  //     height: isLoading && skeletonHeight
  //   });
  // }
  if (skeletonType == 'thumbnail') {
    console.log({ skeletonStyle, _skeletonStyle, isLoading });
  }
  return (
    <TagName
      ref={ref}
      className={_className}
      style={{
        ...style,
        ..._skeletonStyle,
        width: isLoading && skeletonWidth,
        height: isLoading && skeletonHeight
      }}
      {...prop}
    >
      {content}
    </TagName>
  );
});

Skeleton.propTypes = {};
