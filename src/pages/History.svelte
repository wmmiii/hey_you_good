<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { transitionTo } from "../navigation";
  import { getFeelings, getLogEntries } from "../storage/localDb";

  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const feelingsPromise = getFeelings(yearAgo, now);
  const logsPromise = getLogEntries(yearAgo, now);

  const entriesPromise = Promise.all([feelingsPromise, logsPromise]).then(
    (lists) => [...lists[0], ...lists[1]]
  );
</script>

<Page>
  <div class="container">
    {#await entriesPromise}
      <span>Loading...</span>
    {:then entries}
      <ol>
        {#each entries as entry}
          <li>
            <h3>{entry.ts.toLocaleDateString()}</h3>
            {#if entry["entries"] != null}
              <ul>
                {#each Object.keys(entry["entries"]) as prompt}
                  <li>
                    <h4>{prompt}</h4>
                    <p>{entry["entries"][prompt]}</p>
                  </li>
                {/each}
              </ul>
            {:else if entry["path"] != null}
              <p>{entry["path"][entry["path"].length - 1]}</p>
            {/if}
          </li>
        {/each}
      </ol>
    {/await}
    <ol />
  </div>

  <div slot="footer" class="footer">
    <Button onClick={() => transitionTo("index", "slide-right")}>Back</Button>
  </div>
</Page>

<style>
  .footer {
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    padding-top: var(--padding-med);
  }
</style>
