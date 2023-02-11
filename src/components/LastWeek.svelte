<script lang="ts">
  import BiCheckCircle from "svelte-icons-pack/bi/BiCheckCircle";
  import Icon from "./Icon.svelte";
  import { fade } from "svelte/transition";
  import { getFeelings } from "../storage/localDb";

  interface DayProgress {
    date: Date;
    checkIn: Promise<boolean>;
  }

  const days: DayProgress[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let currDay = new Date(today);
  currDay.setDate(currDay.getDate() + 1);

  for (let i = 0; i < 7; ++i) {
    const prevDay = new Date(currDay);
    prevDay.setDate(prevDay.getDate() - 1);
    days.unshift({
      date: prevDay,
      checkIn: getFeelings(prevDay, currDay).then((f) => f.length > 0),
    });
    currDay = prevDay;
  }
</script>

<div>
  <h2>Over the last week...</h2>
  <div class="week">
    {#each days as day}
      <div>
        {day.date.toLocaleString("default", { weekday: "short" })}
      </div>
    {/each}
    {#each days as day, i}
      <div>
        {#await day.checkIn then checkIn}
          {#if checkIn}
            <div in:fade={{ delay: 100 * i }}>
              <Icon
                size="24"
                src={BiCheckCircle}
                color="var(--col-success)"
                viewBox="0 0 24 24"
              />
            </div>
          {/if}
        {/await}
      </div>
    {/each}
  </div>
</div>

<style>
  .week {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    width: 100%;
  }
  .week > div {
    align-items: center;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: center;
    min-height: 24px;
    min-width: 24px;
    padding: var(--padding-small);
  }
  .week > div:nth-child(7n) {
    border-right: none;
  }
  .week > div:nth-child(n + 8) {
    border-bottom: none;
  }
</style>
