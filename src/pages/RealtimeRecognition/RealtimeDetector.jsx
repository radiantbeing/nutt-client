import React from "react";
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "./styles.css";
import { Box } from "@chakra-ui/react";
tf.setBackend("webgl");

const threshold = 0.75;

async function load_model() {
  // It's possible to load the model locally or from a repo
  // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
  const model = await loadGraphModel(
    "https://raw.githubusercontent.com/MyeongSeok98/SSDmobilenet/main/json_model2/model.json"
  );

  return model;
}

let classesDir = {
  1: {
    name: "00Mandu",
    id: 1,
  },
  2: {
    name: "01Kkennip",
    id: 2,
  },
  3: {
    name: "02Jabgokbab",
    id: 3,
  },
  4: {
    name: "03Jeyukbokum",
    id: 4,
  },
  5: {
    name: "04kimchizzigae",
    id: 5,
  },
  6: {
    name: "05Samgyubsal",
    id: 6,
  },
  7: {
    name: "06Duinjangzzigae",
    id: 7,
  },
  8: {
    name: "07Gamjatang",
    id: 8,
  },
  9: {
    name: "08Ramyun",
    id: 9,
  },
  10: {
    name: "09Pizza",
    id: 10,
  },
  11: {
    name: "10Yangnyumchicken",
    id: 11,
  },
  12: {
    name: "11Friedchicken",
    id: 12,
  },
  13: {
    name: "12BaechuKimchi",
    id: 13,
  },
  14: {
    name: "13Kkakdugi",
    id: 14,
  },
  15: {
    name: "14Bulgogi",
    id: 15,
  },
  16: {
    name: "15Godeungeogui",
    id: 16,
  },
  17: {
    name: "16Zzajangmyun",
    id: 17,
  },
  18: {
    name: "17Jjambbong",
    id: 18,
  },
  19: {
    name: "18Friedegg",
    id: 19,
  },
  20: {
    name: "19Gyeranjjim",
    id: 20,
  },
  21: {
    name: "Other",
    id: 21,
  },
};

class RealtimeDetector extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = load_model();

      Promise.all([modelPromise, webCamPromise])
        .then((values) => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    tf.engine().startScope();
    model.executeAsync(this.process_input(video)).then((predictions) => {
      this.renderPredictions(predictions, video);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
      tf.engine().endScope();
    });
  };

  process_input(video_frame) {
    const tfimg = tf.browser.fromPixels(video_frame).toInt();
    const expandedimg = tfimg.transpose([0, 1, 2]).expandDims();
    return expandedimg;
  }

  buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
    const detectionObjects = [];
    var video_frame = document.getElementById("frame");

    scores[0].forEach((score, i) => {
      if (score > threshold) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox,
        });
      }
    });
    return detectionObjects;
  }

  renderPredictions = (predictions) => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    // console.log("tensor0:", predictions[0].arraySync());
    // console.log("tensor1:", predictions[1].arraySync());
    // console.log("tensor2:", predictions[2].arraySync());
    // console.log("tensor3:", predictions[3].arraySync());
    // console.log("tensor4:", predictions[4].arraySync());
    // console.log("tensor5:", predictions[5].arraySync());
    // console.log("tensor6:", predictions[6].dataSync());
    console.clear();
    console.log("classes:", predictions[4].dataSync());

    //Getting predictions
    const boxes = predictions[1].arraySync();
    const scores = predictions[2].arraySync();
    const classes = predictions[4].dataSync();
    const detections = this.buildDetectedObjects(
      scores,
      threshold,
      boxes,
      classes,
      classesDir
    );

    detections.forEach((item) => {
      const x = item["bbox"][0];
      const y = item["bbox"][1];
      const width = item["bbox"][2];
      const height = item["bbox"][3];

      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(
        item["label"] + " " + (100 * item["score"]).toFixed(2) + "%"
      ).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    detections.forEach((item) => {
      const x = item["bbox"][0];
      const y = item["bbox"][1];

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(
        item["label"] + " " + (100 * item["score"]).toFixed(2) + "%",
        x,
        y
      );
    });
  };

  render() {
    return (
      <Box position="relative">
        <video
          style={{ height: "350px", width: "420px" }}
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="350"
          height="420"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="350"
          height="420"
        />
      </Box>
    );
  }
}

export default RealtimeDetector;
