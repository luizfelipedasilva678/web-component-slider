import { describe, it } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { addClass } from '../src/utils/dom/addClass';
import { removeClass } from '../src/utils/dom/removeClass';

describe('removeClass', () => {
  it('should remove the class', () => {
    const div = createElement('div');
    addClass(div, 'test');
    removeClass(div, 'test');
    expect(div.classList.contains('test')).toBe(false);
  });

  it('should not remove class when element is null', () => {
    const div = createElement('div');
    addClass(div, 'test');
    removeClass(null, 'test');
    expect(div.classList.contains('test')).toBe(true);
  });
});
