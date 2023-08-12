const template = document.createElement('template');
template.innerHTML = String.raw`
  <style>
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    #slider-track {
      display: flex;
      transition: all 0.5s;
    }

    #slider-prev,
    #slider-next {
      background: transparent;
      border: none;
      cursor: pointer;
      position: absolute;
      top: 35px;
      z-index: 10;
    }

    #slider-prev svg,
    #slider-next svg {
      width: 32px;
      height: 32px;
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
      cursor: pointer;
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
    <svg fill="#000000" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330.002 330.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_227_" d="M233.25,306.001L127.5,165.005L233.25,24.001c4.971-6.628,3.627-16.03-3-21c-6.627-4.971-16.03-3.626-21,3 L96.75,156.005c-4,5.333-4,12.667,0,18l112.5,149.996c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001 C236.878,322.03,238.221,312.628,233.25,306.001z"></path> </g></svg>
  </button>
  <div id="slider-track">
    <slot name="slide"></slot>
  </div>
  <ul id="slider-dots"></ul>
  <button id="slider-next">
  <svg fill="#000000" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
  </button>
`;

export default template;
