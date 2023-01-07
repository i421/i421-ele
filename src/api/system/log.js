import request from '@/utils/request.js';

// 分页获取日志列表
export const getLogPage = (data) => {
  return request({
    url: '/sys/log/page',
    method: 'post',
    data,
  });
};

// 新增日志
export const storeLog = (data) => {
  return request({
    url: '/sys/log/insert',
    method: 'post',
    data,
  });
};
