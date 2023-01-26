<script lang="ts">
export let id: string = import.meta.env.VITE_APP_URL
</script>

<a href="{import.meta.env.VITE_FULL_APP_URL}/page/?id={id}" rel="external">
    <img src="/api/views.svg?id={id}" alt="views">
</a>