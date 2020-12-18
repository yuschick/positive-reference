import React from 'react';

import Div from 'components/Div';
import Flex from 'components/Flex';
import ModalDialog from './ModalDialog';
import StrengthImage from 'components/StrengthImage';

const StrengthDialog = ({ strength, ...props }) => {
  return (
    <ModalDialog
      id="strengthDialog"
      title={strength.name}
      contentContainerProps={{ padding: 'none' }}
      {...props}
    >
      <Flex fullWidth height="180px" center backgroundColor={strength.color}>
        <StrengthImage slug={strength.slug} alt={strength.name} sizes="180px" />
      </Flex>

      <Div padding="xl">{strength.description}</Div>
    </ModalDialog>
  );
};

export default StrengthDialog;
