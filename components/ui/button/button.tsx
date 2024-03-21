'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { LoadSvg } from '@/public/svg';
import scss from '@/components/scss/button.module.scss';

interface Props {
  children: React.ReactNode;
  style?: keyof TStyles;
  icon?: {
    svg: React.ReactElement;
    position: keyof TPosition;
  };
  disabled?: boolean;
  width?: number;
  type?: keyof TTypes;
  load?: boolean | string;
  onClick?: () => void;
  redirect?: string;
  open?: string | URL;
  adaptive?: boolean;
  animation?: boolean;
  size?: TSize;
}

type TSize = 'small';

type TPosition = {
  right: string;
  left: string;
};

type TStyles = {
  white: string;
  logout: string;
};

type TTypes = {
  button: string;
  submit: string;
};

export default function Button({
  children,
  style,
  icon,
  disabled = false,
  width,
  type = 'button',
  load = false,
  onClick,
  redirect,
  open,
  adaptive = false,
  animation,
  size,
}: Readonly<Props>) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const redirectToPage = (path: string) => {
    router.push(path);
  };

  const openTab = (path: string | URL) => {
    setIsLoading(true);
    setIsDisabled(true);

    window.open(path.toString(), '_blank');
  };

  const renderButtonContent = () => {
    if (load || isLoading) {
      return typeof load === 'string' ? (
        <>
          <LoadSvg
            className={scss.load}
            style={
              style === 'white'
                ? {
                    fontSize: '1.15rem',
                    fill: 'var(--accent-1)',
                  }
                : {
                    fontSize: '1.15rem',
                    fill: 'var(--accent-6)',
                  }
            }
          />
          {load}
        </>
      ) : (
        <>
          <LoadSvg
            className={scss.load}
            style={
              style === 'white'
                ? {
                    fontSize: '1.15rem',
                    fill: 'var(--accent-1)',
                  }
                : {
                    fontSize: '1.15rem',
                    fill: 'var(--accent-6)',
                  }
            }
          />
          {isLoading ? children : null}
        </>
      );
    }

    return (
      <>
        {icon &&
          icon.position === 'left' &&
          React.cloneElement(icon.svg, {
            className: scss.icon,
          })}
        {children}
        {icon &&
          icon.position === 'right' &&
          React.cloneElement(icon.svg, {
            className: scss.icon,
          })}
      </>
    );
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (redirect) {
      redirectToPage(redirect);
    } else if (open) {
      openTab(open);
    }
  };

  const buttonClassName = [
    scss.button,
    style && scss[style],
    (disabled || isDisabled) && scss.disabled,
    adaptive && scss.adaptive,
    animation && scss.animated,
    (load || isLoading) && scss.button_load,
    size && scss[size],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      disabled={(typeof load === 'boolean' && load === true) || disabled}
      style={width ? { maxWidth: width } : undefined}
      onClick={handleClick}
      className={buttonClassName}
    >
      {renderButtonContent()}
    </button>
  );
}
