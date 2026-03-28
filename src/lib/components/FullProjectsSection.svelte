<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Project } from '$lib/data/projects';

	let { projects } = $props<{ projects: Project[] }>();
</script>

<section class="full">
	{#each projects as project}
		<div class="full-project">
			<ProjectCard {project} />
		</div>
	{/each}
</section>