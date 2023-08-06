export const addEvent = <K extends keyof HTMLElementEventMap>(
  type: K,
  el: Element,
  listener: (ev: HTMLElementEventMap[K]) => any
): void => {
  el.addEventListener(type, (e) => listener(e as HTMLElementEventMap[K]));
};
