const { render, cleanup, fireEvent, prettyDOM, waitForElement } = require('@testing-library/svelte');
const { tick } = require('svelte');

const App = require('./index.test.svelte');

beforeEach(cleanup);

describe('ClickOutside', () => {
  test('should trigger the event when clicking outside', async () => {
    const { getByText } = render(App);
    const mainBody = getByText('Main body').parentElement;
    const trigger = getByText('Trigger');

    fireEvent.click(trigger);
    await tick();
    expect(mainBody.hidden).toBe(false);

    fireEvent.click(document.body);
    await tick();
    expect(mainBody.hidden).toBe(true);
  });

  test('should ignore clicks inside the contained element', async () => {
    const { getByText } = render(App);
    const mainBody = getByText('Main body').parentElement;
    const trigger = getByText('Trigger');

    fireEvent.click(trigger);
    await tick();
    expect(mainBody.hidden).toBe(false);

    fireEvent.click(getByText('Main body'));
    await tick();
    expect(mainBody.hidden).toBe(false);

    fireEvent.click(mainBody);
    await tick();
    expect(mainBody.hidden).toBe(false);
  });

  test('should ignore clicks inside elements in the exclude prop', async () => {
    const { getByText } = render(App);
    const mainBody = getByText('Main body').parentElement;
    const trigger = getByText('Trigger');

    fireEvent.click(trigger);
    await tick();
    expect(mainBody.hidden).toBe(false);

    fireEvent.click(getByText('Ignore Me'));
    await tick();
    expect(mainBody.hidden).toBe(false);
  });
});
