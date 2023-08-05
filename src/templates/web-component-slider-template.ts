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
  </style>
  <button id="slider-prev">
    Prev
  </button>
    <div id="slider-track">
      <slot name="slide"></slot>
    </div>
  <button id="slider-next">
    Next
  </button>
`;

export default template;
