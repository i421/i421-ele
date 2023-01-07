<template>
  <div>
    <el-date-picker
      v-model="created"
      type="datetimerange"
      value-format="YYYY-MM-DD HH:mm:ss"
      format="YYYY-MM-DD HH:mm:ss"
      @change="changeDate"
      clearable
    />
    <div id="country-chart"></div>
  </div>
</template>

<script setup>
  import { useEcharts } from '@/hooks/useEcharts';
  import chinaData from '@/assets/world.json';
  import { ref, onMounted } from 'vue';
  import { registerMap } from 'echarts';
  import { getData } from '@/api/satPath';
  import { parseTime } from '@/utils/time.js';
  const { setOption } = useEcharts('#country-chart');

  const chartData = ref([]);
  const created = ref([
    parseTime(new Date().setTime(new Date().getTime() - 3600 * 1000)),
    parseTime(new Date()),
  ]);
  const changeDate = () => {
    loadChart();
  };

  const loadChart = async () => {
    const param = {
      start_time: created.value[0],
      end_time: created.value[1],
    };
    let data = await getData(param).then((res) => {
      const { data } = res;
      return { data };
    });
    for (let i = 0; i < data.data.length; i++) {
      let lng = data.data[i].longitude;
      let lat = data.data[i].latitude;
      let sat = data.data[i].sat;
      chartData.value.push([lng, lat, sat]);
    }
    setOption({
      title: {
        text: '位置',
        textStyle: {
          color: '#fff',
        },
      },
      // 右上角工具菜单
      toolbox: {
        show: true,
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      geo: {
        map: 'world',
        roam: false,
        // 坐标绑定
        left: '10%',
        top: 60,
        right: '10%',
        bottom: 70,
        label: false,
        zoom: 1.15,
        boundingCoords: [
          [-180, 90],
          [180, -90],
        ],
        itemStyle: {
          areaColor: '#3774aa',
          borderColor: '#3774aa',
        },
        silent: true,
        emphasis: {
          itemStyle: {
            areaColor: '#3774aa',
            borderColor: '#3774aa',
          },
          focus: 'none',
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [
            [123.373, 34.08, 'S1'],
            [103.373, 37.08, 'S2'],
          ],
          // data: toRaw(chartData.value),
          symbolSize: 30,
          label: {
            show: true,
            position: 'inside',
            formatter: '{@[2]}',
          },
          itemStyle: {
            normal: {
              color: '#ddb926',
            },
          },
        },
      ],
    });
  };

  onMounted(() => {
    registerMap('world', chinaData);
    loadChart();
  });
</script>

<style lang="scss" scoped>
  #country-chart {
    height: 600px;
    background: #084a84;
    margin-top: 15px;
  }
</style>
