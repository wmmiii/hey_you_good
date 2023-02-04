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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    padding: var(--padding-med);
    width: 100%;
  }
</style>
