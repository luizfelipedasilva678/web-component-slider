export const getAssignedElements = (
  el: HTMLSlotElement | null
): HTMLElement[] => {
  if (el == null) return [];

  return Array.from(el.assignedElements()) as HTMLElement[];
};
