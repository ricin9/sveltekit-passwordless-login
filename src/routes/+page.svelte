<script>
  import { onMount } from "svelte";

  onMount(() => {
    const channel = new BroadcastChannel("my-channel");
    channel.addEventListener("message", (event) => {
      console.log(event.data);
      window.close();
    });
  });
</script>

<h1>Welcome</h1>

<p>
  this is a demo of a sveltekit app with a login flow using email and magic link
  (passwordless login)
</p>
