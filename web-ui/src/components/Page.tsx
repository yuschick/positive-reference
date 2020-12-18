import React from 'react';
import styled from 'styled-components';

import { theme, spacing } from 'theme';

interface Props {
  className?: string;
}

const Page: React.FC<Props> = ({ className, children }) => {
  const { appMaxWidth } = theme;

  return (
    <PageContainer maxWidth={appMaxWidth} className={className}>
      {children}
    </PageContainer>
  );
};

const PageContainer = styled.main<{ maxWidth: string }>`
  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth};
  min-height: 100%;
  padding: ${spacing('lg')} ${spacing('lg')} ${spacing('xxxl')};
  width: 100%;
`;

export default Page;
