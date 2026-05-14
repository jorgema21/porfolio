<script lang="ts">
  import type {
    TimelineItem as TimelineItemType,
  } from "$lib/data/about/timeline.data";

  import { t } from "$lib/i18n";

  type Side = "left" | "right";

  interface Props {
    item: TimelineItemType;
    side: Side;
    active: boolean;
  }

  let {
    item,
    side,
    active,
  }: Props = $props();

  const content = $derived(() => {
    const dict = $t.timeline;

    if (item.id in dict) {
      return dict[
        item.id as keyof typeof dict
      ];
    }

    return {
      title: item.title,
      description: item.description,
    };
  });
</script>

<article
  class={[
    "timeline-item",
    side,
    active && "visible",
  ]
    .filter(Boolean)
    .join(" ")}
  data-category={item.category}
>
  <div class="timeline-branch"></div>

  <div class="timeline-dot"></div>

  <div class="timeline-card">
    <span class="timeline-date">
      {item.date}
    </span>

    <h3>{content().title}</h3>

    <p>
      {content().description}
    </p>
  </div>
</article>