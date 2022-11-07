import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {}

export const Container: FC<ContainerProps> = ({ className, ...props }) => {
  return <div className={clsx('max-w-7xl', 'mx-auto', 'px-6', className)} {...props} />;
};
