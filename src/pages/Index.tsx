import Button from '../components/Button';
import IconBxCog from '../icons/IconBxCog';
import Page from '../components/Page';
import React from 'react';
import WarningBox from '../components/WarningBox';
import styles from './Index.module.scss';
import { UserSettingsContext } from '../contexts/UserSettingsContext';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import LastWeek from '../components/LastWeek';
import IconBxCheckDouble from '../icons/IconBxCheckDouble';
import IconBxHistory from '../icons/IconBxHistory';

const PWA_WARNING_KEY = "pwa-warning";

const IS_PWA =
  (window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches) ||
  window.navigator["standalone"] != null;

export default function Index(): JSX.Element {
  const navigate = useNavigate();
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);

  const closePwaWarning = useCallback(async () => {
    if (userSettings != null &&
      userSettings.dismissedInfo.indexOf(PWA_WARNING_KEY) < 0) {
      userSettings.dismissedInfo.push(PWA_WARNING_KEY);
      await setUserSettings(userSettings);
    }
  }, [userSettings]);

  return (
    <Page
      header={
        <div className={styles.header}>
          <div style={{ flex: 1 }}></div>
          <Button onClick={() => navigate("/settings")} icon={<IconBxCog />} />
        </div>
      }>
      {
        !IS_PWA && userSettings?.dismissedInfo.indexOf(PWA_WARNING_KEY) === -1 &&
        <WarningBox onCloseClicked={closePwaWarning}>
          <p>
            This app is designed to be installed by Google Chrome as a Progressive
            Web App.
          </p>
          <p>
            <a
              href="https://support.google.com/chrome/answer/9658361"
              target="_blank"
              rel="noreferrer"
            >
              Click here for more details.
            </a>
          </p>
        </WarningBox>
      }

      <LastWeek />

      <Button
        onClick={() => navigate("/checkin")}
        icon={<IconBxCheckDouble fontSize={24} />}>
        Check-In
      </Button>

      <Button
        onClick={() => navigate("/history")}
        icon={<IconBxHistory fontSize={24} />}>
        History
      </Button>
    </Page>
  );
}