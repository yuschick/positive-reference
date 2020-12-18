import React, { ReactElement } from 'react';

import { StyledElement, StyledAnimatedElement } from 'components/Element/styles';

interface Props {
  /* Doing this catchall because the way this component is used,
  we can't possibly type every possible attribute coming in.
  This also devalues the point of typechecking as well and this props
  pattern should be reconsidered
  */
  [x: string]: any;
}

const arrayFromStrings = (value: String): String[] => value && value.split(' ');

const Element: React.FC<Props> = ({
  refKey,
  tagName,
  center,
  alignCenter = center,
  justifyCenter = center,
  full,
  fullHeight = full,
  fullWidth = full,
  size,
  height = size,
  width = size,
  margin,
  padding,
  borderRadius,
  ariaLabel,
  children,
  animated = false,
  ...props
}) => {
  const Component = animated ? StyledAnimatedElement : StyledElement;

  return (
    <Component
      ref={refKey}
      as={animated ? undefined : tagName}
      forwardedAs={animated ? tagName : undefined}
      alignCenter={alignCenter}
      justifyCenter={justifyCenter}
      height={fullHeight ? '100%' : height}
      width={fullWidth ? '100%' : width}
      margin={arrayFromStrings(margin)}
      padding={arrayFromStrings(padding)}
      borderRadius={arrayFromStrings(borderRadius)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
};

const Form = ({ ...props }): ReactElement => <Element tagName="form" {...props} />;
const Input = ({ ...props }): ReactElement => <Element tagName="input" {...props} />;
const Label = ({ ...props }): ReactElement => <Element tagName="label" {...props} />;
const Span = ({ ...props }): ReactElement => <Element tagName="span" {...props} />;
const Video = ({ ...props }): ReactElement => <Element tagName="video" {...props} />;

export { Form, Input, Label, Span, Video };
export default Element;
