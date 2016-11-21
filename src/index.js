import CanvasTexture from './CanvasTexture';
import ImageTexture from './ImageTexture';

import css from './style.styl';

export default class TextureTool {
  constructor() {
    this.textureNameArr = [];
    this.textureToolWrapper = document.createElement('ul');

    // Init canvas wrapper into the dom
    this.textureToolWrapper.id = 'texture-tool-wrapper';
    this.textureToolWrapper.className = 'ThreejsTextureTool-wrapper';
    document.body.appendChild(this.textureToolWrapper);

    // Add css without style-loader
    const style = document.createElement('style');
    style.innerHTML = css.toString();
    this.textureToolWrapper.appendChild(style);

    this.addInDom = this.addInDom.bind(this);
    this.createImageTexture = this.createImageTexture.bind(this);
    this.createCanvasTexture = this.createCanvasTexture.bind(this);

    // Listener on keycode to toggle textureToolWrapper
    document.body.addEventListener('keydown', (e) => {
      console.log(e);
      // TODO toggle textureToolWrapper if Cmd+h pressed
    });
  }

  addInDom(name, texture) {
    // HTML
    const HTML = `
      <li class="TextureTool">
        <button id="${name}-open" class="TextureTool-button">${name}</button>
        <div id="${name}-window" class="TextureTool-window TextureTool-hidden">
          <button id="${name}-close" class="TextureTool-close"></button>
        </div>
      </li>
    `;
    this.textureToolWrapper.insertAdjacentHTML('beforeend', HTML);

    // ACTIONS
    const textureWindow = document.getElementById(`${name}-window`);
    const openBtn = document.getElementById(`${name}-open`);
    openBtn.addEventListener('click', () => {
      openBtn.classList.add('TextureTool-hidden');
      textureWindow.classList.remove('TextureTool-hidden');
    });
    const closeBtn = document.getElementById(`${name}-close`);
    closeBtn.addEventListener('click', () => {
      openBtn.classList.remove('TextureTool-hidden');
      textureWindow.classList.add('TextureTool-hidden');
    });
    textureWindow.appendChild(texture);

    // SAVE
    this.textureNameArr.push(name);
  }

  createImageTexture(url, name = `image-${this.textureNameArr.length}`) {
    if (this.textureNameArr.indexOf(name) !== -1) {
      // TODO create true error
      console.log('Err: Cannot have the same name', name);
      return;
    }

    const imgTexture = new ImageTexture(url, image => {
      this.addInDom(name, image);
    });
    return imgTexture;
  }

  createCanvasTexture(name = `canvas-${this.textureNameArr.length}`, width = 256, height = 256) {
    if (this.textureNameArr.indexOf(name) !== -1) {
      console.log('Err: Cannot have the same name', name);
      return;
    }

    const canvasTexture = new CanvasTexture(width, height);
    this.addInDom(name, canvasTexture.canvas);
    return canvasTexture;
  }
}
