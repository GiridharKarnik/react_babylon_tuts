class CanvasHelper {
  private engine: any;
  private scene: any;

  constructor(engine: any, scene: any) {
    this.engine = engine;
    this.scene = scene;
  }

  //red
  addXAxis = () => {
    let xAxisPoints = [
      new BABYLON.Vector3(-10, 0, 0),
      new BABYLON.Vector3(10, 0, 0)
    ];

    let xAxisColor1 = new BABYLON.Color4(1.0, 0.0, 0.0);
    let xAxisColor2 = new BABYLON.Color4(1.0, 0.0, 0.0);

    BABYLON.MeshBuilder.CreateLines(
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

    BABYLON.MeshBuilder.CreateLines(
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

    BABYLON.MeshBuilder.CreateLines(
      "zAxis",
      { points: zAxisPoints, colors: [zAxisColor1, zAxisColor2] },
      this.scene
    );
  };

  public showAxisLines = () => {
    this.addXAxis();
    this.addYAxis();
    this.addZAxis();
  };
}

export default CanvasHelper;
