import { describe } from 'vitest';
import { setAttribute } from '../src/utils/dom/setAttribute';
import { getAttribute } from '../src/utils/dom/getAttribute';

describe('setAttribute', () => {
  it('should set attribute on element', () => {
    const div = document.createElement('div');
    setAttribute(div, 'test', 'test');
    expect(getAttribute(div, 'test')).toBe('test');
  });

  it('should return null when element is null', () => {
    const div = document.createElement('div');
    setAttribute(div, 'test', 'test');
    expect(getAttribute(null, 'test')).toBe(null);
  });
});
