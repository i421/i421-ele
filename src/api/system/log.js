import request from '@/utils/request.js';

// 分页获取日志列表
export const getLogPage = (params) => {
  return request({
    url: '/system/getLogList',
    method: 'get',
    params,
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
