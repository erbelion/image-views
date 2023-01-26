<script lang="ts">
	import github from '$lib/images/github.svg'
	import '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
</script>

<div class="app">
	<div class="container container-fluid mt-5">
		<div class="d-flex justify-content-between align-items-center">
			<a href="/"><h1>image-views</h1></a>
			<a href="/icon.webp" target="_blank" rel="noreferrer">
				<img src="/icon.webp" alt="funny rat" style="vertical-align:middle" height="60"/>
			</a>
		</div>
		
		<hr>

		<main>
			<slot />
		</main>

		<hr>
	
		<footer class="mx-auto text-center">
			<a href="https://github.com/erbelion/image-views" target="_blank" rel="noreferrer">
				<img src={github} alt="GitHub" height="40px" width="40px" />
			</a>
		</footer>
	</div>
</div>

<style>
a {
  text-decoration: none;
}
</style>