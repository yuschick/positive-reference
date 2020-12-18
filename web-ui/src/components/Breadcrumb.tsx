import React from 'react';
import styled from 'styled-components';

import Text from 'components/Text';
import { spacing } from 'theme';

interface Props {
  crumbs: JSX.Element[];
}

const Breadcrumb: React.FC<Props> = ({ crumbs, ...props }) => {
  return (
    <StyledContainer {...props}>
      <Text as="p">
        {crumbs.map((crumb: JSX.Element, index: number) => (
          <React.Fragment key={`crumb${index}`}>
            <Text>{crumb}</Text>

            {index < crumbs.length - 1 && <Text>/</Text>}
          </React.Fragment>
        ))}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;

  span {
    margin-right: ${spacing('md')};
  }
`;

export default Breadcrumb;
