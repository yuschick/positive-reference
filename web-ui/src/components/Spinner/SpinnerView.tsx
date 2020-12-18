import React from 'react';
import styled from 'styled-components';

import Spinner from './Spinner';

import { Color } from 'types/theme';

interface Props {
  color?: Color;
  small?: boolean;
}

const SpinnerView: React.FunctionComponent<Props> = ({ color = Color.green, small = false }) => {
  return (
    <Wrapper>
      <Spinner small={small} color={color} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  align-content: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

export default SpinnerView;
