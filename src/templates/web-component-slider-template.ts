const template = document.createElement('template');
template.innerHTML = String.raw`
  <style>
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    #slider-prev,
    #slider-next {
      position: absolute;
      top: 35px;
      z-index: 10;
    }

    #slider-next {
      right: 0;
    }

    #slider-dots {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 0;
    }

    #slider-dots .slider-dot {
      background: transparent;
      border: none;
    }

    #slider-dots .slider-dot::after {
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      background: #222;
      opacity: 0.5;
      border-radius: 50%;
    }

    #slider-dots .slider-dot.slider-dot-active::after {
      opacity: 1;
    }

    slot[name="slide"] {
      user-select: none;
    }
  </style>
  <button id="slider-prev">
    Prev
  </button>
  <div id="slider-track">
    <slot name="slide"></slot>
  </div>
  <ul id="slider-dots"></ul>
  <button id="slider-next">
    Next
  </button>
`;

export default template;
