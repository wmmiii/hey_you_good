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
  <table class="week">
    <tr>
      {#each days as day}
        <th>
          {day.date.toLocaleString("default", { weekday: "short" })}
        </th>
      {/each}
    </tr>
    <tr>
      {#each days as day, i}
        <td>
          {#await day.checkIn then checkIn}
            {#if checkIn}
              <div class="check-in" in:fade={{ delay: 100 * i }}>
                <Icon
                  size="24"
                  src={BiCheckCircle}
                  color="var(--col-success)"
                  viewBox="0 0 24 24"
                />
              </div>
            {/if}
          {/await}
        </td>
      {/each}
    </tr>
  </table>
</div>

<style>
  .week {
    border-collapse: collapse;
    width: 100%;
  }
  .week th,
  .week td {
    padding: var(--padding-small);
    border: 1px solid var(--border);
  }
  .week tr td:first-child,
  .week tr th:first-child {
    border-left: none;
  }
  .week tr:first-child th {
    border-top: none;
  }
  .week tr td:last-child,
  .week tr th:last-child {
    border-right: none;
  }
  .week tr:last-child td {
    border-bottom: none;
  }

  .check-in {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 24px;
    min-width: 24px;
  }
</style>
