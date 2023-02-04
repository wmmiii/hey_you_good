<script lang="ts">
  export let onClick: () => void = () => {};
</script>

<button class="button" on:click={onClick}>
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
</style>
