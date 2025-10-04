<script lang="ts" module>
  type FrontmatterStringValue = {
    type: 'string';
    value: string;
    icon: IconType;
  };

  type FrontmatterUrlsValue = {
    type: 'urls';
    value: {
      label: string;
      url: string;
      icon: IconType;
    }[];
    icon: IconType;
  };

  interface FrontmatterData {
    today: FrontmatterStringValue;
    last_modified: FrontmatterStringValue;
    links: FrontmatterUrlsValue;
  }

  import { GIT_LAST_MODIFIED } from '$lib/gitDate';
  export const frontmatterData: FrontmatterData = {
    today: {
      type: 'string',
      value: new Date().toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      icon: VscListSelection,
    },
    last_modified: {
      type: 'string',
      value: GIT_LAST_MODIFIED,
      icon: VscListSelection,
    },
    links: {
      type: 'urls',
      value: [
        {
          label: 'GitHub',
          url: 'https://github.com/leonardcser',
          icon: BsGithub,
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/leonardcsrs/',
          icon: BsLinkedin,
        },
        {
          label: 'Contact',
          url: 'mailto:leonard.cseres@devleo.ch',
          icon: IoMail,
        },
      ],
      icon: TrOutlineList,
    },
  };

  const frontmatterCount = Object.keys(frontmatterData).length;
  export const frontmatterHeight = frontmatterCount * 20 + (frontmatterCount - 1) * 4;
</script>

<script lang="ts">
  import { Icon, type IconType } from 'svelte-icons-pack';
  import { VscListSelection } from 'svelte-icons-pack/vsc';
  import { TrOutlineList } from 'svelte-icons-pack/tr';
  import { BsGithub, BsLinkedin } from 'svelte-icons-pack/bs';
  import LinkTag from './LinkTag.svelte';
  import { IoMail } from 'svelte-icons-pack/io';

  let { this: element }: { this?: HTMLElement } = $props();
</script>

<div
  bind:this={element}
  class="grid grid-cols-[auto_1fr] gap-8 font-mono text-sm text-muted *:space-y-1"
>
  <div>
    {#each Object.entries(frontmatterData) as [label, value]}
      <div class="flex items-center gap-2">
        <Icon src={value.icon} />
        <p>{@html label}</p>
      </div>
    {/each}
  </div>
  <div class="overflow-x-auto">
    {#each Object.values(frontmatterData) as value}
      {#if value.type === 'string'}
        <p>{value.value}</p>
      {:else if value.type === 'urls'}
        <div class="flex flex-row flex-nowrap gap-1 overflow-x-auto">
          {#each value.value as url}
            <LinkTag
              href={url.url}
              label={url.label}
              icon={url.icon}
              umamiEventPrefix={'frontmatter-' + url.label}
            />
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>
