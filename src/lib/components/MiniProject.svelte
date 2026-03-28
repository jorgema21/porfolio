<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/data/projects';

	let { project } = $props<{ project: Project }>();
</script>

<div class="mini">
	<ProjectCard {project} />
</div>

<style>
	.mini {
		background: #ddd;
		height: 100px;
	}
</style>