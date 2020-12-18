import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useStrengthState, Strength, Moment, useTranslation } from 'positive-store';

import MediaContainer from './MediaContainer';
import MomentDescription from './MomentDescription';

import MomentDetails from 'routes/SeeTheGood/MomentDetailsContent';

import CrowTipBanner from 'components/CrowTip/CrowTipBanner';
import { spacing } from 'theme';

interface Props {
  moment: Moment;
  updateForm: ({ moment }: Moment) => void;
}

const DetailsContainer: React.FunctionComponent<Props> = ({ moment, updateForm }) => {
  const { strengths } = useStrengthState();
  const { t } = useTranslation();

  const momentStrength = strengths?.find(
    (strength: Strength) => strength.slug === moment.strengthSlug
  );

  const onMediaDrop = (media?: Blob) => {
    updateForm({
      ...moment,
      mediaFile: media || undefined,
      mediaUrl: media ? URL.createObjectURL(media) : undefined,
      mediaType: media ? media.type.substring(0, 5) : undefined,
    });
  };

  return momentStrength ? (
    <Fragment>
      <CrowTipBanner
        tipId="see-the-good.modal.step-2.tip"
        tips={[
          t('route.see_the_good.modal.step_2.tip_1'),
          t('route.see_the_good.modal.step_2.tip_2'),
        ]}
      />
      <MediaContainer strength={momentStrength} moment={moment} onMediaDrop={onMediaDrop} />

      <DetailsGrid>
        <MomentDetails moment={moment} strength={momentStrength} />
        <MomentDescription moment={moment} strength={momentStrength} updateMoment={updateForm} />
      </DetailsGrid>
    </Fragment>
  ) : null;
};

const DetailsGrid = styled.div`
  display: grid;
  grid-gap: ${spacing('lg')};
  grid-template-columns: 1fr;
  padding: ${spacing('xl')};
`;

export default DetailsContainer;
