import React from 'react';
import moment from 'moment';

// 按需引入
import Chart from 'bizcharts/lib/components/Chart';
import Axis from 'bizcharts/lib/components/Axis';
import Tooltip from 'bizcharts/lib/components/Tooltip';
import Legend from 'bizcharts/lib/components/Legend';
import Line from 'bizcharts/lib/components/TypedGeom/Line';
import Guide from 'bizcharts/lib/components/Guide';
import Geom from 'bizcharts/lib/components/Geom';


// style
import style from './index.less';

const { Text } = Guide;

interface Iprops {
  data: Array<any>,
  lineColors: Array<any>,
  dashPropName: Array<string>,
  unit: string, // 单位
}

export default class LineChart extends React.PureComponent<Iprops> {
  static defaultProps = {
    lineColors: ['#198EFF', '#FFA000', '#63C456', '#FF4D4F', 'gray', 'black', '#FF1493', '#8A2BE2', '#00FFFF', '#ADFF2F'],
  }

  // formatLabelY = (text) => {
  //   const t = text > 5 ? Math.ceil(text) : text;
  //   return `${t}`;
  // }

  render() {
    const { data, lineColors, dashPropName, unit } = this.props;

    const scale = {
      date: {
        type: 'timeCat',
        tickCount: 10,
      },
      nums: {
        type: 'linear',
        min: 0, // 定义数值范围的最小值
        // max: 100, // 定义数值范围的最大值
        // range: [0, 1],
        // formatter: (text) => { return `${text}页`; },
        tickCount: 5,
      },
    };

    const lastData = data.length ? data[data.length - 1] : '';
    // console.log('lastData', lastData, data);
    return (
      <div className={style.wrap}>
        {
          data.length ? (
            <Chart
              height={400}
              padding={[40, 60, 100, 60]}
              data={data}
              forceFit
              scale={scale}
            >
              <Legend />

              <Axis
                name="date"
                label={{
                  formatter: val => moment(val).format('MM-DD'),
                }}
              />

              <Axis
                name="nums"
                label={{
                  formatter: val => `${val}%`,
                }}
              />

              <Tooltip
                crosshairs={{
                  type: 'y',
                }}
                containerTpl='<div class="g2-tooltip">
                  <p class="g2-tooltip-title"></p>
                  <table class="g2-tooltip-list"></table>
                </div>'
                itemTpl={`<tr class="g2-tooltip-list-item">
                  <td style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></td>
                  <td style="display:inline-block;margin-right:8px;">{name}:</td>
                  <td>{value}${unit}</td>
                </tr>`}
              />
              <Line
                type="line"
                position="date*nums"
                size={2}
                color={['showName', lineColors]}
                shape={['showName', (showName) => {
                  if (dashPropName.includes(showName)) {
                    return 'dash';
                  }
                  return 'circle';
                }]}
              />
              <Geom
                type="point"
                position="date*nums"
                size={6}
                color={['showName', lineColors]}
                shape={"circle"}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
              />
              {/* {
                lastData ? (
                  <Guide>
                    <Text
                      top
                      position={{ date: lastData.date, nums: lastData.nums }}
                      content={lastData.nums} // 显示的文本内容
                      style={{
                        fill: '#FF4D4F', // 文本颜色
                        fontSize: '12', // 文本大小
                        fontWeight: 'bold', // 文本粗细
                      }}
                      offsetX={4}// x 方向的偏移量
                    />
                  </Guide>
                ) : null
              } */}

            </Chart>
          ) : (
            <div className={style.noData}>暂无数据</div>
          )
        }
      </div>
    );
  }
}
