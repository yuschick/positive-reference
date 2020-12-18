import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocation } from '@reach/router';
import {
  useStrengthState,
  useStrengthActions,
  useAudienceState,
  useTranslation,
} from 'positive-store';

import A from 'components/A';
import Breadcrumb from 'components/Breadcrumb';
import Flex from 'components/Flex';
import Icon from 'components/Icon';
import Link from 'components/Link';

import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { spacing } from 'theme';

const TeachMenuBar = props => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { appMaxWidth } = useTheme();
  const isMobileBreakpoint = useMobileBreakpoint();

  const { activeAudience } = useAudienceState();
  const { activeStrength, strengthPowerPointUrl } = useStrengthState();
  const { fetchStrengthAttachment } = useStrengthActions();

  useEffect(() => {
    if (!activeStrength) return;
    fetchStrengthAttachment();
  }, [activeStrength]);

  return pathname.indexOf('/teach') > -1 && activeStrength && activeAudience ? (
    <Flex center height="navbar" backgroundColor="white" bottomBorder {...props}>
      <Flex
        width={appMaxWidth}
        fullHeight
        padding="none lg"
        alignCenter
        justifyContent="space-between"
      >
        <Breadcrumb
          crumbs={
            isMobileBreakpoint
              ? [
                  <Link key={t('route.teach')} to={'/teach'}>
                    {t('route.teach')}
                  </Link>,
                  activeStrength.name,
                ]
              : [
                  <Link key={t('route.teach')} to={'/teach'}>
                    {t('route.teach')}
                  </Link>,
                  <Link key={activeAudience.name} to={'/teach'}>
                    {activeAudience.name}
                  </Link>,
                  activeStrength.name,
                ]
          }
        />

        {strengthPowerPointUrl && (
          <A flex alignCenter href={strengthPowerPointUrl}>
            <StyledIcon light name="download" />

            {t('route.teach.actions.download_ppt')}
          </A>
        )}
      </Flex>
    </Flex>
  ) : null;
};

const StyledIcon = styled(Icon)`
  margin-right: ${spacing('md')};
`;

export default TeachMenuBar;
