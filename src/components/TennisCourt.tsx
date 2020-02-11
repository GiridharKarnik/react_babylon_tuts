import * as React from "react";
import * as BABYLON from "babylonjs";

import BlueCourtTexture from "../assets/textures/blue_tennis_court_texture.jpg";
import CanvasHelper from "../utils/CanvasHelper";

class TennisCourt extends React.Component {
  private canvas: any;
  private engine: any;
  private scene: any;
  private ground: any;
  private xAxis: any;

  startEngine = () => {
    this.engine = new BABYLON.Engine(this.canvas, true, {
      deterministicLockstep: true,
      lockstepMaxSteps: 4
    });
  };

  createScene = () => {
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = BABYLON.Color3.White();
  };

  addLight = () => {
    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      this.scene
    );
  };

  addCamera = () => {
    let camera = new BABYLON.ArcRotateCamera(
      "arcCamera",
      //alpha
      BABYLON.Tools.ToRadians(-90),
      //beta
      BABYLON.Tools.ToRadians(90),
      25.0,
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );

    camera.attachControl(this.canvas, true);

    //add wasd controls to the camera.w
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
  };

  createGround = () => {
    this.ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10, subdivisions: 100 },
      this.scene
    );

    //add material, make the ground look like a wooden floor
    let woodMaterial = new BABYLON.StandardMaterial(
      "woodenMaterial",
      this.scene
    );
    woodMaterial.diffuseTexture = new BABYLON.Texture(BlueCourtTexture, this.scene);

    this.ground.material = woodMaterial;
  };

  startRenderLoop = () => {
    // Render Loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  };

  componentDidMount() {
    this.startEngine();
    this.createScene();
    this.addLight();
    this.addCamera();

    let canvasHelper: CanvasHelper = new CanvasHelper(this.engine, this.scene);
    canvasHelper.showAxisLines();

    this.createGround();

    this.startRenderLoop();
  }

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

export default TennisCourt;
