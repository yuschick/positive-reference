import React from 'react';
import styled from 'styled-components';

import { breakpoint, borderRadius, color, spacing } from 'theme';

const CardsWrapper: React.FC = ({ children }) => (
  <Wrapper count={React.Children.count(children)}>{children}</Wrapper>
);

const Wrapper = styled.section<{ count: number }>`
  --maxCardsPerRow: ${({ count }) => (count < 3 ? count : 3)};
  --padding: ${spacing('md')};
  --gap: ${spacing('xl')};
  --cardWidth: 240px;

  align-items: center;
  align-content: center;
  background: ${color('white')};
  border-radius: ${borderRadius('sm')};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--cardWidth), min-content));
  grid-gap: var(--gap);
  justify-content: center;
  margin: 0 auto;
  min-width: var(----cardWidth);
  padding: var(--padding);

  @media (min-width: ${breakpoint('lg')}) {
    grid-template-columns: repeat(var(--maxCardsPerRow), minmax(var(--cardWidth), min-content));
    width: fit-content;
  }
`;

export default CardsWrapper;
