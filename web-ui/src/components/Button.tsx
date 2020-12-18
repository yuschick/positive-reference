import React from 'react';

import Element from 'components/Element';

interface Props {
  type?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ type = 'button', ...props }) => (
  <Element tagName="button" type={type} {...props} />
);

export default Button;
