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
import { queryAll } from '../utils/dom/queryAll';
import {
  NEXT_BTN_SELECTOR,
  PREV_BTN_SELECTOR,
  SLIDER_DOTS_SELECTOR,
  SLIDER_TRACK_SELECTOR,
  SLOT_SELECTOR,
} from '../constants';

export class WebComponentSlider extends HTMLElement {
  private _offset: number;
  private totalWidth: number;
  private nextBtn: HTMLElement;
  private prevBtn: HTMLElement;
  private sliderTrack: HTMLElement;
  private sliderDots: HTMLElement;
  private sliderSlot: HTMLSlotElement;
  private slideOffset: number;
  private minOffset: number;
  private maxOffset: number;

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
    this.slideOffset = width;
    this.offset = 0;
    this.calcTotalWidth();
    this.setMaxAndMin();
    this.setDotsPosition();
    this.setDotStyles();
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

  setDotStyles(): void {
    for (const dot of this.sliderDots.querySelectorAll('button')) {
      const dotPosition = Number(getFromDataset(dot, 'slideOffset'));

      if (dotPosition === this.offset) {
        addClass(dot, 'slider-dot-active');
      } else {
        removeClass(dot, 'slider-dot-active');
      }
    }
  }

  setDotsPosition(): void {
    for (const [i, dot] of queryAll<HTMLElement>(
      this.sliderDots,
      'button'
    ).entries()) {
      setOnDataset(dot, 'slideOffset', String(this.slideOffset * i));
    }
  }

  createDots(): void {
    const slides = getAssignedElements(this.sliderSlot);

    for (let i = 0; i < slides.length; i++) {
      const li = createElement('li');
      const button = createElement('button');
      addClass(button, 'slider-dot');
      li.appendChild(button);
      this.sliderDots.appendChild(li);
      addEvent('click', button, () => {
        this.onDotClick(button);
      });
    }
  }

  onDotClick(button: HTMLElement): void {
    const position = getFromDataset(button, 'slideOffset');

    if (position !== undefined) {
      this.offset = Number(position);
      this.setDotStyles();
      addInlineStyles(this.sliderTrack, {
        transform: `translate3d(-${this.offset}px, 0, 0)`,
      });
    }
  }

  sliderDirection(direction: Direction): void {
    if (direction === 'forward') this.offset += this.slideOffset;
    if (direction === 'backward') this.offset -= this.slideOffset;

    this.setDotStyles();
    addInlineStyles(this.sliderTrack, {
      transform: `translate3d(-${this.offset}px, 0, 0)`,
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
    this.maxOffset = this.totalWidth;
    this.minOffset = 0;
  }

  calcTotalWidth(): void {
    const slides = getAssignedElements(this.sliderSlot);
    this.totalWidth = this.slideOffset * slides.length - 1;
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
        width: `${this.slideOffset}px`,
      });
    }
  }

  set offset(newOffset: number) {
    if (newOffset < 0) {
      this._offset = 0;
      return;
    }

    if (newOffset >= this.minOffset && newOffset <= this.maxOffset)
      this._offset = newOffset;
  }

  get offset(): number {
    return this._offset;
  }
}
