import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import { borderRadius, boxShadow, color, font, fontSize, spacing } from 'theme';

const styles = css`
  ${({ block }) => block && `display: block;`}
  
  ${({ flex }) => flex && `display: flex;`}
  ${({ inlineFlex }) => inlineFlex && `display: inline-flex;`}
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink};`}
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  ${({ flexSelf }) => flexSelf && `flex: ${flexSelf};`}
  ${({ column }) => column && `flex-direction: column;`}
  ${({ row }) => row && `flex-direction: row;`}
  ${({ alignCenter }) => alignCenter && `align-items: center;`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ justifyCenter }) => justifyCenter && `justify-content: center;`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}

  ${({ relative }) => relative && `position: relative;`}
  ${({ sticky }) => sticky && `position: sticky;`}
  ${({ absolute }) => absolute && `position: absolute;`}
  ${({ fixed }) => fixed && `position: fixed;`}
  
  ${({ width, ...props }) =>
    width && `width: ${spacing(width)(props) ? spacing(width)(props) : width};`}
  ${({ height, ...props }) =>
    height && `height: ${spacing(height)(props) ? spacing(height)(props) : height};`}
  ${({ maxWidth, ...props }) =>
    maxWidth && `max-width: ${spacing(maxWidth)(props) ? spacing(maxWidth)(props) : maxWidth};`}
  ${({ maxHeight, ...props }) =>
    maxHeight &&
    `max-height: ${spacing(maxHeight)(props) ? spacing(maxHeight)(props) : maxHeight};`}
  ${({ minWidth, ...props }) =>
    minWidth && `min-width: ${spacing(minWidth)(props) ? spacing(minWidth)(props) : minWidth};`}
  ${({ minHeight, ...props }) =>
    minHeight &&
    `min-height: ${spacing(minHeight)(props) ? spacing(minHeight)(props) : minHeight};`}
    
  ${({ top, ...props }) => top && `top: ${spacing(top)(props) ? spacing(top)(props) : top};`}
  ${({ right, ...props }) =>
    right && `right: ${spacing(right)(props) ? spacing(right)(props) : right};`}
  ${({ bottom, ...props }) =>
    bottom && `bottom: ${spacing(bottom)(props) ? spacing(bottom)(props) : bottom};`}
  ${({ left, ...props }) => left && `left: ${spacing(left)(props) ? spacing(left)(props) : left};`}

  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ overflowX }) => overflowX && `overflow-x: ${overflowX};`}
  ${({ overflowY }) => overflowY && `overflow-y: ${overflowY};`}
  
  ${({ margin, ...props }) => margin && `margin: ${spacing(...margin)(props) || margin.join(' ')};`}
  ${({ marginTop, ...props }) =>
    marginTop &&
    `margin-top: ${spacing(marginTop)(props) ? spacing(marginTop)(props) : marginTop};`}
  ${({ marginRight, ...props }) =>
    marginRight &&
    `margin-right: ${spacing(marginRight)(props) ? spacing(marginRight)(props) : marginRight};`}
  ${({ marginBottom, ...props }) =>
    marginBottom &&
    `margin-bottom: ${spacing(marginBottom)(props) ? spacing(marginBottom)(props) : marginBottom};`}
  ${({ marginLeft, ...props }) =>
    marginLeft &&
    `margin-left: ${spacing(marginLeft)(props) ? spacing(marginLeft)(props) : marginLeft};`}
  
  ${({ padding, ...props }) =>
    padding && `padding: ${spacing(...padding)(props) || padding.join(' ')};`}
  ${({ paddingTop, ...props }) =>
    paddingTop &&
    `padding-top: ${spacing(paddingTop)(props) ? spacing(paddingTop)(props) : paddingTop};`}
  ${({ paddingRight, ...props }) =>
    paddingRight &&
    `padding-right: ${spacing(paddingRight)(props) ? spacing(paddingRight)(props) : paddingRight};`}
  ${({ paddingBottom, ...props }) =>
    paddingBottom &&
    `padding-bottom: ${
      spacing(paddingBottom)(props) ? spacing(paddingBottom)(props) : paddingBottom
    };`}
  ${({ paddingLeft, ...props }) =>
    paddingLeft &&
    `padding-left: ${spacing(paddingLeft)(props) ? spacing(paddingLeft)(props) : paddingLeft};`}
  
  ${({ color: c, ...props }) => c && `color: ${color(c)(props) ? color(c)(props) : c};`}
     
  ${({ backgroundColor, ...props }) =>
    backgroundColor &&
    `background-color: ${
      color(backgroundColor)(props) ? color(backgroundColor)(props) : backgroundColor
    };`}    
  ${({ backgroundImage }) => backgroundImage && `background-image: ${backgroundImage};`}
  ${({ backgroundPosition }) => backgroundPosition && `background-position: ${backgroundPosition};`}
  ${({ backgroundSize }) => backgroundSize && `background-size: ${backgroundSize};`}
  
  ${({ outline }) => outline !== undefined && `outline: ${outline};`}

  ${({ border }) => border && `border: ${border};`}
  ${({ borderColor, ...props }) =>
    borderColor && `border-color: ${color(borderColor)(props) || borderColor};`}    
  ${({ borderStyle }) => borderStyle && `border-style: ${borderStyle};`}
  ${({ borderWidth }) => borderWidth && `border-width: ${borderWidth};`}
  
  ${({ horizontalBorders, ...props }) =>
    horizontalBorders &&
    `border-style: solid none solid; border-color: ${color('lightGrey')(
      props
    )}; border-width: 1px;`}
  
  ${({ topBorder, ...props }) =>
    topBorder &&
    `border-style: solid none none; border-color: ${color('lightGrey')(props)}; border-width: 1px;`}
  
  ${({ bottomBorder, ...props }) =>
    bottomBorder &&
    `border-style: none none solid; border-color: ${color('lightGrey')(props)}; border-width: 1px;`}

  ${({ leftBorder, ...props }) =>
    leftBorder &&
    `border-style: none none none solid; border-color: ${color('lightGrey')(
      props
    )}; border-width: 1px;`}

  ${({ rightBorder, ...props }) =>
    rightBorder &&
    `border-style: none solid none none; border-color: ${color('lightGrey')(
      props
    )}; border-width: 1px;`}

  ${({ borderRadius: br, ...props }) =>
    br && `border-radius: ${borderRadius(...br)(props) || br.join(' ')};`}
  
  ${({ boxShadow: bs, ...props }) =>
    bs && `box-shadow: ${boxShadow(bs)(props) ? boxShadow(bs)(props) : bs};`}
  
  ${({ bold, ...props }) => bold && `font-family: ${font('bold')(props)};`}
  
  ${({ fontSize: fs, ...props }) =>
    fs && `font-size: ${fontSize(fs)(props) ? fontSize(fs)(props) : fs};`}

  ${({ fontFamily, ...props }) =>
    fontFamily && `font-family: ${font(fontFamily)(props) || fontFamily};`}

  ${({ textAlign }) => textAlign !== undefined && `text-align: ${textAlign};`}
  ${({ textDecoration }) => textDecoration !== undefined && `text-decoration: ${textDecoration};`}
  ${({ textOverflow }) => textOverflow !== undefined && `text-overflow: ${textOverflow};`}
  
  ${({ lineHeight, ...props }) =>
    lineHeight &&
    `line-height: ${spacing(lineHeight)(props) ? spacing(lineHeight)(props) : lineHeight};`}

  ${({ whiteSpace }) => whiteSpace !== undefined && `white-space: ${whiteSpace};`}

  ${({ verticalAlign }) => verticalAlign !== undefined && `vertical-align: ${verticalAlign};`}
  
  ${({ transform }) => transform !== undefined && `transform: ${transform};`}
  
  ${({ transformOrigin }) =>
    transformOrigin !== undefined && `transform-origin: ${transformOrigin};`}
  
  ${({ opacity }) => opacity !== undefined && `opacity: ${opacity};`}
  
  ${({ hidden }) => hidden === true && `visibility: hidden;`}
  
  ${({ zIndex }) => zIndex !== undefined && `z-index: ${zIndex};`}
  
  ${({ cursor }) => cursor !== undefined && `cursor: ${cursor};`}
  
  ${({ pointerEvents }) => pointerEvents !== undefined && `pointer-events: ${pointerEvents};`}
  
  ${({ transition }) => transition !== undefined && `transition: ${transition};`}
  
  ${({ willChange }) => willChange !== undefined && `will-change: ${willChange};`}
`;

const StyledElement = styled.span`
  ${() => styles};
`;

const StyledAnimatedElement = styled(animated.span)`
  ${() => styles};
`;

export { StyledElement, StyledAnimatedElement };
