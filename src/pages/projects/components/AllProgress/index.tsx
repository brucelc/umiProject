// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';

const { Html, Arc } = Guide;

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});


const cols = {
  value: {
    min: 0,
    max: 100,
    tickInterval: 10,
    nice: false,
  },
};

export default class ALlProgress extends React.Component {
  render() {
    const { allProgress } = this.props;
    const { progress } = allProgress;
    const data = [
      { value: Number(progress) },
    ];
    return (
      <Chart height={400} data={data} scale={cols} padding={[0, 0, 200, 0]} forceFit>
        <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -16,
            textStyle: {
              fontSize: 12,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
          subTickCount={4}
          subTickLine={{
            length: -8,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
          tickLine={{
            length: -18,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[100, 0.965]}
            style={{ // 底灰色
              stroke: '#CBCBCB',
              lineWidth: 18,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{
              stroke: '#1890FF',
              lineWidth: 18,
            }}
          />
          <Html
            position={['50%', '95%']}
            html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 14px;color: rgba(0,0,0,0.85);margin-top: 30px;">${data[0].value}%</p></div>`)}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#1890FF"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}

