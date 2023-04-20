<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
  import { getSWRegistration } from "../serviceWorker/clientSide";
  import { UserSettings, userSettingsWatcher } from "../storage/userSettings";
  import { clearAllCaches } from "../storage/cache";

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
