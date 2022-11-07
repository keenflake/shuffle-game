import { FC } from 'react';

import { SVGProps } from '../../types';
import { Close, Cog, QuestionMark, Trash } from './svgs';

const icons = {
  close: Close,
  cog: Cog,
  question_mark: QuestionMark,
  trash: Trash,
};

export interface IconProps extends SVGProps {
  kind: keyof typeof icons;
}

export const Icon: FC<IconProps> = ({ kind, ...props }) => {
  const Icon = icons[kind];

  return <Icon {...props} />;
};
