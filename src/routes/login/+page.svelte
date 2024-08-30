<script lang="ts">
  import { onMount } from "svelte";

  export let form: { error: string; success: boolean };

  let magicLinkSuccess = false;
  onMount(() => {
    const channel = new BroadcastChannel("magicLinkSuccess");
    channel.onmessage = (event) => {
      if (event.data === "success") {
        magicLinkSuccess = true;
      }
    };
  });
</script>

<h1>Login</h1>

<p>login using email and magic link</p>
<p>note: magic link only works from the same ip you logged in</p>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

{#if form?.success && !magicLinkSuccess}
  <p class="success">check your email for magic link</p>
{/if}

{#if magicLinkSuccess}
  <h2 class="success">logged in successfully, you can now close this tab</h2>
{:else}
  <form method="post">
    <label for="email">email </label><input type="email" name="email" /><br />
    <button type="submit">send me magic link!</button>
  </form>
{/if}

<style>
  .error {
    color: red;
  }

  .success {
    color: green;
  }

  form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }

  /* Style the labels and inputs */
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  /* Style the submit button */
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
