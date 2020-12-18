import React from 'react';
import styled, { keyframes } from 'styled-components';

import Icon from 'components/Icon';

import { borderRadius, fontSize, spacing, color } from 'theme';

interface Props {
  title: string;
}

const Accordion: React.FC<Props> = ({ title, children }) => {
  return (
    <Details>
      <Summary>
        <SummaryContent>
          {title}
          <StyledIcon name="chevronDown" color="green" />
        </SummaryContent>
      </Summary>
      <Content>{children}</Content>
    </Details>
  );
};

const FadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledIcon = styled(Icon)`
  transition: transform 0.3s ease;
`;

const Content = styled.div`
  position: relative;
`;

const Details = styled.details`
  background: ${color('white')};
  border-radius: ${borderRadius('md')};
  padding: ${spacing('md')};

  *::selection {
    background: transparent;
  }

  &[open] {
    ${StyledIcon} {
      transform: rotate(180deg);
    }
    ${Content} {
      animation: ${FadeIn} 0.3s ease;
    }
  }
`;

const Summary = styled.summary`
  cursor: pointer;
  list-style-type: none;
  text-align: left;

  &::-webkit-details-marker,
  &::marker {
    display: none;
    visibility: none;
  }

  :focus {
    outline: 1px solid ${color('inactiveGrey')};
  }
`;

/* Need a content container to fix a Safari bug where Summaries cannot be flex */
const SummaryContent = styled.div`
  align-items: center;
  align-content: center;
  color: ${color('green')};
  cursor: pointer;
  display: flex;
  font-size: ${fontSize('body')};
  justify-content: space-between;

  ::-webkit-details-marker {
    display: none;
    visibility: none;
  }

  :focus {
    outline: 1px solid ${color('inactiveGrey')};
  }
`;

export default Accordion;
