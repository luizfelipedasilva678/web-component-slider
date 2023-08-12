import { describe, expect } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { getAssignedElements } from '../src/utils/dom/getAssinedElements';

describe('getAssinedElements', () => {
  it('should get the assigned elements', () => {
    const slot = createElement('slot');
    const assinedElements = getAssignedElements(slot as HTMLSlotElement);

    expect(assinedElements).toBeDefined();
    expect(assinedElements.length).toBe(0);
  });

  it('should return an empty array when slot element is null', () => {
    const assinedElements = getAssignedElements(null);
    expect(assinedElements).toBeDefined();
    expect(assinedElements.length).toBe(0);
  });
});
