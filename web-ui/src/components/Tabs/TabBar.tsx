import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { breakpoint, color } from 'theme';

interface Props {
  activeTab: string;
  animate?: boolean;
}

interface BarProps {
  animate: boolean;
  left: number;
  diff: number;
  width: number;
}

const TabBar: React.FC<Props> = ({ activeTab, animate = true, children }) => {
  const [lineLeftPos, setLineLeftPos] = useState<number>(0);
  const [linePosDiff, setLinePosDiff] = useState<number>(0);
  const [lineWidth, setLineWidth] = useState<number>(0);

  useEffect(() => {
    if (!activeTab) return;
    const resizeUnderline = () => {
      const tab: HTMLElement | null = document.getElementById(`tab-${activeTab}`);
      if (!tab) return;

      setLinePosDiff(lineLeftPos - tab?.offsetLeft || 0);
      setLineWidth(tab?.getBoundingClientRect().width || 0);
      setLineLeftPos(tab?.offsetLeft || 0);
    };

    resizeUnderline();
  }, [activeTab]);

  return (
    <StyledTabBar animate={animate} left={lineLeftPos} diff={linePosDiff} width={lineWidth}>
      {children}
    </StyledTabBar>
  );
};

const StyledTabBar = styled.nav.attrs(() => ({
  role: 'tablist',
}))<BarProps>`
  align-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: max-content;
  position: relative;
  width: 100%;

  @media (min-width: ${breakpoint('lg')}) {
    border-bottom: 2px solid ${color('inactiveGrey')};

    &:before {
      background: ${color('green')};
      bottom: -2px;
      content: '';
      display: block;
      height: 2px;
      left: 0;
      position: absolute;
      transform: translateX(${({ left }) => left || 0}px);
      width: ${({ width }) => width || 0}px;

      ${props =>
        props.animate &&
        css<BarProps>`
          transition: all ${({ diff }) => (diff ? Math.abs(props.diff) / 1000 : 0.25)}s ease;
        `}
    }
  }
`;

export default TabBar;
