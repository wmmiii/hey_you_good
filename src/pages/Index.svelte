<script lang="ts">
  import BiCheckDouble from "svelte-icons-pack/bi/BiCheckDouble";
  import BiCog from "svelte-icons-pack/bi/BiCog";
  import Button from "../components/Button.svelte";
  import Icon from "../components/Icon.svelte";
  import LastWeek from "../components/LastWeek.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
</script>

<Page globalClass="index-content">
  <div slot="header" class="header">
    <div style="flex: 1" />
    <Button onClick={() => transitionTo("settings", "fade-push")}>
      <Icon slot="icon" src={BiCog} color="currentColor" viewBox="0 0 24 24" />
    </Button>
  </div>

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
  <!-- <Button>
    <Icon
      slot="icon"
      src={BiCalendar}
      color="currentColor"
      viewBox="0 0 24 24"
    />
    Daily Log
  </Button> -->
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
