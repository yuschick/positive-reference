import React from 'react';
import styled, { css } from 'styled-components';

import { HeadingAppearances, Alignments, HeadingStyles } from './Heading';

import { color as clr, font, fontSize } from 'theme';
import { COLOR_NAME, FONT_SIZE } from 'types/theme';

type TextTags = 'span' | 'p';
type TextAppearances = TextTags | 'tip' | 'tip-small';
interface Props {
  as?: TextTags;
  forwardedAs?: TextTags;
  appearAs?: TextAppearances | HeadingAppearances;
  align?: Alignments;
  className?: string;
  color?: COLOR_NAME;
  bold?: boolean;
  truncate?: boolean;
  size?: FONT_SIZE;
  role?: string;
}

const Text: React.FC<Props> = ({
  as = 'span',
  forwardedAs,
  appearAs = as || forwardedAs,
  align,
  className,
  color,
  bold,
  truncate,
  size,
  children,
}) => {
  return (
    <StyledText
      as={as}
      forwardedAs={forwardedAs}
      appearAs={appearAs}
      align={align}
      color={color}
      bold={bold}
      truncate={truncate}
      size={size}
      className={className}
    >
      {children}
    </StyledText>
  );
};

const TipStyles = css`
  font-family: ${font('tip')};
  font-size: ${fontSize('tip')};
  line-height: inherit;
  text-align: center;
`;

const TipSmallStyles = css`
  font-family: ${font('tip')};
  font-size: ${fontSize('body')};
  line-height: 1.25;
  text-align: center;
`;

const TruncateStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledText = styled.span<Props>`
  ${({ appearAs }) => appearAs === 'tip' && TipStyles}
  ${({ appearAs }) => appearAs === 'tip-small' && TipSmallStyles}

  ${({ appearAs }) =>
    Object.keys(HeadingStyles).includes(appearAs as string) &&
    css`
      ${HeadingStyles.base};
      ${HeadingStyles[appearAs as HeadingAppearances]};
    `}

  color: ${({ color }) => clr(color)};
  font-family: ${({ bold }) => bold && font('bold')};
  font-size: ${({ size }) => size && fontSize(size)};
  text-align: ${({ align }) => align};
  white-space: pre-wrap;

  ${({ truncate }) => truncate && TruncateStyles}
`;

export default Text;
