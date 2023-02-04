<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
</script>

<Page globalClass="index-content">
  <Button onClick={() => transitionTo('check-in', 'slide-left')}>
    Check-In
  </Button>
  <Button>Daily Log</Button>
</Page>

<style>
  :global(.index-content) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
