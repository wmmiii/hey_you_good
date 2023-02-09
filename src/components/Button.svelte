<script lang="ts">
  export let onClick: () => void = () => {};
  export let background = 'var(--button-bg)';
  export let disabled = false;
  export let flex = '0';
</script>

<button
  class="button"
  class:disabled
  class:icon-only={$$slots.icon && !$$slots.default}
  style="background: {background}; flex: {flex}"
  on:click={() => (disabled ? null : onClick())}
>
  {#if $$slots.icon}
  <div class="icon">
    <slot name="icon" />
  </div>
  {/if}
  <slot />
</button>

<style>
  .button {
    align-items: center;
    border-radius: var(--border-radius);
    border: none;
    color: var(--button-color);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: var(--font-size-large);
    gap: var(--padding-med);
    justify-content: center;
    padding: var(--padding-med);
  }

  .icon-only {
    border-radius: 50%;
  }

  .button:hover {
    filter: brightness(1.2);
  }

  .button:active {
    filter: brightness(0.8);
  }

  .disabled {
    filter: contrast(0.6) grayscale(1) !important;
    cursor: default;
  }

  .icon {
    height: 1em;
    width: 1em;
  }
</style>
