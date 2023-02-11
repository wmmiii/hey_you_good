<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
  import { sendMessageToServiceWorker } from "../serviceWorker/messagePassing";

  $: permission = Notification.permission;
</script>

<Page>
  <h1 slot="header">Settings</h1>

  <div class="buttonRow">
    {#if permission === "granted"}
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
      disabled={permission !== "granted"}
      flex="1"
      onClick={() =>
        sendMessageToServiceWorker({ subject: "test-notification" })}
    >
      Test notifications
    </Button>
  </div>

  <div slot="footer" class="footer buttonRow">
    <Button onClick={() => transitionTo("index", "fade-pop")} flex="1">
      Cancel
    </Button>
    <Button onClick={() => transitionTo("index", "fade-pop")} flex="1">
      Save
    </Button>
  </div>
</Page>

<style>
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
