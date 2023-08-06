import webComponentSliderTemplate from '../templates/web-component-slider-template';
import { getAssignedElements } from '../utils/dom/getAssinedElements';
import { addInlineStyles } from '../utils/dom/addInlineStyles';
import { addEvent } from '../utils/dom/addEvent';
import { onResize } from '../utils/dom/onResize';
import { type Direction } from '../typings';
import {
  NEXT_BTN_SELECTOR,
  PREV_BTN_SELECTOR,
  SLIDER_TRACK_SELECTOR,
  SLOT_SELECTOR,
} from '../constants';

export class WebComponentSlider extends HTMLElement {
  private _tx: number;
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
    this.initNextSlideBtn();
    this.initPrevSlideBtn();
  }

  init(): void {
    this.setSliderElements();
    this.setSliderMeasures(this.offsetWidth);
    onResize(this, this.setSliderMeasures.bind(this));
  }

  setSliderMeasures(width: number): void {
    this.widthPerSlider = width;
    console.log(this.widthPerSlider);
    this.calcTotalWidth();
    this.setMaxAndMin();
    this.tx = 0;
    this.setSliderTrackWidth();
    this.setSlidesWidth();
    addInlineStyles(this.sliderTrack, {
      transform: 'translate3d(0, 0, 0)',
    });
  }

  setSliderElements(): void {
    this.sliderTrack = this.shadowRoot!.getElementById(SLIDER_TRACK_SELECTOR)!;
    this.sliderSlot = this.shadowRoot!.querySelector(SLOT_SELECTOR)!;
    this.nextBtn = this.shadowRoot!.getElementById(NEXT_BTN_SELECTOR)!;
    this.prevBtn = this.shadowRoot!.getElementById(PREV_BTN_SELECTOR)!;
  }

  sliderDirection(direction: Direction): void {
    this.tx =
      direction === 'forward'
        ? this.tx + this.widthPerSlider
        : this.tx - this.widthPerSlider;

    addInlineStyles(this.sliderTrack, {
      transform: `translate3d(-${this.tx}px, 0, 0)`,
    });
  }

  initNextSlideBtn(): void {
    addEvent('click', this.nextBtn, () => {
      this.sliderDirection('forward');
    });
  }

  initPrevSlideBtn(): void {
    addEvent('click', this.prevBtn, () => {
      this.sliderDirection('backward');
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

    if (newTx >= this.minTx && newTx <= this.maxTx) {
      this._tx = newTx;
    }
  }

  get tx(): number {
    return this._tx;
  }
}
