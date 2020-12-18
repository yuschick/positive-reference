import React from 'react';
import styled from 'styled-components';

import { spacing } from 'theme';

interface Props {
  className?: string;
  forwardRef?: any;
}

const PanelContent: React.FC<Props> = ({ className, forwardRef, children }) => {
  return (
    <StyledContent ref={forwardRef} className={className} data-autofocus-inside>
      {children}
    </StyledContent>
  );
};

const StyledContent = styled.main`
  grid-area: content;
  height: 100%;
  overflow-y: auto;
  padding: ${spacing('xl')};
`;

export default PanelContent;
