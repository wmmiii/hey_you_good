<script lang="ts">
	import CheckIn from "./pages/CheckIn.svelte";
	import DailyLog from "./pages/DailyLog.svelte";
	import History from "./pages/History.svelte";
	import Index from "./pages/Index.svelte";
	import Settings from "./pages/Settings.svelte";
	import { currentPage } from "./navigation";

	let page;
	currentPage.subscribe((value) => {
		page = value;
	});
</script>

<div class="wrapper">
	{#if page === "index"}
		<Index />
	{:else if page === "check-in"}
		<CheckIn />
	{:else if page === "daily-log"}
		<DailyLog />
	{:else if page === "history"}
		<History />
	{:else if page === "settings"}
		<Settings />
	{/if}
</div>

<style>
	.wrapper {
		font-family: "Raleway", sans-serif;
		height: 100vh;
		margin: auto;
		max-width: 800px;
		overflow: hidden;
		position: relative;
	}
</style>
