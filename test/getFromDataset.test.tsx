import { describe, it } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { setOnDataset } from '../src/utils/dom/setOnDataset';
import { getFromDataset } from '../src/utils/dom/getFromDataset';

describe('getFromDataset', () => {
  it('should return the value of attribute on dataset', () => {
    const div = createElement('div');
    setOnDataset(div, 'test', 'test');
    expect(getFromDataset(div, 'test')).toBe('test');
  });

  it('should return undefined when attribute doenst exists', () => {
    const div = createElement('div');
    expect(getFromDataset(div, 'test')).toBe(undefined);
  });
});
