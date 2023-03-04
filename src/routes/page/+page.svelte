<script lang="ts">
	import { page } from '$app/stores';
	// import { goto } from '$app/navigation'

	import { onMount } from 'svelte';
	import { updateUrlParams, isUrl } from '@erbelion/utils';

	import Make from '$lib/components/make.svelte';
	import ViewsBadge from '$lib/components/urlBadges/views.svelte';
	import LikesBadge from '$lib/components/urlBadges/likes.svelte';

	import eyeSvg from '$lib/images/eye.svg';
	import heartSvg from '$lib/images/heart.svg';

	const id: string = $page.url.searchParams.get('id') || import.meta.env.VITE_APP_URL;
	const action: string = $page.url.searchParams.get('action') || 'viewed';

	onMount(() => {
		// reset url params
		updateUrlParams({
			action: ''
		});
	});
</script>

{#if action === 'viewed'}
	<img src={eyeSvg} alt="viewed" height="80px" width="80px" />
	<h5>
		you viewed {#if isUrl(id)}
			<a target="_blank" rel="noreferrer" href="//{id}">{id}</a>
		{:else}
			{id}
		{/if}
	</h5>
{:else if action === 'liked'}
	<img src={heartSvg} alt="liked" height="80px" width="80px" />
	<h5>
		you liked {#if isUrl(id)}
			<a target="_blank" rel="noreferrer" href="//{id}">{id}</a>
		{:else}
			{id}
		{/if}
	</h5>
{/if}

<ViewsBadge {id} />
<LikesBadge {id} />

<hr />

<Make />
