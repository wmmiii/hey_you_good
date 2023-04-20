<script lang="ts">
  import BiCheckbox from "svelte-icons-pack/bi/BiCheckbox";
  import BiCheckboxChecked from "svelte-icons-pack/bi/BiCheckboxChecked";
  import Icon from "./Icon.svelte";

  export let value = false;
  export let onClick: () => any = () => {};
  export let disabled = false;
</script>

<span
  class="checkbox"
  on:click={() => (disabled ? null : onClick())}
  on:keydown={() => (disabled ? null : onClick())}>
  <Icon
    color="currentColor"
    size="24"
    src={value ? BiCheckboxChecked : BiCheckbox}
    viewBox="0 0 24 24"
  />
</span>

<style>
  .checkbox {
    align-items: center;
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
</style>
