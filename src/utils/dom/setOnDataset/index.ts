export const setOnDataset = (
  el: HTMLElement | null,
  prop: string,
  value: string
): void => {
  if (el != null) el.dataset[prop] = value;
};
