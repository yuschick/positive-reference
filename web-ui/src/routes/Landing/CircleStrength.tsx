import React from 'react';
import styled from 'styled-components';
import { StrengthSlug } from 'positive-store';

import StrengthImage from 'components/StrengthImage';

import { color } from 'theme';

interface Props {
  slug: StrengthSlug;
  alt: string;
}

const CircleStrength: React.FunctionComponent<Props> = ({ slug, alt }) => {
  return (
    <Container>
      <Circle />
      <StrengthImage slug={slug} alt={alt} sizes="192px" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  img {
    position: relative;
    z-index: 1;
  }
`;

const Circle = styled.div`
  background: ${color('yellow')};
  border-radius: 50%;
  height: 136px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 136px;
  z-index: 0;
`;
export default CircleStrength;
