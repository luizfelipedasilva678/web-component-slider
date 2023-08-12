import { describe, expect, it, vi } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { onResize } from '../src/utils/dom/onResize';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('onResize', () => {
  it('should create a Reseze observer', () => {
    const div = createElement('div');
    const resizeObserver = onResize(div, () => {});
    expect(resizeObserver.observe).toBeCalled();
  });

  it('should not call observer', () => {
    const resizeObserver = onResize(null, () => {});
    expect(resizeObserver.observe).not.toBeCalled();
  });
});
