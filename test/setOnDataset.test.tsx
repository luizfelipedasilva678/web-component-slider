import { describe } from 'vitest';
import { createElement } from '../src/utils/dom/createElement';
import { setOnDataset } from '../src/utils/dom/setOnDataset';
import { getFromDataset } from '../src/utils/dom/getFromDataset';

describe('setOnDataset', () => {
  it('should set value on dataset', () => {
    const div = createElement('div');
    setOnDataset(div, 'test', 'test');
    expect(getFromDataset(div, 'test')).toBe('test');
  });

  it('should not set nothing on dataset', () => {
    const div = createElement('div');
    setOnDataset(null, 'test', 'test');
    expect(getFromDataset(div, 'test')).toBe(undefined);
  });
});
