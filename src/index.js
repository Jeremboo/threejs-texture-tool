import dragDrop from 'drag-drop';

import CanvasTexture from './CanvasTexture';
import ImageTexture from './ImageTexture';

import css from './style.styl';


/**
 * #########################
 * INIT
 * #########################
 */

const textureNameArr = [];

// Init canvas wrapper into the dom
const textureToolWrapper = document.createElement('ul');
textureToolWrapper.id = 'texture-tool-wrapper';
textureToolWrapper.className = 'ThreejsTextureTool-wrapper';
document.body.appendChild(textureToolWrapper);

// Add css without style-loader
const style = document.createElement('style');
style.innerHTML = css.toString();
textureToolWrapper.appendChild(style);

// Listener on keycode to toggle textureToolWrapper when h pressed
document.body.addEventListener('keydown', (e) => {
  if (e.keyCode === 72) {
    textureToolWrapper.classList.toggle('ThreejsTextureTool_hidden');
  }
});


/**
 * #########################
 * FUNCTION
 * #########################
 */

/**
 * Add a texture viewer in DOM
 * @params {String} name
 * @params {Object} texture
 */
function addInDom(name, texture) {
  // HTML
  const HTML = `
    <li class="TextureTool">
      <button id="${name}-open" class="TextureTool-button">${name}</button>
      <div id="${name}-window" class="TextureTool-window TextureTool-hidden">
        <button id="${name}-close" class="TextureTool-close"></button>
      </div>
    </li>
  `;
  textureToolWrapper.insertAdjacentHTML('beforeend', HTML);

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
  return textureWindow;
}

/**
 * Add a texture name into the array
 * @params {String} name
 */
function saveTextureName(name) {
  const getUniqueName = (currentName, i = 0) => {
    const n = `${currentName}${(i !== 0) ? `-${i}` : ''}`;
    return (textureNameArr.indexOf(n) !== -1)
    ? getUniqueName(currentName, i + 1)
    : n
    ;
  };
  const uniqueName = getUniqueName(name);
  textureNameArr.push(uniqueName);
  return uniqueName;
}


/**
 * #########################
 * EXPORT
 * #########################
 */

/**
 * Create an texture based on an image
 * @params {String}      url      of the image
 * @params {Object}      props    with :
 *  - @params {String}     name     id attribued at the texture
 *  - @params {Function}   onLoad   a callback to handle the children
 */
export const createImageTexture = (url, { name = 'imageTexture', onLoad = f => f } = {}) => {
  const imgTexture = new ImageTexture(url, () => {
    const elm = addInDom(saveTextureName(name), imgTexture.image);

    // Drag Drop Event
    dragDrop(`#${elm.id}`, files => {
      // Read image from file data
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const bytes = new Uint8Array(e.target.result);
        const blob = new Blob([bytes.buffer]);
        const URL = window.URL || window.webkitURL;
        // remove the old img and update the image
        elm.removeChild(imgTexture.image);
        // Update the image with a new path
        imgTexture.updateImg(URL.createObjectURL(blob), () => {
          elm.appendChild(imgTexture.image);
          onLoad(imgTexture);
        });
      });
      reader.addEventListener('error', (err) => {
        // TODO create true error
        console.error('FileReader error' + err);
      });

      if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(files[0].type) === -1) {
        console.log('FileUpdate error: The file is not at the good format');
        return;
      }
      reader.readAsArrayBuffer(files[0]);
    });

    onLoad(imgTexture);
  });
  return imgTexture;
};

/**
 * Create an texture based on a canvas
 * @params {Object}        props     with :
 *  - @params {String}       name
 *  - @params {Number}       width
 *  - @params {Number}       height
 *  - @params {Function}     onStart   The drawing canvas function
 *  - @params {Function}     onUpdate  Method called to update the canvas
 */
export const createCanvasTexture = ({ name = 'canvasTexture', width = 256, height = 256, onStart = f => f, onUpdate = f => f} = {}) => {
  const canvasTexture = new CanvasTexture({ width, height, onStart, onUpdate });
  addInDom(saveTextureName(name), canvasTexture.canvas);
  return canvasTexture;
};
