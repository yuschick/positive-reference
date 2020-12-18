import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { useSettingsState, useGroupState, useTranslation } from 'positive-store';

import CrowTip from 'components/CrowTip/CrowTip';
import CrowTipBanner from 'components/CrowTip/CrowTipBanner';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import Icon from 'components/Icon';
import IconButton from 'components/buttons/IconButton';
import Lightbox from 'components/Lightbox';
import Page from 'components/Page';
import TextButton from 'components/buttons/TextButton';
import VideoPlayer from 'components/VideoPlayer';
import useSelectedGroupRoles from 'utils/useSelectedGroupRoles';
import { breakpoint, spacing } from 'theme';
import { toggleBodyElementClass } from 'utils/helpers';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import CreateMomentButton from 'routes/SeeTheGood/CreateMomentButton';

const RequireMoments = ({ openMomentPanel }) => {
  const [videoIsOpen, setVideoIsOpen] = useState(false);
  const { language } = useSettingsState();
  const { selectedGroup } = useGroupState();
  const { roleValues } = useSelectedGroupRoles();
  const isMobileBreakpoint = useMobileBreakpoint();
  const { t } = useTranslation();
  const userIsViewer = selectedGroup && selectedGroup.userRole === roleValues.viewer;

  useEffect(() => {
    videoIsOpen && toggleBodyElementClass('overflow-hidden', true);
    return () => toggleBodyElementClass('overflow-hidden', false);
  }, [videoIsOpen]);

  return (
    <Flex column fullWidth minHeight={!isMobileBreakpoint ? '100%' : undefined}>
      {isMobileBreakpoint && (
        <StyledCrowTipBanner tips={[t('route.see_the_good.no_moments.tip')]} />
      )}

      <StyledPage>
        <Heading as="h1" align="center">
          {t('route.see_the_good.no_moments.page_title', {
            groupName: selectedGroup ? selectedGroup.name : '...',
          })}
        </Heading>

        <StyledH3 forwardedAs="h2" appearAs="h3" align="center">
          {t('route.see_the_good.no_moments.sub_heading')}
        </StyledH3>

        {!userIsViewer && (
          <Fragment>
            <ButtonWrapper>
              <CreateMomentButton onClick={openMomentPanel} />
            </ButtonWrapper>

            {language === 'fi' && (
              <TextButton marginTop="xxl" onClick={() => setVideoIsOpen(true)}>
                <Icon name="play" />

                {t('route.see_the_good.no_moments.watch_video')}
              </TextButton>
            )}

            {!isMobileBreakpoint && (
              <StyledCrowTip tips={[t('route.see_the_good.no_moments.tip')]} />
            )}
          </Fragment>
        )}
      </StyledPage>

      <Lightbox
        modalId="stgVideoPlayer"
        isOpen={videoIsOpen}
        onCloseTrigger={() => setVideoIsOpen(false)}
      >
        <Flex relative width={!isMobileBreakpoint ? '700px' : '100%'}>
          <VideoPlayer
            playing
            controls
            url="https://vimeo.com/453290577/e9709c4009"
            aspectRatio={4 / 3}
            boxShadow="photoOverlay"
          />

          {!isMobileBreakpoint && (
            <IconButton
              absolute
              right="0"
              transform="translate(50%, -50%)"
              iconName="close"
              onClick={() => setVideoIsOpen(false)}
            />
          )}
        </Flex>
      </Lightbox>
    </Flex>
  );
};

const StyledCrowTipBanner = styled(CrowTipBanner)`
  margin-bottom: ${spacing('lg')};
`;

const StyledCrowTip = styled(CrowTip)`
  margin-top: ${spacing('xxl')};
`;

const StyledH3 = styled(Heading)`
  margin-top: ${spacing('lg')};
`;

const StyledPage = styled(Page)`
  align-items: center;
  display: flex;
  height: calc(100vh - calc(${spacing('navbar')} * 2));
  flex-direction: column;

  @media (min-width: ${breakpoint('sm')}) {
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: ${spacing('lg')};
`;

export default RequireMoments;
