<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";
  import RichText from "$lib/components/writing/RichText.svelte";
  import GroupAccordion from "$lib/components/writing/GroupAccordion.svelte";
  import { createGroupedProjects } from "$lib/utils/createGroupedProjects.svelte";

  const groupedData = createGroupedProjects("maternidad", "Otros");
</script>

<div class="page">
  <h1>{t.parenting.title}</h1>

  <RichText value={t.parenting.intro} />
  <RichText value={t.parenting.description} />
  <RichText value={t.parenting.aim} />

  <GroupAccordion groups={groupedData.grouped} />
</div>
