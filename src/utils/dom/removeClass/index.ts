export const removeClass = (el: HTMLElement | null, name: string): void => {
  if (el != null) el.classList.remove(name);
};
