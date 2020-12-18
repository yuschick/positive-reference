import React from 'react';

import Div from 'components/Div';

const Rule = ({ vertical = false, white = false, ...props }) => {
  return (
    <Div
      width={vertical ? '0px' : undefined}
      height={!vertical ? '0px' : undefined}
      borderWidth="1px"
      borderColor={white ? '#fff' : 'lightGrey'}
      borderStyle={vertical ? 'none solid none none' : 'solid none none none'}
      opacity={white ? '0.5' : '1'}
      {...props}
    />
  );
};

export default Rule;
