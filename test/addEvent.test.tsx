import { describe, it, vi, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createElement } from '../src/utils/dom/createElement';
import { addEvent } from '../src/utils/dom/addEvent';

describe('addEvent', () => {
  it('should add event', async () => {
    const fn = vi.fn();

    const button = createElement('button');
    addEvent('click', button, fn);

    await userEvent.click(button);
    expect(fn).toBeCalled();
  });

  it('should not add event', async () => {
    const fn = vi.fn();

    addEvent('click', null, fn);

    await userEvent.click(null);
    expect(fn).not.toBeCalled();
  });
});
