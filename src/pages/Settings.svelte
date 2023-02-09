<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
</script>

<Page>
  <h1 slot="header">Settings</h1>

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
