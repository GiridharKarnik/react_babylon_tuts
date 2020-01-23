import * as React from "react";
import * as BABYLON from "babylonjs";

import Wood from "../assets/textures/wood.jpg";

class WoodenBox extends React.Component<{}, {}> {
  private canvas: any;
  private engine: any;
  private scene: any;
  private box1: any;

  componentDidMount() {
    //start Engine
    this.engine = new BABYLON.Engine(this.canvas, true);

    //crate scene
    this.scene = new BABYLON.Scene(this.engine);

    this.addLight();

    this.addModels();

    this.addCamera();

    // Render Loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  /**
   * Add Lights
   */
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      this.scene
    );
  };

  /**
   * Add Camera
   */
  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    let camera = new BABYLON.ArcRotateCamera(
      "arcCamera",
      BABYLON.Tools.ToRadians(45),
      BABYLON.Tools.ToRadians(45),
      20.0,
      this.box1.position,
      this.scene
    );

    camera.attachControl(this.canvas, true);

    //add wasd controls to the camera.w
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
  };

  /**
   * Add Models
   */
  addModels = () => {
    // Add BOX
    this.box1 = BABYLON.Mesh.CreateBox("Box", 4.0, this.scene);
    this.box1.position.x = -20;

    //add material to the box
    //add a material to the box, apply texture maps
    let material = new BABYLON.StandardMaterial("material1", this.scene);
    material.diffuseTexture = new BABYLON.Texture(Wood, this.scene);

    // material.bumpTexture = new BABYLON.Texture("")
    this.box1.material = material;
  };

  render() {
    return (
      <canvas
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={canvas => {
          this.canvas = canvas;
        }}
      ></canvas>
    );
  }
}

export default WoodenBox;
