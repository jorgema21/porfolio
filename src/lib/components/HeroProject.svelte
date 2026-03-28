<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/data/projects';

	let {
		main,
		side,
		bottom
	} = $props<{
		main?: Project;
		side: Project[];
		bottom: Project[];
	}>();
</script>

<section class="hero">
	<div class="hero-main">
		{#if main}
			<ProjectCard project={main} />
		{/if}
	</div>

	<div class="hero-side">
		{#each side as p}
			<ProjectCard project={p} />
		{/each}
	</div>

	<div class="hero-bottom">
		{#each bottom as p}
			<ProjectCard project={p} />
		{/each}
	</div>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}

	.hero-side {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hero-bottom {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.hero-main {
		background: #111;
		color: white;
		height: 400px;
	}
</style>