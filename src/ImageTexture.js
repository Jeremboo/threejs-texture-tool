import { TextureLoader, MeshBasicMaterial } from 'three';

export default class ImageTexture {
  constructor(url, callback) {
    this.image = null;
    this.material = new MeshBasicMaterial({
      overdraw: true,
    });

    this.texture = new TextureLoader().load(url, texture => {
      this.image = texture.image;
      this.material.needsUpdate = true;
      this.material.map = this.texture;
      callback(this.image);
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (xhr) => {
      console.log('An error happened', xhr);
    });

    this.uniform = { type: 't', value: this.texture };
  }
}
