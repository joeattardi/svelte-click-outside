<script>
  import ClickOutside from './index.svelte';

  let triggerEl;
  let ignoreEl;

  let bodyVisible = false;

  function showBody() {
    bodyVisible = true;
  }

  function hideBody() {
    bodyVisible = false;
  }
</script>

<button on:click={showBody} bind:this={triggerEl}>Trigger</button>
<ClickOutside on:clickoutside={hideBody} exclude={[triggerEl, ignoreEl]}>
  <div hidden={!bodyVisible}><span>Main body</span></div>
</ClickOutside>
<div bind:this={ignoreEl}>Ignore Me</div>
