import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import { Form } from './GoalPanel';

import { spacing } from 'theme';
import Input from 'components/Input';
import SelectBlock from 'components/SelectBlock';
import Text from 'components/Text';
import IconButton from 'components/buttons/IconButton';

interface Props {
  form: Form;
  error?: string;
  onChange: ({ act, custom }: { act: string; custom?: boolean }) => void;
}

const ActsStep: React.FunctionComponent<Props> = ({ form, error, onChange }) => {
  const [customAct, setCustomAct] = useState<string>('');
  const { t } = useTranslation();

  const { strength, customActs, acts } = form;
  const strengthName = strength?.name;
  const top5Examples = strength?.goalTemplates.find(
    goalTemplate => goalTemplate.slug === 'top-5-examples'
  );

  return (
    <Fragment>
      {error && (
        <StyledText forwardedAs="p" color="softAlert" role="alert" align="center">
          {t(`route.see_the_good.goals.errors.${error}`)}
        </StyledText>
      )}
      <InputContainer>
        <StyledInput
          dataTestId="custom-act-input"
          type="text"
          id="custom-act"
          name="custom-act"
          label={t('route.see_the_good.goals.acts.add_your_own', {
            strengthName: strengthName?.toLowerCase(),
          })}
          placeholder={t('route.see_the_good.goals.acts.add_your_own', {
            strengthName: strengthName?.toLowerCase(),
          })}
          hideLabel
          value={customAct}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCustomAct(event.target?.value)
          }
          onEnter={() => {
            onChange({ act: customAct, custom: true });
            setCustomAct('');
          }}
        />
        {!!customAct.length && (
          <AddIconButton
            data-test-id="add-custom-act-button"
            iconName="add"
            ariaLabel={t('route.see_the_good.goals.actions.add.act')}
            onClick={() => {
              onChange({ act: customAct, custom: true });
              setCustomAct('');
            }}
          />
        )}
      </InputContainer>
      {!!form.customActsBase.length && (
        <CustomActsContainer>
          <SelectBlock.Group name="custom-acts">
            {form.customActsBase.map(act => (
              <SelectBlock.Block
                type="checkbox"
                key={act}
                label={act}
                checked={customActs?.includes(act)}
                onChange={() => onChange({ act, custom: true })}
              />
            ))}
          </SelectBlock.Group>
        </CustomActsContainer>
      )}

      <StyledText forwardedAs="p" align="center" size="sm" color="grey">
        {t('route.see_the_good.goals.acts.select_from_the_list')}
      </StyledText>

      {top5Examples && (
        <ActsContainer>
          <section>
            <ActsTitle
              id="examples-heading"
              forwardedAs="p"
              size="xs"
              color="grey"
              align="center"
              bold
            >
              {t('route.see_the_good.modal.step_2.examples')}
            </ActsTitle>

            <SelectBlock.Group name="defined-acts" aria-describedby="examples-heading">
              {top5Examples.actions.map(action => (
                <SelectBlock.Block
                  type="checkbox"
                  key={action}
                  label={action}
                  checked={acts?.includes(action)}
                  onChange={() => onChange({ act: action })}
                />
              ))}
            </SelectBlock.Group>
          </section>
        </ActsContainer>
      )}
    </Fragment>
  );
};

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding-right: ${spacing('xxl')};
`;

const AddIconButton = styled(IconButton)`
  position: absolute;
  right: ${spacing('sm')};
  top: 50%;
  transform: translateY(-50%);
`;

const CustomActsContainer = styled.section`
  margin-top: ${spacing('md')};
`;

const StyledText = styled(Text)<{ align: string; size?: string; role?: string; color?: string }>`
  margin: ${spacing('lg')} 0;
`;

const ActsContainer = styled.div`
  display: grid;
  grid-gap: ${spacing('xxl')};
`;

const ActsTitle = styled(Text)<{ forwardedAs: string; size: string; align: string; bold: boolean }>`
  margin-bottom: ${spacing('md')};
  text-transform: uppercase;
`;

export default ActsStep;
