export const onResize = (
  el: Element,
  cb: (width: number) => void
): (() => void) => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      cb(entry.contentRect.width);
    }
  });

  resizeObserver.observe(el);

  return () => {
    resizeObserver.disconnect();
  };
};
