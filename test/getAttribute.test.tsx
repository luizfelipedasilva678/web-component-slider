import { describe } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { getAttribute } from '../src/utils/dom/getAttribute';

describe('getAttribute', () => {
  it('should return the value of the attribute', () => {
    const div = createElement('div');
    div.setAttribute('test', 'test');
    expect(getAttribute(div, 'test')).toBe('test');
  });

  it('should return null when attribute doesnt exist', () => {
    const div = createElement('div');
    expect(getAttribute(div, 'test')).toBe(null);
  });
});
