import React, { Fragment, useState } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';
import { useSettingsState, useSettingsActions } from 'positive-store';

import A from 'components/A';
import AccountSettingsModal from 'components/Header/MainMenuBar/UserMenu/AccountSettingsModal';
import MenuItem from 'components/MenuItem';
import Panel from 'components/Panel';
import useAccountSettingsModal from 'components/Header/MainMenuBar/UserMenu/AccountSettingsModal/useAccountSettingsModal';
import useCrowTips from 'components/CrowTip/useCrowTips';
import Dropdown from 'components/Dropdown';

import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import { DesktopBreakpoint, MobileBreakpoint } from 'components/MediaQueries';
import { StyledIconButton } from 'components/Header/MainMenuBar/UserMenu/styles';
import { environment, sanity } from 'config';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useSession } from 'context/SessionContext/SessionContext';

const UserMenu = ({ paths, ...props }) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const { reset: resetDismissedTips } = useCrowTips();
  const { language } = useSettingsState();
  const { setLanguage } = useSettingsActions();
  const { trackEvent } = useAnalytics();
  const { user, logoutProcess } = useSession();
  const accountSettingsModal = useAccountSettingsModal();
  const { t } = useTranslation();

  useEffectExceptOnMount(() => {
    onMenuToggle(isMenuModalOpen);
  }, [isMenuModalOpen]);

  const onMenuToggle = isOpen => {
    if (isOpen) {
      trackEvent({ category: 'User', action: 'Open User Menu' });
    }
  };

  const onNavigate = to => {
    setIsMenuModalOpen(false);
    navigate(to);
  };

  const onLanguageClick = lang => {
    setLanguage(lang);
    trackEvent({ category: 'User', action: 'Select Language', name: lang });
  };

  const onAccountSettingsClick = () => {
    trackEvent({ category: 'User', action: 'Account Settings' });
    setIsMenuModalOpen(false);
    accountSettingsModal.updateState({ isOpen: true });
  };

  const onSettingsClick = () => {
    trackEvent({ category: 'User', action: 'Settings' });
    navigate('/settings');
  };

  const onContactSupportClick = () => {
    trackEvent({ category: 'User', action: 'Contact Support' });
    setIsMenuModalOpen(false);
  };

  const onLogoutClick = () => {
    trackEvent({ category: 'User', action: 'Logout' });
    setIsMenuModalOpen(false);
    logoutProcess.logout();
  };

  const onVerboseSwitchClick = () => {
    setIsMenuModalOpen(false);
    sanity.setVerboseContent(!sanity.getVerboseContent());
    window.location.reload(true);
  };

  return (
    !!user && (
      <Fragment>
        <MobileBreakpoint>
          <StyledIconButton
            primary
            iconName="hamburgerMenu"
            onClick={() => setIsMenuModalOpen(true)}
            {...props}
          />

          <Panel.Container
            id="user-menu-modal"
            isOpen={isMenuModalOpen}
            close={() => setIsMenuModalOpen(false)}
          >
            <Panel.Header />
            <StyledContent>
              {paths.map(({ path, name }, index) => (
                <MenuItem
                  marginTop={index === 0 ? 'md' : undefined}
                  key={path}
                  title={name}
                  isAction
                  isLarge
                  horizontalBorders={index === 0}
                  bottomBorder={index > 0}
                  onClick={() => onNavigate(path)}
                />
              ))}

              <MenuItem
                marginTop="md"
                title="Suomi"
                isSelected={language === 'fi'}
                isLarge
                horizontalBorders
                onClick={() => onLanguageClick('fi')}
              />

              <MenuItem
                title="English"
                isSelected={language === 'en'}
                isLarge
                bottomBorder
                onClick={() => onLanguageClick('en')}
              />

              <MenuItem
                title={t('app.actions.activate_tips')}
                isAction
                isLarge
                onClick={resetDismissedTips}
              />

              <TemporaryA
                href="mailto:support@positive.fi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MenuItem
                  marginTop="md"
                  title={t('app.menus.main.contact_support')}
                  iconName="paperPlane"
                  isAction
                  isLarge
                  horizontalBorders
                  onClick={onContactSupportClick}
                />
              </TemporaryA>

              <MenuItem
                title={t('app.actions.logout')}
                iconName="logout"
                isAction
                isLarge
                bottomBorder
                onClick={onLogoutClick}
              />

              {environment !== 'production' && (
                <Fragment>
                  <MenuItem
                    marginTop="md"
                    title={t(
                      sanity.getVerboseContent()
                        ? 'app.menus.main.sanity_remarks_off'
                        : 'app.menus.main.sanity_remarks_on'
                    )}
                    isAction
                    isLarge
                    horizontalBorders
                    onClick={onVerboseSwitchClick}
                  />
                </Fragment>
              )}
            </StyledContent>
          </Panel.Container>
        </MobileBreakpoint>

        <DesktopBreakpoint>
          <Dropdown.Menu name={t('app.menus.main')} label={user.name} color="white">
            <Dropdown.MenuItemGroup label={t('app.menus.main.language')}>
              <Dropdown.MenuItem
                title="Suomi"
                isSelected={language === 'fi'}
                onClick={() => onLanguageClick('fi')}
              />
              <Dropdown.MenuItem
                title="English"
                isSelected={language === 'en'}
                onClick={() => onLanguageClick('en')}
              />
            </Dropdown.MenuItemGroup>

            <Dropdown.MenuItemGroup>
              <Dropdown.MenuItem
                title={t('app.menus.account_settings')}
                isAction
                onClick={onAccountSettingsClick}
              />
              {environment !== 'production' && (
                <Dropdown.MenuItem
                  title={'Settings [prototype]'}
                  isAction
                  onClick={onSettingsClick}
                />
              )}
              <Dropdown.MenuItem
                title={t('app.actions.activate_tips')}
                isAction
                onClick={resetDismissedTips}
              />
              <Dropdown.MenuItem
                title={t('app.menus.main.contact_support')}
                isAction
                onClick={() => {
                  onContactSupportClick();
                  window.location = 'mailto:support@positive.fi';
                }}
              />
              <Dropdown.MenuItem title={t('app.actions.logout')} isAction onClick={onLogoutClick} />
            </Dropdown.MenuItemGroup>

            {environment !== 'production' && (
              <Dropdown.MenuItem
                title={t(
                  sanity.getVerboseContent()
                    ? 'app.menus.main.sanity_remarks_off'
                    : 'app.menus.main.sanity_remarks_on'
                )}
                isAction
                onClick={onVerboseSwitchClick}
              />
            )}
          </Dropdown.Menu>
        </DesktopBreakpoint>

        <AccountSettingsModal {...accountSettingsModal} />
      </Fragment>
    )
  );
};

const StyledContent = styled(Panel.Content)`
  padding: 0;
`;

const TemporaryA = styled(A)`
  display: block;

  &:focus {
    outline: none;
  }
`;

export default UserMenu;
