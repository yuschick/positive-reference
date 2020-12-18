import React from 'react';
import styled from 'styled-components';

import Element from 'components/Element';
import SanityIllustration from 'components/SanityIllustration';
import StrengthImage from 'components/StrengthImage';

import { borderRadius, color } from 'theme';

interface Props {
  illustration: {
    backgroundColor: string;
    circleColor: string;
    slug: string;
    width?: string;
    right?: string;
    bottom?: string;
  };
  name: string;
}

const CardHeader: React.FC<Props> = ({ illustration, name }) => {
  const { slug: imageSlug, backgroundColor, circleColor, width, right, bottom } = illustration;

  return (
    <Header bg={backgroundColor} tagName="header">
      <CircleWrapper tagName="div">
        <Circle bg={circleColor} className="circle" />
      </CircleWrapper>
      {/*
          TODO: This conditional exists because most images live under
          Strengths in Sanity, but a couple others are under Illustrations.
          A pitch will need to be made to move all illustrations into the
          same location, and update our components to match
        */}
      {imageSlug === 'joy' || imageSlug === 'spot-card' ? (
        <ImageWrapper right={right} bottom={bottom}>
          <SanityIllustration slug={imageSlug} alt={name} sizes={width} />
        </ImageWrapper>
      ) : (
        <ImageWrapper right="-20px" bottom="-10px">
          <StrengthImage slug={imageSlug} alt={name} sizes="200px" />
        </ImageWrapper>
      )}
    </Header>
  );
};

interface StyledProps {
  bg?: string;
  right?: string;
  bottom?: string;
}

const Header = styled(Element)`
  background: ${props => color(props.bg)};
  border-top-left-radius: ${borderRadius('xs')};
  border-top-right-radius: ${borderRadius('xs')};
  height: 134px;
  overflow: visible;
  position: relative;
`;

const CircleWrapper = styled(Header)`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;

const Circle = styled.div<StyledProps>`
  background: ${props => color(props.bg)};
  border-radius: 50%;
  bottom: -50px;
  height: 174px;
  position: absolute;
  right: -30px;
  transform-origin: 100% 100%;
  transition: all 0.5s cubic-bezier(0.53, 0.28, 0.55, 1.62);
  width: 174px;
`;

const ImageWrapper = styled.div<StyledProps>`
  bottom: ${props => props.bottom};
  position: absolute;
  right: ${props => props.right};

  img {
    transform-origin: center;
    transition: transform 0.5s ease;
  }
`;

export default CardHeader;
