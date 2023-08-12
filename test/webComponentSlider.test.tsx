import { describe, vi } from 'vitest';
import { WebComponentSlider } from '../src/lib/webComponentSlider';
import { createElement } from '../src/utils/dom/createElement';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

customElements.define('web-component-slider', WebComponentSlider);

const renderSlider = (): HTMLElement => {
  const slider = createElement('web-component-slider');
  return slider;
};

describe('webComponentSlider', () => {
  it('should render correctly', () => {
    const slider = renderSlider();
    expect(slider).toBeDefined();
  });

  it('should render shadowRoot', () => {
    const slider = renderSlider();
    expect(slider.shadowRoot).toBeDefined();
  });

  it('should render sliderTrack', () => {
    const slider = renderSlider();
    expect(slider.shadowRoot?.getElementById('slider-track')).toBeDefined();
  });

  it('should render next btn', () => {
    const slider = renderSlider();
    expect(slider.shadowRoot?.getElementById('slider-next')).toBeDefined();
  });

  it('should render prev btn', () => {
    const slider = renderSlider();
    expect(slider.shadowRoot?.getElementById('slider-prev')).toBeDefined();
  });

  it('should render slider dots', () => {
    const slider = renderSlider();
    expect(slider.shadowRoot?.getElementById('slider-dots')).toBeDefined();
  });
});
