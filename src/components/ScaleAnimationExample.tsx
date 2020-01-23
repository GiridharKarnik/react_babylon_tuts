import React, { Component } from "react";
import * as BABYLON from "babylonjs";

class ScaleAnimationExample extends Component<{}, {}> {
  private engine: any;
  private canvas: any;
  private scene: any;
  private box1: any;
  private animationBox: any;

  constructor(props: any) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  // componentDidMount = () => {
  //   // start ENGINE
  //   this.engine = new BABYLON.Engine(this.canvas.current, true);

  //   //Create Scene
  //   this.scene = new BABYLON.Scene(this.engine);

  //   //--Light---
  //   this.addLight();

  //   //--Camera---
  //   this.addCamera();

  //   //--Meshes---
  //   this.addModels();

  //   this.addAnimation();

  //   // Add Events
  //   window.addEventListener("resize", this.onWindowResize, false);

  //   // Render Loop
  //   this.engine.runRenderLoop(() => {
  //     this.scene.render();
  //   });
  // };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = () => {
    this.engine.resize();
  };

  /**
   * Add Lights
   */
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
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
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      -10,
      0.8,
      100,
      BABYLON.Vector3.Zero(),
      this.scene
    );

    camera.attachControl(this.canvas, true);
  };

  /**
   * Add Models
   */
  addModels = () => {
    // Add BOX
    this.box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, this.scene);
    this.box1.position.x = -20;
  };

  addAnimation = () => {
    this.animationBox = new BABYLON.Animation(
      "myAnimation",
      "scaling.x",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    //an array with all animation keys
    let keys = [];

    //At the animation key 0, the value of scaling is "1"
    keys.push({
      frame: 0,
      value: 1
    });

    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
      frame: 20,
      value: 0.2
    });

    //At the animation key 100, the value of scaling is "1"
    keys.push({
      frame: 100,
      value: 1
    });

    this.animationBox.setKeys(keys);
    this.box1.animations = [];
    this.box1.animations.push(this.animationBox);

    //launch the animation
    this.scene.beginAnimation(this.box1, 100, 0, true);
  };

  onCanvasLoaded = (c : HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c;
    }
  }

  render() {
    return (
      // <canvas
      //   style={{ width: window.innerWidth, height: window.innerHeight }}
      //   ref={this.onCanvasLoaded}
      // />
      <div>something</div>
    );
  }
}

export default ScaleAnimationExample;
