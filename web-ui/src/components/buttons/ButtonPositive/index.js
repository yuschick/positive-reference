import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import StyledButton from './styles';

const ButtonPositive = ({ count, buttonLabel, clicked }) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <StyledButton
      count={count}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={() => {
        setOnHover(false);
        clicked();
      }}
    >
      {count ? (
        <Text className="positive-number">
          {onHover ? <Text className="on-hover">&#43;1</Text> : <Text>{count}</Text>}
        </Text>
      ) : (
        <>{onHover ? <Text className="on-hover">&#43;1</Text> : <Text>{buttonLabel}</Text>}</>
      )}
    </StyledButton>
  );
};

ButtonPositive.propTypes = {
  count: PropTypes.number,
  buttonLabel: PropTypes.string,
};

ButtonPositive.defaultProps = {
  count: 0,
  buttonLabel: '',
};

export default ButtonPositive;
