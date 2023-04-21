<script lang="ts">
  import BiCheck from "svelte-icons-pack/bi/BiCheck";
  import Button from "../components/Button.svelte";
  import Icon from "../components/Icon.svelte";
  import Page from "../components/Page.svelte";
  import TextInput from "../components/TextInput.svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { gloriaList } from "../feelingsModel";
  import { recordFeeling } from "../storage/localDb";
  import { transitionTo } from "../navigation";

  $: feeling = [];
  $: searchString = "";
  $: filteredFeelings = gloriaList.filter((f) =>
    isFeelingVisible(f.path, feeling, searchString)
  );

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
    if (isFeelingSelected(feelingPath, existingPath)) {
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

  {#each filteredFeelings as f (f.name)}
    <div
      class="feeling"
      class:selected={isFeelingSelected(f.path, feeling)}
      style="background-color: {f.color}"
      on:click={() => onFeelingSelected(f.path, feeling)}
      on:keydown={() => onFeelingSelected(f.path, feeling)}
      in:fade={{ duration: 200 }}
      animate:flip={{ duration: 200 }}
    >
      <div class="iconContainer">
        {#if isFeelingSelected(f.path, feeling)}
          <div in:fade={{ duration: 120 }} out:fade={{ duration: 120 }}>
            <Icon src={BiCheck} color="currentColor" viewBox="0 0 20 20" />
          </div>
        {/if}
      </div>
      {f.name}
    </div>
  {/each}

  <div slot="footer" class="footer">
    <Button onClick={() => transitionTo("index", "slide-right")} flex="1">
      Back to home
    </Button>
    <Button onClick={saveFeeling} disabled={feeling.length < 1} flex="1">
      Save
    </Button>
  </div>
</Page>

<style>
  .footer {
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    padding-top: var(--padding-med);
  }

  .feeling,
  .feeling:focus {
    border-radius: var(--border-radius);
    color: #ffffff;
    cursor: pointer;
    font-size: var(--font-size-med);
    font-weight: bold;
    margin: var(--padding-small) 0;
    padding: var(--padding-med);
    user-select: none;
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

  .iconContainer {
    display: inline-block;
    height: 1em;
    margin-right: 8px;
    width: 1em;
  }
</style>
