<script lang="ts">
  import { onMount } from 'svelte';
  import { SvelteMap } from 'svelte/reactivity';
  import { cn } from '$lib/utils';
  import { Icon } from 'svelte-icons-pack';
  import { BsGithub } from 'svelte-icons-pack/bs';
  import {
    VscGitCommit,
    VscGitPullRequest,
    VscRepoForked,
    VscIssues,
    VscRepo,
  } from 'svelte-icons-pack/vsc';

  interface Props {
    username: string;
    class?: string;
  }

  interface EventItem {
    id: string;
    type: string;
    repo: string;
    message: string;
    date: Date;
  }

  interface RepoItem {
    name: string;
    url: string;
    eventTypes: string[];
  }

  interface GitHubEvent {
    id: string;
    type: string;
    repo: {
      name: string;
    };
    payload: {
      commits?: { message: string }[];
      action?: string;
      ref_type?: string;
      pull_request?: { title: string };
      issue?: { title: string };
    };
    created_at: string;
  }

  const { username, class: className }: Props = $props();

  let repos = $state<RepoItem[]>([]);
  let events = $state<EventItem[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  function getRepoIcon(eventTypes: string[]) {
    if (eventTypes.includes('PullRequestEvent')) return VscGitPullRequest;
    if (eventTypes.includes('ForkEvent')) return VscRepoForked;
    if (eventTypes.includes('CreateEvent')) return VscRepo;
    return VscGitCommit;
  }

  function getEventIcon(type: string) {
    switch (type) {
      case 'PullRequestEvent':
        return VscGitPullRequest;
      case 'ForkEvent':
        return VscRepoForked;
      case 'IssuesEvent':
        return VscIssues;
      case 'CreateEvent':
        return VscRepo;
      default:
        return VscGitCommit;
    }
  }

  function getEventMessage(event: GitHubEvent): string {
    switch (event.type) {
      case 'PushEvent':
        return event.payload.commits?.[0]?.message?.split('\n')[0] || 'Pushed commits';
      case 'PullRequestEvent':
        return `${event.payload.action} PR: ${event.payload.pull_request?.title || ''}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue: ${event.payload.issue?.title || ''}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type}`;
      case 'ForkEvent':
        return 'Forked repository';
      case 'WatchEvent':
        return 'Starred repository';
      default:
        return event.type.replace('Event', '');
    }
  }

  function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return `${Math.floor(diffDays / 7)}w`;
  }

  onMount(async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events/public`);
      if (!response.ok) throw new Error('Failed to fetch GitHub activity');

      const data: GitHubEvent[] = await response.json();

      // Get unique repos (max 3) with their event types - only user's own repos
      const repoMap = new SvelteMap<string, RepoItem>();
      for (const event of data) {
        const repoName = event.repo.name;
        // Skip repos not owned by the user
        if (!repoName.startsWith(`${username}/`)) continue;
        const existing = repoMap.get(repoName);
        if (existing) {
          if (!existing.eventTypes.includes(event.type)) {
            existing.eventTypes.push(event.type);
          }
        } else {
          repoMap.set(repoName, {
            name: repoName.replace(`${username}/`, ''),
            url: `https://github.com/${repoName}`,
            eventTypes: [event.type],
          });
        }
      }
      repos = Array.from(repoMap.values()).slice(0, 3);

      events = data.slice(0, 6).map((event) => ({
        id: event.id,
        type: event.type,
        repo: event.repo.name.replace(`${username}/`, ''),
        message: getEventMessage(event),
        date: new Date(event.created_at),
      }));
    } catch (e) {
      error = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      loading = false;
    }
  });
</script>

<div class={cn('not-prose border border-border/50 p-4', className)}>
  <div class="mb-3 flex flex-wrap items-center gap-2 text-sm">
    <div class="flex items-center gap-1.5 text-muted">
      <Icon src={BsGithub} size="14" />
      <span>Recent activity</span>
    </div>
    {#if !loading && repos.length > 0}
      {#each repos as repo (repo.name)}
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-xs transition-colors hover:border-muted hover:bg-border/30"
          data-umami-event={`github-repo-${repo.name}`}
        >
          <Icon src={getRepoIcon(repo.eventTypes)} size="12" className="text-muted" />
          {repo.name}
        </a>
      {/each}
    {/if}
  </div>

  {#if loading}
    <div class="space-y-2">
      {#each [0, 1, 2, 3, 4] as i (i)}
        <div class="flex items-center gap-3">
          <div class="h-4 w-4 animate-pulse rounded bg-border/50"></div>
          <div class="h-4 w-48 animate-pulse rounded bg-border/50"></div>
        </div>
      {/each}
    </div>
  {:else if error}
    <p class="text-sm text-muted">Unable to load activity</p>
  {:else if events.length === 0}
    <p class="text-sm text-muted">No recent activity</p>
  {:else}
    <div class="space-y-2">
      {#each events as event (event.id)}
        <a
          href={`https://github.com/${username}/${event.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-start gap-2 text-sm transition-colors hover:text-accent"
          data-umami-event={`github-activity-${event.repo}`}
        >
          <Icon src={getEventIcon(event.type)} size="16" className="mt-0.5 shrink-0 text-muted" />
          <span class="min-w-0 flex-1">
            <span class="font-medium">{event.repo}</span>
            <span class="text-muted"> - </span>
            <span class="text-muted group-hover:text-accent">{event.message}</span>
          </span>
          <span class="shrink-0 text-xs text-muted">{getRelativeTime(event.date)}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>
