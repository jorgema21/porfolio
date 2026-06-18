<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";
  import RichText from "$lib/components/writing/RichText.svelte";
  import GroupAccordion from "$lib/components/writing/GroupAccordion.svelte";
  import { createGroupedProjects } from "$lib/utils/createGroupedProjects.svelte";

  const groupedData = createGroupedProjects("estilo_de_vida", "Otros");
</script>

<div class="page">
  <h1>{t.style.title}</h1>

  <RichText value={t.style.intro} />
  <RichText value={t.style.description} />
  <RichText value={t.style.aim} />

  <GroupAccordion groups={groupedData.grouped} />
</div>
