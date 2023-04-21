<script lang="ts">
  export let value: string = "";
  export let placeholder: string = "";
  export let globalClass: string = "";

  const init = (element) => element.focus();
</script>

<textarea
  class="input {globalClass}"
  on:input={(event) => (value = event.target.value)}
  {value}
  {placeholder}
  use:init
/>

<style>
  .input {
    background: var(--input-bg);
    border-radius: var(--border-radius);
    border: var(--input-border);
    box-sizing: border-box;
    color: var(--text-color);
    font-size: var(--font-size-med);
    outline: none;
    padding: var(--padding-small);
  }

  .input:focus {
    border: var(--input-border-focus);
  }
</style>
