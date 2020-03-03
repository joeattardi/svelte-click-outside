<script>
  import { createEventDispatcher } from 'svelte';

  import Body from './body.svelte';
  import Window from './window.svelte';

  export let exclude = [];
  export let useWindow = false;

  let child;

  const dispatch = createEventDispatcher();
  const domScope = useWindow ? Window : Body;

  function isExcluded(target) {
    var parent = target;

    while (parent) {
      if (exclude.indexOf(parent) >= 0 || parent === child) {
        return true;
      }

      parent = parent.parentNode;
    }

    return false;
  }

  function onClickOutside(event) {
    if (!isExcluded(event.target)) {
      dispatch('clickoutside');
    }
  }
</script>

<svelte:component this={domScope} on:click={onClickOutside} />
<div bind:this={child}>
  <slot></slot>
</div>
