<script lang="ts">
  import { projects } from "$lib/data/projects";
  import "$lib/styles/home.css";

  import HeroProject from "$lib/components/HeroProject.svelte";
  import FullProjectsSection from "$lib/components/FullProjectsSection.svelte";
  import InvertProjectSection from "$lib/components/InvertProjectSection.svelte";

  const heroMain = projects.find((p) => p.section === "hero-main");
  const heroSide = projects.filter((p) => p.section === "hero-side");
  const heroBottom = projects.filter((p) => p.section === "hero-bottom");

  const full = projects.filter((p) => p.section === "full");

  const invertSide = projects.filter((p) => p.section === "invert-side");
  const invertMain = projects.find((p) => p.section === "invert-main");
  const invertBottom = projects.filter((p) => p.section === "invert-bottom");
</script>

<div class="page">
  <header class="topbar">
    <h1>Mi Portfolio</h1>
  </header>

  <HeroProject main={heroMain} side={heroSide} bottom={heroBottom} />

  <FullProjectsSection projects={full} />

  <InvertProjectSection
    side={invertSide}
    main={invertMain}
    bottom={invertBottom}
  />
</div>
