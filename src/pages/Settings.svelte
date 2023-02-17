<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
  import {
    getSWRegistration,
    registerMessageListener,
    removeMessageListener,
    sendMessageToServiceWorker,
  } from "../serviceWorker/clientSide";
  import { UserSettings, userSettingsWatcher } from "../storage/userSettings";
  import { clearAllCaches } from "../storage/cache";
  import { NextNotificationResponse } from "../serviceWorker/messages";

  $: permission = Notification.permission;

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

  let nextNotification: Promise<Date | null> = new Promise((resolve) => {
    const listener = (message: NextNotificationResponse) => {
      removeMessageListener(listener);
      resolve(new Date(message.timestamp));
    };
    registerMessageListener("next-notification-response", listener);
    sendMessageToServiceWorker({ subject: "next-notification-request" });
  });
</script>

<Page>
  <h1 slot="header">Settings</h1>

  <div class="contents">
    <h2>Notifications</h2>

    <div class="buttonRow">
      {#if self['scheduler'] == null}
        <Button disabled flex="1">Notifications Not Available</Button>
      {:else if permission === "granted"}
        <Button disabled flex="1">Notifications Enabled!</Button>
      {:else}
        <Button
          flex="1"
          onClick={() =>
            Notification.requestPermission().then((p) => (permission = p))}
        >
          Enable Notifications
        </Button>
      {/if}
      <Button
        disabled={permission !== "granted" || self['scheduler'] == null}
        flex="1"
        onClick={() =>
          sendMessageToServiceWorker({ subject: "test-notification" })}
      >
        Test notifications
      </Button>
    </div>

    <div>
      <h3>Next Notification</h3>
      {#await nextNotification}
        Loading...
      {:then notification}
        {#if notification != null}
          {notification.toLocaleString()}
        {:else}
          No notification set.
        {/if}
      {/await}
    </div>

    <div>
      {#each userSettings.checkInTimes as checkInTime}
        <div>
          {String(checkInTime.h).padStart(2, "0")}:{String(
            checkInTime.m
          ).padStart(2, "0")}
        </div>
      {/each}
    </div>

    <h2>Advanced</h2>

    <Button onClick={forceUpdate}>Force app update</Button>
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
