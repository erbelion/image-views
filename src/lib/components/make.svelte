<script lang="ts">
import badgeGenerator from '$lib/utils/badgeGenerator'

import ViewsBadge from '$lib/components/urlBadges/views.svelte'
import LikesBadge from '$lib/components/urlBadges/likes.svelte'

const generator = {
    input: {
        views: true,
        likes: true,
        comments: false,
        oneBadgeEnabled: () => ((generator.input.views ? 1 : 0) + (generator.input.likes ? 1 : 0) + (generator.input.comments ? 1 : 0)) <= 1,
        id: 'views.erbek.space',
    },
    loading: {
        status: false,
        timeout: setTimeout(() => {}, 0),
    },
    request: () => {
        generator.loading.status = true
        clearTimeout(generator.loading.timeout)
        generator.loading.timeout = setTimeout(() => {
            generator.loading.status = false
            generator.make()
        }, 2500)
    },
    make: () => {
        const toGenerate = []
        if (generator.input.views) toGenerate.push('viewed')
        if (generator.input.likes) toGenerate.push('liked')
        if (generator.input.comments) toGenerate.push('commented')

        generator.result = badgeGenerator(generator.input.id, toGenerate)
    },
    result: {
        html: '',
        md: '',
        img: '',
        page: ''
    }
}

const clipboard = {
    copy: (elementId: string) => {
        const text = (document.getElementById(elementId) as HTMLInputElement).innerText
        navigator.clipboard.writeText(text)
        clipboard.copied.status = true
        clearTimeout(clipboard.copied.timeout)
        clipboard.copied.timeout = setTimeout(() => {
            clipboard.copied.status = false
        }, 2000)
    },
    copied: {
        status: false,
        timeout: setTimeout(() => {}, 0),
    }
}

generator.make()
</script>

<div class="row">
    <h3 class="mb-3">
        create your badge(s)<br>
    </h3>

    <div class="col-12 mb-3">
        <div class="form-check form-switch d-inline-block pe-4">
            <input bind:checked={generator.input.views} on:change={() => generator.request()} disabled={generator.input.oneBadgeEnabled() && generator.input.views} class="form-check-input" type="checkbox" role="switch" id="switchViews">
            <label class="form-check-label" for="switchViews">views</label>
        </div>
        <div class="form-check form-switch d-inline-block pe-4">
            <input bind:checked={generator.input.likes} on:change={() => generator.request()} disabled={generator.input.oneBadgeEnabled() && generator.input.likes} class="form-check-input" type="checkbox" role="switch" id="switchLikes">
            <label class="form-check-label" for="switchLikes">likes</label>
        </div>
        <div class="form-check form-switch d-inline-block pe-4">
            <input bind:checked={generator.input.comments} on:change={() => generator.request()} disabled={true} class="form-check-input" type="checkbox" role="switch" id="switchComments">
            <label class="form-check-label" for="switchComments">comments</label>
        </div>
    </div>

    <div class="col-12 mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon1">url/name</span>
            <input bind:value={generator.input.id} on:input={() => generator.request()} type="text" class="form-control">
        </div>
    </div>

    {#if generator.loading.status}
        <div class="col-12 mb-3">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:else}
        <h5 class="mb-1">result</h5>

        <div class="col-12 mb-3">
            {#if generator.input.views} <ViewsBadge id={generator.input.id} /> {/if}
            {#if generator.input.likes} <LikesBadge id={generator.input.id} /> {/if}
        </div>

        <h5 class="mb-2">{clipboard.copied.status ? 'copied!' : 'click below to copy'}</h5>
        
        <div class="col-12 mb-3">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard.copy('copy-html')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">html</span>
                <div id="copy-html" class="form-control copy-value">{generator.result.html}</div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard.copy('copy-md')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">md</span>
                <div id="copy-md" class="form-control copy-value">{generator.result.md}</div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard.copy('copy-img')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">img</span>
                <div id="copy-img" class="form-control copy-value">{generator.result.img}</div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard.copy('copy-page')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">page</span>
                <div id="copy-page" class="form-control copy-value">{generator.result.page}</div>
            </div>
        </div>
    {/if}
</div>

<style>
/* textarea {
    cursor: pointer;
    resize: none;
} */

.copy-label {
    width: 80px;
    text-align: center;
    justify-content: center;
}

.copy-value {
    overflow: hidden;
}
</style>