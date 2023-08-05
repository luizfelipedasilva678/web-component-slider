export const getAssignedElements = (el: HTMLSlotElement): HTMLElement[] => {
  return Array.from(el.assignedElements()) as HTMLElement[];
};
