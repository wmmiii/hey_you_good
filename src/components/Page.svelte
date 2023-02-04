<script lang="ts">
  import { pageTransition } from "../navigation";

  /**
   * This class must be defined using `:global(...)` as it cannot be recognized
   * as a class directive. Class directives may only be applied to DOM elements
   * and may not be applied to custom components. :(
   */
  export let globalClass: string | undefined | null = undefined;
</script>

<div
  in:pageTransition={{ lifecycle: "in" }}
  out:pageTransition={{ lifecycle: "out" }}
  class="container"
>
  {#if $$slots.header}
    <div class="header">
      <slot name="header" />
    </div>
  {/if}
  <div class="content {globalClass}">
    <slot />
  </div>
  {#if $$slots.footer}
    <div class="footer">
      <slot name="footer" />
    </div>
  {/if}
</div>

<style>
  .container {
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: var(--padding-med);
    justify-content: space-between;
    left: 0;
    padding: var(--padding-med);
    position: absolute;
    top: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .header {
    flex: 0;
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }

  .footer {
    flex: 0;
  }
</style>
