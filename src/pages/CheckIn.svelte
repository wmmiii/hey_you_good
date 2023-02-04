<script lang="ts">
  import { gloriaFeelings } from "../feelingsModel";
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
  import { recordFeeling } from "../storage/localDb";

  $: feeling = [];

  function isFeelingVisible(
    feelingPath: string[],
    existingPath: string[]
  ): boolean {
    if (feelingPath.length - 1 > existingPath.length) {
      return false;
    } else if (feelingPath.length > existingPath.length) {
      return existingPath.every((f, i) => f === feelingPath[i]);
    } else {
      return feelingPath.every((f, i) => f === existingPath[i]);
    }
  }

  function isFeelingSelected(
    feelingPath: string[],
    existingPath: string[]
  ): boolean {
    return feelingPath.every((f, i) => f === existingPath[i]);
  }

  function onFeelingSelected(
    feelingPath: string[],
    existingPath: string[]
  ): void {
    if (
      feelingPath.length === existingPath.length &&
      feelingPath.every((f, i) => f === existingPath[i])
    ) {
      const newPath = [...feelingPath];
      newPath.pop();
      feeling = newPath;
    } else {
      feeling = [...feelingPath];
    }
  }

  function saveFeeling(): void {
    recordFeeling(new Date(), feeling).then(() =>
      transitionTo("index", "slide-left")
    );
  }
</script>

<Page globalClass="check-in-content">
  <h1 slot="header">How are you feeling?</h1>

  {#each Object.keys(gloriaFeelings) as feelingName (feelingName)}
    {@const f = gloriaFeelings[feelingName]}
    {#if isFeelingVisible(f.path, feeling)}
      <div
        class="feeling"
        class:selected={isFeelingSelected(f.path, feeling)}
        style="background-color: {f.color}"
        on:click={() => onFeelingSelected(f.path, feeling)}
        on:keydown={() => onFeelingSelected(f.path, feeling)}
      >
        {feelingName}
      </div>
    {/if}
  {/each}

  <div slot="footer" class="footer">
    <Button onClick={() => transitionTo("index", "slide-right")}
      >Back to home</Button
    >
    <Button
      onClick={saveFeeling}
      disabled={feeling.length < 1}
    >
      Save
    </Button>
  </div>
</Page>

<style>
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .feeling {
    border-radius: var(--border-radius);
    color: #ffffff;
    cursor: pointer;
    font-size: var(--font-size-med);
    margin: var(--padding-small);
    padding: var(--padding-med);
  }

  .selected,
  .feeling:hover {
    filter: brightness(1.2);
  }
</style>
