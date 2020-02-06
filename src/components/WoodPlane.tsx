import * as React from "react";
import * as BABYLON from "babylonjs";

import Wood from "../assets/textures/wood.jpg";

class WoodPlane extends React.Component {
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
      { width: 5, height: 5, subdivisions: 4 },
      this.scene
    );

    //add material, make the ground look like a wooden floor
    let woodMaterial = new BABYLON.StandardMaterial(
      "woodenMaterial",
      this.scene
    );
    woodMaterial.diffuseTexture = new BABYLON.Texture(Wood, this.scene);

    this.ground.material = woodMaterial;
  };

  //red
  addXAxis = () => {
    let xAxisPoints = [
      new BABYLON.Vector3(-10, 0, 0),
      new BABYLON.Vector3(10, 0, 0)
    ];

    let xAxisColor1 = new BABYLON.Color4(1.0, 0.0, 0.0);
    let xAxisColor2 = new BABYLON.Color4(1.0, 0.0, 0.0);

    this.xAxis = BABYLON.MeshBuilder.CreateLines(
      "xAxis",
      { points: xAxisPoints, colors: [xAxisColor1, xAxisColor2] },
      this.scene
    );
  };

  //green
  addYAxis = () => {
    let yAxisPoints = [
      new BABYLON.Vector3(0, -10, 0),
      new BABYLON.Vector3(0, 10, 0)
    ];

    let yAxisColor1 = new BABYLON.Color4(0.0, 1.0, 0.0);
    let yAxisColor2 = new BABYLON.Color4(0.0, 1.0, 0.0);

    this.xAxis = BABYLON.MeshBuilder.CreateLines(
      "yAxis",
      { points: yAxisPoints, colors: [yAxisColor1, yAxisColor2] },
      this.scene
    );
  };

  //blue
  addZAxis = () => {
    let zAxisPoints = [
      new BABYLON.Vector3(0, 0, -10),
      new BABYLON.Vector3(0, 0, 10)
    ];

    let zAxisColor1 = new BABYLON.Color4(0.0, 0.0, 1.0);
    let zAxisColor2 = new BABYLON.Color4(0.0, 0.0, 1.0);

    this.xAxis = BABYLON.MeshBuilder.CreateLines(
      "zAxis",
      { points: zAxisPoints, colors: [zAxisColor1, zAxisColor2] },
      this.scene
    );
  };

  addAxisLines = () => {
      this.addXAxis();
      this.addYAxis();
      this.addZAxis();
  }

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

    this.addAxisLines();
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

export default WoodPlane;
