<script lang="ts">
	import Index from "./pages/Index.svelte";
	import { currentPage } from "./navigation";
	import CheckIn from "./pages/CheckIn.svelte";

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
	{/if}
</div>

<style>
	.wrapper {
		font-family: "Raleway", sans-serif;
		height: 100vh;
		margin: auto;
		max-width: 800px;
		position: relative;
	}
</style>
