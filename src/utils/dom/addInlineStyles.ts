export const addInlineStyles = (
  el: HTMLElement,
  properties: Partial<CSSStyleDeclaration>
): void => {
  for (const prop in properties) {
    el.style[prop] = properties[prop] as string;
  }
};
