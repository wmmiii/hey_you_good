<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { manuallySetPageTransition, transitionTo } from "../navigation";
  import { UserSettings, userSettingsWatcher } from "../storage/userSettings";
  import TextArea from "../components/TextArea.svelte";
  import { recordLogEntries } from "../storage/localDb";

  let userSettings: UserSettings;
  userSettingsWatcher.subscribe((value) => (userSettings = value));

  let promptIndex = 0;
  $: promptAnswer = "";
  let curPrompt = userSettings.dailyPrompts[promptIndex];
  const log: { [key: string]: string } = {};

  const nextPrompt = () => {
    manuallySetPageTransition("slide-left");
    changePrompt(promptIndex + 1);
  };
  const prevPrompt = () => {
    manuallySetPageTransition("slide-right");
    changePrompt(promptIndex - 1);
  };

  const changePrompt = (newIndex: number) => {
    log[userSettings.dailyPrompts[promptIndex].prompt] = promptAnswer;
    curPrompt = userSettings.dailyPrompts[newIndex];
    promptAnswer = log[userSettings.dailyPrompts[newIndex].prompt];
    promptIndex = newIndex;
  };

  const save = async () => {
    log[userSettings.dailyPrompts[promptIndex].prompt] = promptAnswer;
    await recordLogEntries(new Date(), log);
    transitionTo("index", "slide-left");
  };

  const onEnter = () => {
    if (promptIndex === userSettings.dailyPrompts.length - 1) {
      save();
    } else {
      nextPrompt();
    }
  };
</script>

{#key promptIndex}
  <Page>
    <div class="container">
      <h2>{curPrompt?.prompt}</h2>

      <TextArea
        globalClass="daily-log-text"
        bind:value={promptAnswer} />
    </div>

    <div slot="footer" class="footer">
      {#if promptIndex === 0}
        <Button onClick={() => transitionTo("index", "slide-right")} flex="1">
          Cancel
        </Button>
      {:else}
        <Button onClick={prevPrompt} flex="1">Back</Button>
      {/if}
      {#if promptIndex === userSettings.dailyPrompts.length - 1}
        <Button onClick={save} flex="1">Save</Button>
      {:else}
        <Button onClick={nextPrompt} flex="1">Next</Button>
      {/if}
    </div>
  </Page>
{/key}

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .container h2 {
    flex-shrink: 0;
  }
  :global(.daily-log-text) {
    width: 100%;
    flex: 1;
  }
  .footer {
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    padding-top: var(--padding-med);
  }
</style>
