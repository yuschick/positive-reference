import React from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';

import Text from 'components/Text';
import { spacing, theme } from 'theme';
import { hexToRgbaString } from 'utils/helpers';

const StrengthCountCircle = ({ data, springProps }) => {
  const { zIndex, status, slug, name, value, color } = data;
  const { containerHeight, fontSize, diameter, opacity, transform } = springProps;

  return (
    <animated.div
      key={slug}
      style={{
        height: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: diameter,
        opacity,
        transform,
        willChange: 'width, opacity, transform',
        zIndex: status === 'maximized' ? zIndex : -zIndex,
      }}
    >
      <animated.div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: containerHeight,
        }}
      >
        <animated.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            borderRadius: '100%',
            verticalAlign: 'middle',
            backgroundColor: color,
            fontFamily: theme.font.bold,
            fontSize,
            width: diameter,
            height: diameter,
            willChange: 'fontSize, width, height',
          }}
        >
          {status === 'maximized' ? value : ''}
        </animated.div>
      </animated.div>

      {status === 'maximized' ? (
        <StyledText forwardedAs="p" size="sm">
          {name}
        </StyledText>
      ) : null}
    </animated.div>
  );
};

const StyledText = styled(Text)`
  background: ${hexToRgbaString(theme.color.white, 0.9)};
  padding: 0 ${spacing('sm')};
  white-space: nowrap;
`;

export default StrengthCountCircle;
