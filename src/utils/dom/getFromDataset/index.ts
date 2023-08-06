export const getFromDataset = (
  el: HTMLElement,
  prop: string
): string | undefined => {
  return el.dataset[prop];
};
