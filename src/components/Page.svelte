<script lang="ts">
  import { pageTransition } from "../navigation";

  /**
   * This class must be defined using `:global(...)` as it cannot be recognized
   * as a class directive. Class directives may only be applied to DOM elements
   * and may not be applied to custom components. :(
   */
  export let globalClass: string | undefined | null;
</script>

<div
  in:pageTransition={{ lifecycle: "in" }}
  out:pageTransition={{ lifecycle: "out" }}
  class="container {globalClass}"
>
  <slot />
</div>

<style>
  .container {
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
</style>
