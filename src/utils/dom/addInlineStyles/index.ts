export const addInlineStyles = (
  el: HTMLElement | null,
  properties: Partial<CSSStyleDeclaration>
): void => {
  if (el != null)
    for (const prop in properties) {
      el.style[prop] = properties[prop] as string;
    }
};
