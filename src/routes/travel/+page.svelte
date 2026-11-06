<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";
  import RichText from "#lib/components/writing/RichText.svelte";
  import GroupAccordion from "#lib/components/writing/GroupAccordion.svelte";
  import { createGroupedProjects } from "#lib/utils/createGroupedProjects.svelte.js";

  const groupedData = createGroupedProjects("viajes", "Otros");
</script>

<div class="page">
  <h1>{t.travel.title}</h1>

  <RichText value={t.travel.intro} />
  <RichText value={t.travel.aim} />

  <GroupAccordion groups={groupedData.grouped} />
</div>
