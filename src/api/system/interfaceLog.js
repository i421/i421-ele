import request from '@/utils/request.js';

// 分页登录日志列表
export const getInterfaceLogPage = (data) => {
  return request({
    url: '/sys/api_log/page',
    method: 'post',
    data,
  });
};
