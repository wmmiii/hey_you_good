<script lang="ts">
  import Button from "../components/Button.svelte";
  import Switch from "../components/Switch.svelte";
  import Page from "../components/Page.svelte";
  import {
    UserSettings,
    setUserSettings,
    userSettingsWatcher,
  } from "../storage/userSettings";
  import { clearAllCaches } from "../storage/cache";
  import { getSWRegistration } from "../serviceWorker/clientSide";
  import { prefersDarkMode } from "../theme";
  import { transitionTo } from "../navigation";

  const forceUpdate = async () => {
    await clearAllCaches();
    const registration = await getSWRegistration();
    await registration.update();
    location.reload();
  };

  let userSettings: UserSettings;
  userSettingsWatcher.subscribe((value) => {
    userSettings = value;
  });

  const setPrefersDarkMode = (preferDarkMode: boolean): void => {
    setUserSettings(
      Object.assign({}, userSettings, { preferDarkMode: preferDarkMode })
    );
  };

  const setRecord = (record: boolean): void => {
    setUserSettings(
      Object.assign({}, userSettings, { recordData: record })
    );
  };

  const checksumPromise = fetch("/real_manifest.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not fetch real manifest!");
      } else {
        return response.json();
      }
    })
    .then((json) => json["Checksum"]);
</script>

<Page>
  <h1 slot="header">Settings</h1>

  <div class="contents">
    <h2>Theme</h2>
    <Switch
      value={prefersDarkMode(userSettings)}
      onClick={(value) => setPrefersDarkMode(value)}
    >
      Dark Mode
    </Switch>
    <h2>Recording Data</h2>
    <p>
      Sometimes you want to show your friends around the app without actually
      messing up your data.
    </p>
    <Switch
      value={userSettings.recordData}
      onClick={(value) => setRecord(value)}
    >
      Record Data
    </Switch>

    <h2>Advanced</h2>

    {#await checksumPromise}
      <p>Loading current checksum...</p>
      <Button disabled={true}>Force app update</Button>
    {:then checksum}
      <p>Latest checksum: {checksum}</p>
      {#if checksum === "%BUILD_CHECKSUM%"}
        <Button disabled={true}>App up to date</Button>
      {:else}
        <Button onClick={forceUpdate}>Force app update</Button>
      {/if}
    {/await}
  </div>

  <div slot="footer" class="footer buttonRow">
    <Button onClick={() => transitionTo("index", "fade-pop")} flex="1">
      Done
    </Button>
  </div>
</Page>

<style>
  .contents {
    display: flex;
    flex-direction: column;
    gap: var(--padding-small);
  }
  .buttonRow {
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    width: 100%;
  }
  .footer {
    padding-top: var(--padding-med);
  }
</style>
