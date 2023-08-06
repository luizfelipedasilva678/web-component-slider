import webComponentSliderTemplate from '../templates/web-component-slider-template';
import { getAssignedElements } from '../utils/dom/getAssignedElements';
import { addInlineStyles } from '../utils/dom/addInlineStyles';
import {
  NEXT_BTN_SELECTOR,
  PREV_BTN_SELECTOR,
  SLIDER_TRACK_SELECTOR,
  SLOT_SELECTOR,
} from '../constants';

export class WebComponentSlider extends HTMLElement {
  private _tx: number = 0;
  private totalWidth: number;
  private nextBtn: HTMLElement;
  private prevBtn: HTMLElement;
  private sliderTrack: HTMLElement;
  private sliderSlot: HTMLSlotElement;
  private widthPerSlider: number;
  private minTx: number;
  private maxTx: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const clone = webComponentSliderTemplate.content.cloneNode(true);
    this.shadowRoot!.appendChild(clone);
    this.init();
  }

  init(): void {
    this.sliderTrack = this.shadowRoot!.getElementById(SLIDER_TRACK_SELECTOR)!;
    this.sliderSlot = this.shadowRoot!.querySelector(SLOT_SELECTOR)!;
    this.nextBtn = this.shadowRoot!.getElementById(NEXT_BTN_SELECTOR)!;
    this.prevBtn = this.shadowRoot!.getElementById(PREV_BTN_SELECTOR)!;
    this.widthPerSlider = this.offsetWidth;
    this.calcTotalWidth();
    this.setMaxAndMin();
    this.setSliderTrackWidth();
    this.setSlidesWidth();
    this.initNextSlideBtn();
    this.initPrevSlideBtn();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width !== this.widthPerSlider) {
          this.widthPerSlider = entry.contentRect.width;
          this.calcTotalWidth();
          this.setMaxAndMin();
          this.setSliderTrackWidth();
          this.setSlidesWidth();
          this.sliderTrack.style.transform = `translate3d(0, 0, 0)`;
          this.tx = 0;
        }
      }
    });

    resizeObserver.observe(this);
  }

  initNextSlideBtn(): void {
    this.nextBtn.addEventListener('click', () => {
      this.tx += this.widthPerSlider;
      this.sliderTrack.style.transform = `translate3d(-${this.tx}px, 0, 0)`;
    });
  }

  initPrevSlideBtn(): void {
    this.prevBtn.addEventListener('click', () => {
      this.tx -= this.widthPerSlider;
      this.sliderTrack.style.transform = `translate3d(-${this.tx}px, 0, 0)`;
    });
  }

  setMaxAndMin(): void {
    this.maxTx = this.totalWidth - this.widthPerSlider;
    this.minTx = 0;
  }

  calcTotalWidth(): void {
    const slides = getAssignedElements(this.sliderSlot);
    this.totalWidth = this.widthPerSlider * slides.length;
  }

  setSliderTrackWidth(): void {
    addInlineStyles(this.sliderTrack, {
      width: `${this.totalWidth}px`,
      display: 'flex',
    });
  }

  setSlidesWidth(): void {
    const slides = getAssignedElements(this.sliderSlot);

    for (const slide of slides) {
      addInlineStyles(slide, { width: `${this.widthPerSlider}px` });
    }
  }

  set tx(newTx: number) {
    if (newTx < 0) {
      this._tx = 0;
    }

    if (newTx >= this.minTx && newTx <= this.maxTx) this._tx = newTx;
  }

  get tx(): number {
    return this._tx;
  }
}
