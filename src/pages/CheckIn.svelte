<script lang="ts">
  import { gloriaFeelings } from "../feelingsModel";
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
  import { recordFeeling } from "../storage/localDb";
  import TextInput from "../components/TextInput.svelte";

  $: feeling = [];
  $: searchString = "";

  function isFeelingVisible(
    feelingPath: string[],
    existingPath: string[],
    searchString: string
  ): boolean {
    if (searchString) {
      const lowerSearch = searchString.toLocaleLowerCase();
      const lowerFeeling =
        feelingPath[feelingPath.length - 1].toLocaleLowerCase();
      return lowerFeeling.indexOf(lowerSearch) >= 0;
    }

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
    searchString = "";
  }

  function saveFeeling(): void {
    recordFeeling(new Date(), feeling).then(() =>
      transitionTo("index", "slide-left")
    );
  }
</script>

<Page>
  <h1 slot="header">How are you feeling?</h1>

  <TextInput
    globalClass="feeling-search-input"
    bind:value={searchString}
    placeholder="Search for a feeling..."
  />

  {#each Object.keys(gloriaFeelings) as feelingName (feelingName)}
    {@const f = gloriaFeelings[feelingName]}
    {#if isFeelingVisible(f.path, feeling, searchString)}
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
    <Button onClick={saveFeeling} disabled={feeling.length < 1}>Save</Button>
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
    margin: var(--padding-small) 0;
    padding: var(--padding-med);
  }

  .selected,
  .feeling:hover {
    filter: brightness(1.2);
  }

  :global(.feeling-search-input) {
    display: block;
    margin: var(--padding-small) 0;
    width: 100%;
  }
</style>
