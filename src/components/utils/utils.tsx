import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';

export const CollisionLink = React.forwardRef<HTMLAnchorElement, any>(
  (props, ref) => (
    <HashLink smooth {...props} />
  ),
);

export const classes = (...classes: Array<string>) => classes.join(' ');

export const getUrlFromImgKey = (key: string) => `/api/files/${key}.png`;

export const useFlag = (): [boolean, () => void, () => void] => {
  const [flag, setFlag] = useState<boolean>(false);

  const setTrue = () => setFlag(true);
  const setFalse = () => {
    setTimeout(() => setFlag(false), 1000);
  };
  return [flag, setFalse, setTrue];
};

export const formatCardNumber = (cardNumber: number) => {
  if (cardNumber === 6 || cardNumber === 9) {
    return `${cardNumber}.`;
  }
  return `${cardNumber}`;
};
