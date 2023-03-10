import echarts from '@/plugin/echarts';
import { useDebounce } from './useDebounce';
import { nextTick, onMounted, onUnmounted } from 'vue';
export const useEcharts = (selector) => {
  let chartInstance = null;
  onMounted(() => {
    let el = document.querySelector(selector);
    el.removeAttribute('_echarts_instance_');
    chartInstance = echarts.init(el);
  });

  function setOption(option) {
    nextTick(() => {
      chartInstance.resize();
      chartInstance.setOption(option);
    });
  }
  setTimeout(() => {
    window.addEventListener('resize', useDebounce(chartInstance.resize));
  });
  onUnmounted(() => {
    window.removeEventListener('resize', useDebounce(chartInstance.resize));
  });
  return {
    setOption,
  };
};
