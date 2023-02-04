<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
</script>

<Page globalClass="check-in-content">
  <Button onClick={() => transitionTo('index', 'slide-right')}>
    Back
  </Button>
</Page>

<style>
  :global(.check-in-content) {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    padding: var(--padding-med);
    width: 100%;
  }
</style>
