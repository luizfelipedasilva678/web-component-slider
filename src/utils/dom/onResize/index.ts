export const onResize = (
  el: Element | null,
  cb: (width: number) => void
): ResizeObserver => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      cb(entry.contentRect.width);
    }
  });

  if (el != null) resizeObserver.observe(el);

  return resizeObserver;
};
