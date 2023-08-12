import { addClass } from '../src/utils/dom/addClass';
import { queryAll } from '../src/utils/dom/queryAll';

describe('queryAll', () => {
  it('should return 0', () => {
    expect(queryAll(document.body, '.test').length).toBe(0);
  });

  it('should get all elements', () => {
    const div = document.createElement('div');
    addClass(div, 'test');
    document.body.appendChild(div);
    expect(queryAll(document.body, '.test').length).toBe(1);
  });
});
