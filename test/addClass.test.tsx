import { describe, expect } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { addClass } from '../src/utils/dom/addClass';

describe('addClass', () => {
  it('should add a class', () => {
    const el = createElement('div');
    addClass(el, 'foo');
    expect(el.classList.contains('foo')).toBe(true);
  });

  it('should not add a class', () => {
    const el = createElement('div');
    addClass(null, 'foo');
    expect(el.classList.contains('foo')).toBe(false);
  });
});
