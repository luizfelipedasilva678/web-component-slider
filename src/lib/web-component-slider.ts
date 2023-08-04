import webComponentSliderTemplate from '../templates/web-component-slider-template';

export class WebComponentSlider extends HTMLElement {
  private readonly _sliderTrack: HTMLElement;
  private readonly _sliderSlot: HTMLSlotElement;
  private readonly _width: number;
  private readonly _nextBtn: HTMLButtonElement;
  private readonly _prevBtn: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const clone = webComponentSliderTemplate.content.cloneNode(true);
    this.shadowRoot!.appendChild(clone);
    this._sliderTrack = this.shadowRoot!.getElementById('slider-track')!;
    this._sliderSlot = this.shadowRoot!.querySelector('slot[name="slide"]')!;
    this._nextBtn = this.shadowRoot!.getElementById(
      'slider-next'
    )! as HTMLButtonElement;
    this._prevBtn = this.shadowRoot!.getElementById(
      'slider-prev'
    )! as HTMLButtonElement;
    this._width = this.offsetWidth;
  }

  connectedCallback(): void {
    this.calcSliderElementsWidth();
    this.nextSlider();
  }

  nextSlider(): void {
    this.nextBtn.addEventListener('click', () => {
      this.sliderTrack.setAttribute(
        'style',
        `
        ${
          this.sliderTrack.getAttribute('style') ?? ''
        }transform: translate3d(-560px, 0px, 0px);
      `
      );
    });
  }

  calcSliderElementsWidth(): void {
    const slides = Array.from(
      this.sliderSlot.assignedElements()
    ) as HTMLElement[];
    let totalWidth = 0;

    for (const slide of slides) {
      slide.setAttribute('style', `width: ${this.width}px`);
      totalWidth += slide.offsetWidth;
    }

    this.sliderTrack.setAttribute(
      'style',
      `width: ${totalWidth}px; display: flex;`
    );
  }

  get sliderTrack(): HTMLElement {
    return this._sliderTrack;
  }

  get sliderSlot(): HTMLSlotElement {
    return this._sliderSlot;
  }

  get width(): number {
    return this._width;
  }

  get nextBtn(): HTMLButtonElement {
    return this._nextBtn;
  }

  get prevBtn(): HTMLButtonElement {
    return this._prevBtn;
  }
}
