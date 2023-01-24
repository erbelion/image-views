<script lang="ts">
import { onMount } from 'svelte'
import { urlParams, updateUrlParams } from '@erbelion/utils'

let action: {
    type: string | null,
    id: string | null
} = {
    type: null,
    id: null
}

onMount(() => {
    const params = urlParams()

    if (params.viewed) {
        action.type = 'viewed'
        action.id = params.viewed
    } else if (params.liked) {
        action.type = 'liked'
        action.id = params.liked
    } else if (params.commented) {
        action.type = 'commented'
        action.id = params.commented
    }

    // reset url params
    updateUrlParams({
        viewed: '',
        liked: '',
        commented: ''
    })
})

let loadedImage = false
let loading = false

const clipboard = (elementId: string) => {
    const text = (document.getElementById(elementId) as HTMLInputElement).innerHTML
    navigator.clipboard.writeText(text)
}
</script>

<div class="row">
    <h3 class="mb-3">
        make an image<br>
        <img src="/api/test-webp.webp" alt="xdxd">
    </h3>

    <div class="col-12 mb-3">
        <div class="form-check form-switch d-inline-block pe-4">
            <input class="form-check-input" type="checkbox" role="switch" id="switchViews" checked disabled>
            <label class="form-check-label" for="switchViews">views</label>
        </div>
        <div class="form-check form-switch d-inline-block pe-4">
            <input class="form-check-input" type="checkbox" role="switch" id="switchLikes" disabled>
            <label class="form-check-label" for="switchLikes">likes</label>
        </div>
        <div class="form-check form-switch d-inline-block pe-4">
            <input class="form-check-input" type="checkbox" role="switch" id="switchComments" disabled>
            <label class="form-check-label" for="switchComments">comments</label>
        </div>
    </div>

    <div class="col-12 mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon1">url/name</span>
            <input type="text" class="form-control" value="https://views.erbek.space/">
        </div>
    </div>

    {#if loading}
        <div class="col-12 mb-3">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {/if}

    {#if loadedImage}
        <h5 class="mb-3">your generated image(s)</h5>

        <div class="col-12 mb-3">
            <img src="/icon.webp" alt="">
        </div>

        <h5 class="mb-3">copy (click!)</h5>
        
        <div class="col-12 mb-3">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard('copy-url')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">url</span>
                <div id="copy-url" class="form-control">xdd1</div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard('copy-html')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">html</span>
                <div id="copy-html" class="form-control">xdd22</div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => clipboard('copy-md')} class="input-group mb-1" role='button'>
                <span class="input-group-text copy-label">md</span>
                <div id="copy-md" class="form-control">xdd444</div>
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
</style>