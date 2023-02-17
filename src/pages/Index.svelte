<script lang="ts">
  import BiCalendar from "svelte-icons-pack/bi/BiCalendar";
  import BiCheckDouble from "svelte-icons-pack/bi/BiCheckDouble";
  import BiCog from "svelte-icons-pack/bi/BiCog";
  import BiHistory from "svelte-icons-pack/bi/BiHistory";
  import Button from "../components/Button.svelte";
  import Icon from "../components/Icon.svelte";
  import LastWeek from "../components/LastWeek.svelte";
  import Page from "../components/Page.svelte";
  import WarningBox from "../components/WarningBox.svelte";
  import { transitionTo } from "../navigation";
  import {
    setUserSettings,
    UserSettings,
    userSettingsWatcher,
  } from "../storage/userSettings";

  const pwaWarningKey = "pwa-warning";

  const isPwa =
    (window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator["standalone"] != null;

  let userSettings: UserSettings | undefined;
  userSettingsWatcher.subscribe((value) => (userSettings = value));

  async function closePwaWarning(): Promise<void> {
    if (userSettings?.dismissedInfo.indexOf(pwaWarningKey) < 0) {
      userSettings.dismissedInfo.push(pwaWarningKey);
      await setUserSettings(userSettings);
    }
  }
</script>

<Page globalClass="index-content">
  <div slot="header" class="header">
    <div style="flex: 1" />
    <Button onClick={() => transitionTo("settings", "fade-push")}>
      <Icon slot="icon" src={BiCog} color="currentColor" viewBox="0 0 24 24" />
    </Button>
  </div>

  {#if !isPwa && userSettings?.dismissedInfo.indexOf(pwaWarningKey) < 0}
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
  {/if}

  <LastWeek />

  <Button onClick={() => transitionTo("check-in", "slide-left")}>
    <Icon
      slot="icon"
      src={BiCheckDouble}
      size="24"
      viewBox="0 0 24 24"
      color="currentColor"
    />
    Check-In
  </Button>
  <Button onClick={() => transitionTo("daily-log", "slide-left")}>
    <Icon
      slot="icon"
      src={BiCalendar}
      color="currentColor"
      viewBox="0 0 24 24"
    />
    Daily Log
  </Button>
  <Button onClick={() => transitionTo("history", "slide-left")}>
    <Icon
      slot="icon"
      src={BiHistory}
      color="currentColor"
      viewBox="0 0 24 24"
    />
    History
  </Button>
  <div class="footer" slot="footer">Build version %BUILD_CHECKSUM%</div>
</Page>

<style>
  .header {
    display: flex;
    flex-direction: row;
  }

  :global(.index-content) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .footer {
    font-weight: 300;
    font-size: 12px;
  }
</style>
