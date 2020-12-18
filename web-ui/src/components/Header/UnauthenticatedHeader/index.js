import React from 'react';
import { useTheme } from 'styled-components';
import { useSettingsState, useSettingsActions } from 'positive-store';

import Flex from 'components/Flex';
import Link from 'components/Link';
import TextButton from 'components/buttons/TextButton';
import { ReactComponent as Logo } from 'assets/logos/logo-white.svg';
import { Span } from 'components/Element';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

const LanguageLinks = () => {
  const { trackEvent } = useAnalytics();
  const { language } = useSettingsState();
  const { setLanguage } = useSettingsActions();

  const onLanguageClick = lang => {
    setLanguage(lang);
    trackEvent({ category: 'Login', action: 'Select Language', name: lang });
  };

  return (
    <>
      {language === 'fi' ? (
        <Flex>
          <Span whiteSpace="pre-wrap">{'Suomi  |  '}</Span>
          <TextButton inlineFlex onClick={() => onLanguageClick('en')}>
            English
          </TextButton>
        </Flex>
      ) : (
        <Flex>
          <TextButton inlineFlex onClick={() => onLanguageClick('fi')}>
            Suomi
          </TextButton>
          <Span whiteSpace="pre-wrap">{'  |  English'}</Span>
        </Flex>
      )}
    </>
  );
};

const UnauthenticatedHeader = () => {
  const { color, spacingValue } = useTheme();

  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <Flex
      margin={`none ${isMobileBreakpoint ? 'md' : 'xxxl'}`}
      alignCenter
      justifyContent="space-between"
    >
      <Link to="/">
        <Logo
          style={{
            width: '136px',
            height: `${spacingValue.navbar}px`,
            backgroundColor: color.green,
          }}
        />
      </Link>

      <LanguageLinks />
    </Flex>
  );
};

export default UnauthenticatedHeader;
