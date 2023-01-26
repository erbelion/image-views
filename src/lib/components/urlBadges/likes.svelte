<script lang="ts">
export let id: string = import.meta.env.VITE_APP_URL
</script>

<a href="{import.meta.env.VITE_FULL_APP_URL}/api/like?id={id}" rel="external">
    <img src="/api/likes.svg?id={id}" alt="likes">
</a>