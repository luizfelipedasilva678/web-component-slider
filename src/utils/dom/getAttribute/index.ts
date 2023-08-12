export const getAttribute = (
  el: Element | null,
  attr: string
): string | null => {
  if (el == null) return null;

  return el.getAttribute(attr);
};
