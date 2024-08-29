<script>
  import { onMount } from "svelte";

  onMount(() => {
    const channel = new BroadcastChannel("my-channel");
    channel.postMessage("yo, you are now authenticated, sup");
  });
</script>
