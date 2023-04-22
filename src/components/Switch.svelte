<script lang="ts">
  export let value = false;
  export let onClick: (value: boolean) => any;
  export let disabled = false;
</script>

<div
  class="switch"
  class:on={value}
  class:disabled
  on:click={() => (disabled ? null : onClick(!value))}
  on:keydown={() => (disabled ? null : onClick(!value))}
>
  <div class="background" />
  <div class="slide" />
</div>

<style>
  .switch {
    background-color: var(--switch-bg);
    border-radius: 24px;
    cursor: pointer;
    height: 48px;
    overflow: hidden;
    position: relative;
    width: 72px;
  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: var(--switch-bg-active);
    width: 24px;
    transition: width 200ms ease;
    pointer-events: none;
  }

  .on .background {
    width: 48px;
  }

  .slide {
    background-color: var(--button-bg);
    border-radius: 24px;
    bottom: 0;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: left 200ms ease;
    width: 48px;
  }

  .on .slide {
    left: 24px;
  }

  .disabled {
    filter: contrast(0.6) grayscale(1) !important;
  }
</style>
