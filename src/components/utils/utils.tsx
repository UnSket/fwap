import React from 'react';
import { HashLink } from 'react-router-hash-link';

export const CollisionLink = React.forwardRef<HTMLAnchorElement, any>(
  (props, ref) => (
    <HashLink smooth {...props} />
  ),
);

export const useClasses = (...classes: Array<string>) => classes.join(' ');
