import clsx from 'clsx';
import { useField } from 'formik';
import { ComponentPropsWithoutRef, FC } from 'react';

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'name'>;

export interface TextFieldProps extends InputProps {
  name: string;
}

export const TextField: FC<TextFieldProps> = ({ className, name, ...props }) => {
  const [fieldProps] = useField(name);

  return (
    <input
      className={clsx(
        'w-full',
        'px-4',
        'py-3',
        'border-2',
        'border-gray-200 hover:border-gray-300 focus:border-dark-teal',
        'rounded-md',
        'transition-colors',
        'font-medium',
        'leading-none',
      )}
      {...props}
      {...fieldProps}
    />
  );
};
