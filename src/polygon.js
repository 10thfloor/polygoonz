
import axios from "axios";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { randInt } from "./rand";


const fetchPolygon = async () => {
  const minSides = randInt(3, 7);
  const maxSides = minSides + randInt(1, 10);

  const params = {
    count: 1,
    minSides,
    maxSides
  };

  const { data } = await axios.get("https://api.noopschallenge.com/polybot", { params });
  const [coords] = data.polygons;
  return coords;
};

const x = p => p.x;
const y = p => p.y;

const transformPoints = (points, xT, yT) =>
  points.map(({ x, y }) => ({ x: xT(x), y: yT(y) }));

export const normalizePolygon = (width, height, coords) => {
  const xRange = extent(coords, x);
  const yRange = extent(coords, y);

  const xScale = scaleLinear()
    .domain(xRange)
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(yRange)
    .range([height, 0]);

  return transformPoints(coords, xScale, yScale);
};

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export async function generatePNG({ svg, canvas }) {
  const ctxt = canvas.getContext("2d");
  await drawInlineSVG(ctxt, svg)
  const formData = new FormData();
  const b64Data = canvas.toDataURL().split(',')[1];
  const blob = b64toBlob(b64Data, 'image/png');
  formData.append('file', blob, `goon.png`);
  return formData;
}

export function drawInlineSVG(ctx, rawSVG) {
  return new Promise((resolve) => {
    const svgURL = new XMLSerializer().serializeToString(rawSVG);
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(this, 0, 0);
      resolve()
    };
    img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
  })
}

export default fetchPolygon;
