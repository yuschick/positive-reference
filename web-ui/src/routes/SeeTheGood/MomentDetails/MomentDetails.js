import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import Text from 'components/Text';
import Div from 'components/Div';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import StrengthDialog from 'components/StrengthDialog';
import StrengthSticker from 'components/StrengthSticker';
import { color, fontSize, spacing } from 'theme';

const MomentDetails = ({
  moment,
  strength,
  includeSticker = true,
  darkMode = false,
  large = false,
  limitWidth = false,
  disableStrengthDialog = false,
  ...props
}) => {
  const [strengthDialogIsOpen, setStrengthModalIsOpen] = useState(false);
  const { t } = useTranslation();
  const onStrengthClick = () => setStrengthModalIsOpen(true);

  return (
    <Fragment>
      <Flex column alignItems="flex-start" {...props}>
        <HeadingContainer
          disableStrengthDialog={disableStrengthDialog}
          onClick={!disableStrengthDialog ? onStrengthClick : undefined}
        >
          {includeSticker && <StrengthSticker size="sm" marginRight="md" strength={strength} />}

          <StyledHeading forwardedAs="h3" large={large} darkMode={darkMode}>
            {strength.name}
          </StyledHeading>
        </HeadingContainer>

        <Flex marginTop="md">
          <Div>
            <LabelText forwardedAs="p" color="grey" large={large}>
              {t('route.see_the_good.from')}
            </LabelText>

            <NameText limitWidth={limitWidth} large={large} darkMode={darkMode}>
              {moment.creatorName}
            </NameText>
          </Div>

          <Div marginLeft="lg">
            <LabelText forwardedAs="p" color="grey" large={large}>
              {t('route.see_the_good.to')}
            </LabelText>

            <NameText limitWidth={limitWidth} large={large} darkMode={darkMode}>
              {moment.groupName}
            </NameText>
          </Div>
        </Flex>
      </Flex>

      <StrengthDialog
        strength={strength}
        isOpen={strengthDialogIsOpen}
        onCloseTrigger={() => setStrengthModalIsOpen(!strengthDialogIsOpen)}
      />
    </Fragment>
  );
};

const HeadingContainer = styled.div`
  align-items: center;
  cursor: ${({ disableStrengthDialog }) => (disableStrengthDialog ? 'default' : 'pointer')};
  display: flex;
`;

const StyledHeading = styled(Heading)`
  color: ${({ darkMode }) => darkMode && color('white')};
  font-size: ${({ large }) => large && fontSize('md')};
`;

const LabelText = styled(Text)`
  font-size: ${({ large }) => (large ? fontSize('body') : fontSize('sm'))};
  margin-right: ${spacing('xs')};
`;

const NameText = styled(Text)`
  color: ${({ darkMode }) => darkMode && color('white')};
  font-size: ${({ large }) => large && fontSize('md')};
  line-height: 1.25;
  max-width: ${({ limitWidth }) => limitWidth && '200px'};
`;

export default MomentDetails;
