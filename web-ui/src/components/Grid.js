import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import { spacing } from 'theme';

const StyledDiv = styled(Div)`
  display: grid;

  ${({ columnGap, ...props }) =>
    columnGap &&
    `grid-column-gap: ${spacing(columnGap)(props) ? spacing(columnGap)(props) : columnGap};`}
    
  ${({ rowGap, ...props }) =>
    rowGap && `grid-row-gap: ${spacing(rowGap)(props) ? spacing(rowGap)(props) : rowGap};`}
  
  ${({ columns }) => columns && `grid-template-columns: ${columns};`}
  
  ${({ autoRows }) => autoRows && `grid-auto-rows: ${autoRows};`}
`;

const Grid = ({ gap, columnGap = gap, rowGap = gap, ...props }) => (
  <StyledDiv columnGap={columnGap} rowGap={rowGap} {...props} />
);

Grid.propTypes = {
  columnGap: PropTypes.string,
  columns: PropTypes.string,
  autoRows: PropTypes.string,
  gap: PropTypes.string,
  rowGap: PropTypes.string,
};

export default Grid;
