<script lang="ts">
  export let onClick: () => void = () => {};
  export let disabled = false;
</script>

<button
  class="button"
  class:disabled
  on:click={() => (disabled ? null : onClick())}
>
  <slot />
</button>

<style>
  .button {
    background: var(--button-bg);
    border-radius: var(--border-radius);
    border: none;
    color: var(--button-color);
    cursor: pointer;
    font-size: var(--font-size-large);
    padding: var(--padding-med);
    min-width: 256px;
  }

  .button:hover {
    background: var(--button-bg-hover);
  }

  .button:active {
    background: var(--button-bg-active);
  }

  .disabled {
    /* !important because I'm lazy. */
    background: var(--button-bg-disabled) !important;
    cursor: default;
  }
</style>
