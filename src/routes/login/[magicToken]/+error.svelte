<script>
  import { page } from "$app/stores";
</script>

<h1>Magic Link Error</h1>

<p class="error">{$page.error?.message}</p>

<style>
  .error {
    color: red;
  }
</style>
