import { describe } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { addInlineStyles } from '../src/utils/dom/addInlineStyles';

describe('addInlineStyles', () => {
  it('should add inline style', () => {
    const div = createElement('div');

    addInlineStyles(div, {
      fontFamily: 'sans-serif',
    });

    expect(div.style.fontFamily).toBe('sans-serif');
  });

  it('should not add inline style', () => {
    const div = createElement('div');

    addInlineStyles(null, {
      fontFamily: 'sans-serif',
    });

    expect(div.style.fontFamily).not.toBe('sans-serif');
  });
});
