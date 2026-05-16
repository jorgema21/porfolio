<script lang="ts">
  import { t } from "$lib/i18n";
  import RichText from "$lib/components/writing/RichText.svelte";
  import GroupAccordion from "$lib/components/writing/GroupAccordion.svelte";
  import { createGroupedProjects } from "$lib/utils/createGroupedProjects.svelte";

  const { grouped } = createGroupedProjects("maternidad", $t.motherhood.others);
</script>

<main class="page">
  <h1>{$t.motherhood.title}</h1>

  <RichText value={$t.motherhood.intro} />
  <RichText value={$t.motherhood.description} />
  <RichText value={$t.motherhood.aim} />

  <GroupAccordion groups={grouped()} />
</main>
