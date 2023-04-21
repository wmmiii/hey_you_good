<script lang="ts">
  import BiError from "svelte-icons-pack/bi/BiError";
  import BiX from "svelte-icons-pack/bi/BiX";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";

  export let onCloseClicked: () => any = () => {};
</script>

<div class="warning-box">
  <Icon
    className={"warning-box-icon"}
    src={BiError}
    color="var(--col-warning)"
    viewBox="0 0 24 24"
    size="36"
  />

  <div class="contents">
    <slot />
  </div>

  <Button onClick={onCloseClicked}>
    <Icon
      slot="icon"
      src={BiX}
      color="currentColor"
      viewBox="0 0 24 24"
      size="24"
    />
  </Button>
</div>

<style>
  .warning-box {
    align-items: center;
    border-radius: var(--border-radius);
    border: 2px solid var(--col-warning);
    color: var(--col-text);
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    justify-content: center;
    padding: var(--padding-med);
    position: relative;
  }

  .warning-box::after {
    background-color: var(--col-warning);
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  :global(.warning-box-icon) {
    flex-shrink: 0;
  }

  .contents {
    flex: 1;
  }
</style>
