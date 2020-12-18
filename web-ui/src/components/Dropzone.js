import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Div from 'components/Div';

const Dropzone = ({ accept, Content, onDrop, contentProps, ...props }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    noKeyboard: true,
    onDrop,
  });
  const { ref: dropzoneRootRef, ...dropzoneRootProps } = getRootProps();

  return (
    <Div refKey={dropzoneRootRef} {...dropzoneRootProps} {...props}>
      <input {...getInputProps()} />

      {Content && <Content isDragActive={isDragActive} {...contentProps} />}
    </Div>
  );
};

Dropzone.propTypes = {
  accept: PropTypes.string,
  Content: PropTypes.func,
  onDrop: PropTypes.func,
};

export default Dropzone;
