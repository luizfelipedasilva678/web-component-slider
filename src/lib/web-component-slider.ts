import webComponentSliderTemplate from '../templates/web-component-slider-template';
import { getAssignedElements } from '../utils/dom/getAssinedElements';
import { addInlineStyles } from '../utils/dom/addInlineStyles';
import { addEvent } from '../utils/dom/addEvent';
import { onResize } from '../utils/dom/onResize';
import { type Direction } from '../typings';
import { createElement } from '../utils/dom/createElement';
import { setOnDataset } from '../utils/dom/setOnDataset';
import { addClass } from '../utils/dom/addClass';
import { getFromDataset } from '../utils/dom/getFromDataset';
import { removeClass } from '../utils/dom/removeClass';
import {
  NEXT_BTN_SELECTOR,
  PREV_BTN_SELECTOR,
  SLIDER_DOTS_SELECTOR,
  SLIDER_TRACK_SELECTOR,
  SLOT_SELECTOR,
} from '../constants';

export class WebComponentSlider extends HTMLElement {
  private _tx: number;
  private totalWidth: number;
  private nextBtn: HTMLElement;
  private prevBtn: HTMLElement;
  private sliderTrack: HTMLElement;
  private sliderDots: HTMLElement;
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
    this.createDots();
    this.initSliderConfigs(this.offsetWidth);
    onResize(this, this.initSliderConfigs.bind(this));
  }

  initSliderConfigs(width: number): void {
    this.widthPerSlider = width;
    this.tx = 0;
    this.calcTotalWidth();
    this.setMaxAndMin();
    this.setDotsPosition();
    this.handleDotStyles();
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
    this.sliderDots = this.shadowRoot!.getElementById(SLIDER_DOTS_SELECTOR)!;
  }

  handleDotStyles(): void {
    for (const dot of this.sliderDots.querySelectorAll('button')) {
      const dotPosition = Number(getFromDataset(dot, 'slidePosition'));

      if (dotPosition === this.tx) {
        addClass(dot, 'slider-dot-active');
      } else {
        removeClass(dot, 'slider-dot-active');
      }
    }
  }

  setDotsPosition(): void {
    for (const [i, dot] of this.sliderDots
      .querySelectorAll('button')
      .entries()) {
      setOnDataset(dot, 'slidePosition', String(this.widthPerSlider * i));
    }
  }

  createDots(): void {
    const slides = getAssignedElements(this.sliderSlot);

    slides.forEach(() => {
      const li = createElement('li');
      const button = createElement('button');
      addClass(button, 'slider-dot');
      li.appendChild(button);
      this.sliderDots.appendChild(li);
      addEvent('click', button, () => {
        const position = getFromDataset(button, 'slidePosition');

        if (position !== undefined) {
          this.tx = Number(position);
          this.handleDotStyles();
          addInlineStyles(this.sliderTrack, {
            transform: `translate3d(-${this.tx}px, 0, 0)`,
          });
        }
      });
    });
  }

  sliderDirection(direction: Direction): void {
    if (direction === 'forward') this.tx += this.widthPerSlider;
    if (direction === 'backward') this.tx -= this.widthPerSlider;

    this.handleDotStyles();
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
    });
  }

  setSlidesWidth(): void {
    const slides = getAssignedElements(this.sliderSlot);

    for (const slide of slides) {
      addInlineStyles(slide, {
        width: `${this.widthPerSlider}px`,
      });
    }
  }

  set tx(newTx: number) {
    if (newTx < 0) {
      this._tx = 0;
      return;
    }

    if (newTx >= this.minTx && newTx <= this.maxTx) this._tx = newTx;
  }

  get tx(): number {
    return this._tx;
  }
}
