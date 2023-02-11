<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";

  $: permission = Notification.permission;
</script>

<Page>
  <h1 slot="header">Settings</h1>

  {#if permission === "granted"}
    <Button disabled>Notifications Enabled!</Button>
  {:else}
    <Button
      onClick={() =>
        Notification.requestPermission().then((p) => (permission = p))}
    >
      Enable Notifications
    </Button>
  {/if}

  <div slot="footer" class="footer">
    <Button onClick={() => transitionTo("index", "fade-pop")} flex="1">
      Cancel
    </Button>
    <Button onClick={() => transitionTo("index", "fade-pop")} flex="1">
      Save
    </Button>
  </div>
</Page>

<style>
  .footer {
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    padding-top: var(--padding-med);
  }
</style>
