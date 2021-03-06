import * as React from "react";
import * as BABYLON from "babylonjs";

import Wood from "../assets/textures/wood.jpg";
import TennisTexture from "../assets/textures/tennis_ball_texture.png";

class BouncingBall extends React.Component<{}, {}> {
  private canvas: any;
  private engine: any;
  private scene: any;
  private ball: any;
  private ground: any;
  private bounceAnimation: any;

  componentDidMount() {
    this.engine = new BABYLON.Engine(this.canvas, true, {
        deterministicLockstep: true,
        lockstepMaxSteps: 4
    });

    this.scene = new BABYLON.Scene(this.engine);

    this.enablePhysics();

    this.addLight();
    this.addCamera();

    this.addModels();
    // this.animateBounce();


    this.detectCollision();

    // Render Loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      this.scene
    );
  };

  addCamera = () => {
    let camera = new BABYLON.ArcRotateCamera(
      "arcCamera",
      BABYLON.Tools.ToRadians(-40),
      BABYLON.Tools.ToRadians(45),
      15.0,
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

  addModels = () => {
    this.createBall();

    this.createGround();
  };

  createBall = () => {
    this.ball = BABYLON.MeshBuilder.CreateSphere("sphere", {}, this.scene);
    this.ball.position = new BABYLON.Vector3(0, 5, 0);

    let material = new BABYLON.StandardMaterial("material1", this.scene);
    material.diffuseTexture = new BABYLON.Texture(TennisTexture, this.scene);
    this.ball.material = material;

    //attach physics
    this.ball.physicsImpostor = new BABYLON.PhysicsImpostor(this.ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 8, restitution: 0.9 }, this.scene);
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

    //attach physics
    this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);
  };

  /**
   * This method will move the ball from point A to point B and then back to point A and then loop the movement
   */
  animateBounce = () => {
    let bounceAnimation = new BABYLON.Animation(
      "myAnimation",
      "position.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    let animationKeys = [];

    //At the animation key 0, the value of scaling is "1"
    animationKeys.push({
      frame: 0,
      value: 5
    });

    //At the animation key 20, the value of scaling is "0.2"
    animationKeys.push({
      frame: 50,
      value: -3
    });

    //At the animation key 100, the value of scaling is "1"
    animationKeys.push({
      frame: 100,
      value: 5
    });

    //add animation array to animation object
    this.ball.animations = [];
    bounceAnimation.setKeys(animationKeys);
    this.ball.animations.push(bounceAnimation);

    this.bounceAnimation = this.scene.beginAnimation(this.ball, 0, 100, true);
  };

  enablePhysics = () => {
    var physEngine = new BABYLON.CannonJSPlugin(false);
    this.scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), physEngine);
    physEngine.setTimeStep(1/60);
  }

  detectCollision = () => {
    //   this.scene.registerBeforeRender(() => {
    //     if(this.ball.intersectsMesh(this.ground, true)) {
    //         console.log("Ball bounced!!!");
    //         this.bounceAnimation.stop();
    //     } else {
    //         this.bounceAnimation.restart();
    //     }
    //   });
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

export default BouncingBall;
