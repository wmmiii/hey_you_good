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
  <div class="footer" slot="footer">
    Build version %BUILD_CHECKSUM%
  </div>
</Page>

<style>
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
