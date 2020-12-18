import React from 'react';
import styled, { css } from 'styled-components';

import { font, fontSize, color, breakpoint } from 'theme';

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingAppearances = HeadingTags | 'h1-jumbo';
export type Alignments = 'left' | 'center' | 'right';

export interface Props {
  as: HeadingTags;
  forwardedAs?: HeadingTags;
  appearAs?: HeadingAppearances;
  align?: Alignments;
  className?: string;
}

const Heading: React.FC<Props> = ({
  as,
  forwardedAs,
  appearAs = as || forwardedAs,
  align,
  className,
  children,
}) => {
  return (
    <StyledHeading
      as={as}
      forwardedAs={forwardedAs}
      appearAs={appearAs}
      align={align}
      className={className}
    >
      {children}
    </StyledHeading>
  );
};

const H1Styles = css<{ align?: Alignments }>`
  font-size: ${fontSize('lg')};
  text-align: ${({ align }) => align};
`;

const H1JumboStyles = css<{ align?: Alignments }>`
  font-size: ${fontSize('xl')};
  text-align: ${({ align }) => align || 'center'};

  @media (max-width: ${breakpoint('sm')}) {
    font-size: ${fontSize('lg')};
  }
`;

const H2Styles = css`
  font-size: ${fontSize('body')};
  letter-spacing: 0.075em;
  text-transform: uppercase;
`;

const H3Styles = css`
  font-size: ${fontSize('body')};
`;

const H4Styles = css`
  color: ${color('grey')};
  letter-spacing: 0.075em;
  font-size: ${fontSize('xs')};
  text-transform: uppercase;
`;

const H5Styles = css`
  color: ${color('grey')};
  font-size: ${fontSize('xxs')};
  letter-spacing: 0.075em;
  text-transform: uppercase;
`;

const BaseHeading = css<{ align?: Alignments }>`
  font-family: ${font('bold')};
  line-height: 1.25;
  margin: 0;
  text-align: ${({ align }) => align};
  white-space: pre-wrap;
`;

const StyledHeading = styled.div<Props>`
  ${BaseHeading};

  ${({ appearAs }) => appearAs === 'h1' && H1Styles}
  ${({ appearAs }) => appearAs === 'h1-jumbo' && H1JumboStyles}
  ${({ appearAs }) => appearAs === 'h2' && H2Styles}
  ${({ appearAs }) => appearAs === 'h3' && H3Styles}
  ${({ appearAs }) => appearAs === 'h4' && H4Styles}
  ${({ appearAs }) => appearAs === 'h5' && H5Styles}
`;

export default Heading;
export const HeadingStyles = {
  base: BaseHeading,
  h1: H1Styles,
  'h1-jumbo': H1JumboStyles,
  h2: H2Styles,
  h3: H3Styles,
  h4: H4Styles,
  h5: H5Styles,
  h6: H5Styles,
};
