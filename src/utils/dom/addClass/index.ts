export const addClass = (
  el: HTMLElement | null | undefined,
  name: string
): void => {
  if (el != null) el.classList.add(name);
};
