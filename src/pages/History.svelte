<script lang="ts">
  import Button from "../components/Button.svelte";
  import Page from "../components/Page.svelte";
  import { gloriaIndex } from "../feelingsModel";
  import { transitionTo } from "../navigation";
  import {
    Feeling,
    getFeelings,
    getLogEntries,
    LogEntry,
  } from "../storage/localDb";

  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const feelingsPromise = getFeelings(yearAgo, now);
  const logsPromise = getLogEntries(yearAgo, now);

  interface Day {
    date: Date;
    entries: Array<Feeling | LogEntry>;
  }

  const daysPromise = Promise.all([feelingsPromise, logsPromise]).then(
    (lists) =>
      [...lists[0], ...lists[1]]
        .sort((a, b) => b.ts.getTime() - a.ts.getTime())
        .reduce((list, entry) => {
          const entryDay = new Date(entry.ts.getTime());
          entryDay.setHours(0);
          entryDay.setMinutes(0);
          entryDay.setSeconds(0);
          entryDay.setMilliseconds(0);

          if (list.length > 0) {
            const lastEntry = list[list.length - 1];
            console.log(lastEntry, entryDay);
            if (lastEntry.date.getTime() === entryDay.getTime()) {
              console.log("APPENDING");
              lastEntry.entries.push(entry);
              return list;
            }
          }
          list.push({
            date: entryDay,
            entries: [entry],
          });
          return list;
        }, [] as Array<Day>)
  );

  daysPromise.then(console.log);
</script>

<Page>
  <div class="container">
    {#await daysPromise}
      <span>Loading...</span>
    {:then days}
      <ol>
        {#each days as day}
          <li>
            <h3>{day.date.toLocaleDateString()}</h3>
            {#each day.entries as entry}
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
                <div
                  class="feeling"
                  style={`background-color: ${
                    gloriaIndex[entry["path"][0]].color
                  }`}
                >
                  {entry["path"][entry["path"].length - 1]}
                </div>
              {/if}
            {/each}
          </li>
        {/each}
      </ol>
    {/await}
    <ol />
  </div>

  <div slot="footer" class="footer">
    <Button
      flex="0 auto 0"
      onClick={() => transitionTo("index", "slide-right")}
    >
      Back
    </Button>
  </div>
</Page>

<style>
  .container > ol {
    list-style: none;
  }
  .feeling {
    padding: var(--padding-small);
    border-radius: 22px;
    width: fit-content;
    font-weight: bold;
    background-color: #ffffff;
  }
  .footer {
    display: flex;
    flex-direction: row;
    gap: var(--padding-med);
    padding-top: var(--padding-med);
  }
  .footer :global(button) {
    width: 50%;
  }
</style>
