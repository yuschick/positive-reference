import React from 'react';
import styled from 'styled-components';

import Div from 'components/Div';

interface Props {
  inline?: boolean;
  [x: string]: any;
}

const Flex: React.FC<Props> = ({ inline, ...props }) => (
  <StyledDiv flex={!inline} inlineFlex={inline} {...props} />
);

const StyledDiv = styled(Div)`
  ${({ flexWrap }: { flexWrap: boolean }) => flexWrap && `flex-wrap: wrap;`}
`;

export default Flex;
