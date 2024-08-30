<script>
  import { onMount } from "svelte";

  export let data;

  onMount(() => {
    const channel = new BroadcastChannel("magicLinkSuccess");
    channel.postMessage("success");
  });
</script>

<h1>Private Page</h1>

<p>Only logged in users can see this page</p>

<p>hello {data.user?.name}</p>
