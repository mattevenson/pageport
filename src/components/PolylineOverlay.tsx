import React, { PureComponent } from "react";
import { CanvasOverlay, CanvasRedrawOptions } from "react-map-gl";

interface IProps {
  points: number[][];
  color: string;
  lineWidth: number;
  renderWhileDragging?: boolean;
}

const PolylineOverlay: React.SFC<IProps> = ({
  points,
  renderWhileDragging = true,
  lineWidth,
  color
}) => (
  <CanvasOverlay
    redraw={({
      width,
      height,
      ctx,
      project,
      unproject
    }: CanvasRedrawOptions) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (renderWhileDragging && points) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.beginPath();
        points.forEach(point => {
          const pixel = project([point[0], point[1]]);
          ctx.lineTo(pixel[0], pixel[1]);
        });
        ctx.stroke();
      }
    }}
  />
);

// export default class PolylineOverlay extends CanvasOverlay {
//   _redraw({ width, height, ctx, isDragging, project, unproject }) {
//     const {
//       points,
//       color = "red",
//       lineWidth = 2,
//       renderWhileDragging = true
//     } = this.props;
//     ctx.clearRect(0, 0, width, height);
//     ctx.globalCompositeOperation = "lighter";

//     if ((renderWhileDragging || !isDragging) && points) {
//       ctx.lineWidth = lineWidth;
//       ctx.strokeStyle = color;
//       ctx.beginPath();
//       points.forEach(point => {
//         const pixel = project([point[0], point[1]]);
//         ctx.lineTo(pixel[0], pixel[1]);
//       });
//       ctx.stroke();
//     }
//   }

//   render() {
//     return <CanvasOverlay redraw={this._redraw.bind(this)} />;
//   }
// }

export default PolylineOverlay;
