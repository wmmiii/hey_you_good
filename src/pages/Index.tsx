import Button from '../components/Button';
import CheckIn from '../components/CheckIn';
import IconBxCog from '../icons/IconBxCog';
import IconBxHistory from '../icons/IconBxHistory';
import LastWeek from '../components/LastWeek';
import Page from '../components/Page';
import React, { createRef, useCallback, useContext, useEffect, useState } from 'react';
import TagFeeling from '../components/TagFeeling';
import WarningBox from '../components/WarningBox';
import styles from './Index.module.scss';
import { StoredFeeling, recordFeeling } from '../storage/localDb';
import { UserSettingsContext } from '../contexts/UserSettingsContext';
import { useNavigate } from 'react-router';

const PWA_WARNING_KEY = "pwa-warning";

const IS_PWA =
  (window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches) ||
  window.navigator["standalone"] != null;

export default function Index(): JSX.Element {
  const navigate = useNavigate();
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);
  const [feeling, setFeeling] = useState<StoredFeeling | null>(null);
  const [showTag, setShowTag] = useState(false);
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
      (userSettings.dismissedInfo?.indexOf(PWA_WARNING_KEY) || -1) < 0) {
      userSettings.dismissedInfo = userSettings.dismissedInfo || [];
      userSettings.dismissedInfo?.push(PWA_WARNING_KEY);
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
            !IS_PWA && userSettings?.dismissedInfo?.indexOf(PWA_WARNING_KEY) === -1 &&
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
            feeling != null &&
            <div className={styles.footer}>
              {
                showTag ?
                  <Button
                    className={styles.saveButton}
                    onClick={async () => {
                      await recordFeeling(new Date(), feeling);
                      setFeeling(null);
                      setShowTag(false);
                      setLastUpdate(new Date());
                      setShowSaved(true);
                    }}>
                    Save
                  </Button> :
                  <Button
                    className={styles.saveButton}
                    onClick={() => setShowTag(true)}>
                    Next
                  </Button>
              }
            </div>
          }
        </>
      }>

      <LastWeek lastUpdate={lastUpdate} />

      {
        (feeling != null && showTag) ?
          <TagFeeling feeling={feeling} setFeeling={setFeeling} /> :
          <CheckIn
            feeling={feeling}
            setFeeling={(f) => setFeeling({ ts: new Date(), ...f })} />
      }
    </Page>
  );
}
