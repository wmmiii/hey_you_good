import Button from '../components/Button';
import IconBxCog from '../icons/IconBxCog';
import IconBxHistory from '../icons/IconBxHistory';
import LastWeek from '../components/LastWeek';
import Page from '../components/Page';
import React, { createRef, useCallback, useContext, useEffect, useState } from 'react';
import WarningBox from '../components/WarningBox';
import styles from './Index.module.scss';
import { UserSettingsContext } from '../contexts/UserSettingsContext';
import { useNavigate } from 'react-router';
import CheckIn from '../components/CheckIn';
import { recordFeeling } from '../storage/localDb';

const PWA_WARNING_KEY = "pwa-warning";

const IS_PWA =
  (window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches) ||
  window.navigator["standalone"] != null;

export default function Index(): JSX.Element {
  const navigate = useNavigate();
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);
  const [feeling, setFeeling] = useState<string[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [showSaved, setShowSaved] = useState(false);
  const savedRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (showSaved) {
      setTimeout(() => {
        if (savedRef.current) {
          savedRef.current.classList.remove(styles.showSaved);
          setTimeout(() => {
            setShowSaved(false);
          }, 1000);
        }
      }, 1000);
    }
  }, [showSaved]);

  const closePwaWarning = useCallback(async () => {
    if (userSettings != null &&
      userSettings.dismissedInfo.indexOf(PWA_WARNING_KEY) < 0) {
      userSettings.dismissedInfo.push(PWA_WARNING_KEY);
      await setUserSettings(userSettings);
    }
  }, [userSettings]);

  return (
    <Page
      className={styles.content}
      header={
        <>
          <div className={styles.header}>
            {
              showSaved &&
              <div
                ref={savedRef}
                className={styles.saved + ' ' + styles.showSaved}>
                Saved!
              </div>
            }
            <div style={{ flex: 1 }}></div>
            <Button
              onClick={() => navigate("/history")}
              icon={<IconBxHistory fontSize={24} />} />
            <Button onClick={() => navigate("/settings")} icon={<IconBxCog />} />
          </div>
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
        </>
      }
      footer={
        <>
          {
            feeling.length > 0 &&
            <div className={styles.footer}>
              <Button
                className={styles.saveButton}
                onClick={async () => {
                  await recordFeeling(new Date(), feeling);
                  setFeeling([]);
                  setLastUpdate(new Date());
                  setShowSaved(true);
                }}
                disabled={feeling.length < 1}>
                Save
              </Button>
            </div>
          }
        </>
      }>

      <LastWeek lastUpdate={lastUpdate} />

      <CheckIn feeling={feeling} setFeeling={setFeeling} />
    </Page>
  );
}