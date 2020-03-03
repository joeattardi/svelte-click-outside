# svelte-click-outside

## Purpose

This is a small helper component that lets you listen for clicks *outside* of an element. For example, if you want to close a popup when the user clicks outside of it.

## Installation

    npm install --save svelte-click-outside

## Basic Usage

Wrap the element in the `<ClickOutside>` component and listen for the `clickoutside` event:

```html
  <script>
    function onClickOutside() {
      console.log('Clicked outside!');
    }
  </script>

  <ClickOutside on:clickoutside={onClickOutside}>
    <div>Click Outside Me</div>
  </ClickOutside>
```

## Exclusions

By default, clicking on *any* element outside of the wrapped element will cause the event to trigger. You can specify excluded elements that will not trigger the event.
For example, a button that triggers a popup must be excluded. Otherwise, it will immediately close the popup when it is opened.

The `ClickOutside` component has an `exclude` prop that expects an array of DOM nodes. Clicks on those nodes or their children will be ignored.

## Scope of higher DOM element

By default, `clickoutside` events will be fired for clicks on the DOM's `body`. If you'd prefer to use `window` as a reference (e.g. so the event is fired when elements beyond the scope of `body` are clicked), add the `useWindow` prop:

```
  <ClickOutside on:clickoutside={hidePanel} useWindow>
```

## Example: Show/hide panel

```html
  <script>
    import ClickOutside from 'svelte-click-outside';

    let triggerEl;
    let panelVisible = false;

    function togglePanel() {
      panelVisible = !panelVisible;
    }

    function hidePanel() {
      panelVisible = false;
    }
  </script>

  <button bind:this={triggerEl} on:click={togglePanel}>Click Me</button>

  <ClickOutside on:clickoutside={hidePanel} exclude={[triggerEl]}>
    <div hidden={!panelVisible}>I'm a panel!</div>
  </ClickOutside>
```
