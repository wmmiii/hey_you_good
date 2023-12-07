import Button from '../components/Button';
import Page from '../components/Page';
import React, { useContext, useEffect, useState } from 'react';
import Switch from '../components/Switch';
import styles from './Settings.module.scss';
import { UserSettingsContext } from '../contexts/UserSettingsContext';
import { clearAllCaches } from "../storage/cache";
import { getSWRegistration } from "../serviceWorker/clientSide";
import { useNavigate } from 'react-router';

const CURRENT_CHECKSUM = '%BUILD_CHECKSUM%';

export default function Settings(): JSX.Element {
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);
  const navigate = useNavigate();
  const [checksum, setChecksum] = useState<string | null>(null);

  useEffect(() => {
    fetch('/real_manifest.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch real manifest!');
        } else {
          return response.json();
        }
      })
      .then(json => json['Checksum'])
      .then(setChecksum);
  }, []);

  const updateEnabled = checksum != null && checksum !== CURRENT_CHECKSUM;
  const prefersDarkMode = userSettings?.preferDarkMode != null ?
    userSettings.preferDarkMode :
    document.body.classList.contains('dark');

  return (
    <Page
      header={<h1>Settings</h1>}
      footer={
        <div slot="footer" className={`${styles.footer} ${styles.buttonRow}`}>
          <Button onClick={() => navigate('/')} flex="1">
            Done
          </Button>
        </div>
      }>
      <div className={styles.contents}>
        <h2>Theme</h2>
        <Switch
          value={prefersDarkMode}
          onClick={(value) => setUserSettings(
            Object.assign({}, userSettings, { preferDarkMode: value }))}>
          Dark Mode
        </Switch>

        <h2>Advanced</h2>
        {
          checksum == null ?
            <p>Loading current checksum...</p> :
            <p>Latest checksum: {checksum}</p>
        }
        <Button
          onClick={forceUpdate}
          disabled={!updateEnabled}>
          Force App Update
        </Button>

      </div>
    </Page>
  );
}

async function forceUpdate() {
  await clearAllCaches();
  const registration = await getSWRegistration();
  await registration.update();
  location.reload();
};