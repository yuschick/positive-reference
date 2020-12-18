import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';

interface Props {
  color: string;
  name: string;
  label: string;
  value: number;
  step?: number;
  max?: number;
  min?: number;
  showLabelDisplay?: boolean;
  onChange: (_: any, val: number | number[]) => void;
}

const InputSlider: React.FunctionComponent<Props> = ({
  color,
  name,
  label,
  value,
  step = 1,
  max = 50,
  min = 1,
  showLabelDisplay = true,
  onChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(value);
  return (
    <SliderWrapper color={color}>
      <Slider
        name={name}
        value={sliderValue}
        aria-label={label}
        step={step}
        min={min}
        max={max}
        valueLabelDisplay={showLabelDisplay ? 'on' : 'off'}
        onChange={(_, val) => setSliderValue(val)}
        onChangeCommitted={onChange}
      />
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div<{ color: string }>`
  .MuiSlider-root {
    color: ${({ color }) => color};
  }
`;

export default InputSlider;
