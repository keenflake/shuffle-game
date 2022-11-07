import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={clsx(
        'px-4',
        'py-2',
        'border-none',
        'bg-dark-teal hover:opacity-90 active:opacity-80',
        'rounded-md',
        'transition-opacity',
        'font-medium',
        'text-white',
        className,
      )}
      {...props}
    />
  );
};
