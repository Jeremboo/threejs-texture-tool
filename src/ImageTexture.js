export default class ImageTexture {
  constructor(THREE, url, callback) {
    this.texture = null;
    this.image = null;
    this.material = new THREE.MeshBasicMaterial({
      overdraw: true,
    });

    this.textureLoader = new THREE.TextureLoader().load(url, texture => {
      this.texture = texture;
      this.image = texture.image;
      this.material.needsUpdate = true;
      this.material.map = this.texture;
      callback(this.image);
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (xhr) => {
      console.log('An error happened', xhr);
    });
  }
}
