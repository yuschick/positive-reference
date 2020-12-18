import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'components/Dialog';
import Lightbox from 'components/Lightbox';

const ModalDialog = ({ id, isOpen, title, footer, children, onCloseTrigger, ...props }) => {
  return (
    <Lightbox modalId={id} isOpen={isOpen} onCloseTrigger={onCloseTrigger}>
      <Dialog title={title} footer={footer} onCloseTrigger={onCloseTrigger} {...props}>
        {children}
      </Dialog>
    </Lightbox>
  );
};

ModalDialog.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  onCloseTrigger: PropTypes.func,
};

export default ModalDialog;
