import { describe, it, expect } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';

describe('createElement', () => {
  it('should create a div', () => {
    const div = createElement('div');
    expect(div).toBeDefined();
  });

  it('should create a element', () => {
    const div = createElement('div');
    expect(div).toBeDefined();
  });

  it('should create a web-component-slider', () => {
    const div = createElement('web-component-slider');
    expect(div).toBeDefined();
  });
});
