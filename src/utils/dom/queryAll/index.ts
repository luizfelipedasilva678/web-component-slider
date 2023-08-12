export const queryAll = <T>(parent: Element, elQuery: string): T[] => {
  return Array.from(parent.querySelectorAll(elQuery)) as T[];
};
