import React, { useState } from 'react';
import styled from 'styled-components';
import { Moment, Strength, useTranslation } from 'positive-store';

import Heading from 'components/Heading';
import StrengthSticker from 'components/StrengthSticker';
import StrengthDialog from 'components/StrengthDialog';
import Text from 'components/Text';
import Div from 'components/Div';
import Flex from 'components/Flex';

import { color, fontSize, spacing } from 'theme';

interface Props {
  moment: Moment;
  strength: Strength;
  includeSticker?: boolean;
  darkMode?: boolean;
  large?: boolean;
  limitNameWidth?: boolean;
  disableStrengthDialog?: boolean;
}

const MomentDetailsContent: React.FunctionComponent<Props> = ({
  moment,
  strength,
  includeSticker = true,
  darkMode = false,
  large = false,
  limitNameWidth = true,
  disableStrengthDialog = false,
}) => {
  const [strengthDialogIsOpen, setStrengthModalIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const onStrengthClick = () => setStrengthModalIsOpen(true);

  return (
    <DetailsContainer>
      <HeadingContainer
        disableStrengthDialog={disableStrengthDialog}
        onClick={!disableStrengthDialog ? onStrengthClick : undefined}
      >
        {includeSticker && <StrengthSticker size="sm" marginRight="md" strength={strength} />}

        <StyledHeading forwardedAs="h3" large={large} darkMode={darkMode}>
          {strength.name}
        </StyledHeading>
      </HeadingContainer>

      <Flex>
        <Div>
          <LabelText forwardedAs="p" color="grey" large={large}>
            {t('route.see_the_good.from')}
          </LabelText>

          <NameText limitNameWidth={limitNameWidth} large={large} darkMode={darkMode}>
            {moment.creatorName}
          </NameText>
        </Div>

        <Div marginLeft="lg">
          <LabelText forwardedAs="p" color="grey" large={large}>
            {t('route.see_the_good.to')}
          </LabelText>

          <NameText limitNameWidth={limitNameWidth} large={large} darkMode={darkMode}>
            {moment.groupName}
          </NameText>
        </Div>
      </Flex>

      <StrengthDialog
        strength={strength}
        isOpen={strengthDialogIsOpen}
        onCloseTrigger={() => setStrengthModalIsOpen(false)}
      />
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  border-bottom: 1px solid ${color('lightGrey')};
  padding-bottom: ${spacing('md')};
`;

const HeadingContainer = styled.div<{ disableStrengthDialog: boolean }>`
  align-items: center;
  cursor: ${({ disableStrengthDialog }) => (disableStrengthDialog ? 'default' : 'pointer')};
  display: flex;
  margin-bottom: ${spacing('md')};
`;

const StyledHeading = styled(Heading)<{ darkMode: boolean; large: boolean }>`
  color: ${({ darkMode }) => darkMode && color('white')};
  font-size: ${({ large }) => large && fontSize('md')};
`;

const LabelText = styled(Text)<{ large: boolean }>`
  font-size: ${({ large }) => (large ? fontSize('body') : fontSize('sm'))};
  margin-right: ${spacing('xs')};
`;

const NameText = styled(Text)<{ darkMode: boolean; large: boolean; limitNameWidth: boolean }>`
  color: ${({ darkMode }) => darkMode && color('white')};
  font-size: ${({ large }) => large && fontSize('md')};
  line-height: 1.25;
  max-width: ${({ limitNameWidth }) => limitNameWidth && '200px'};
`;

export default MomentDetailsContent;
