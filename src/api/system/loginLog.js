import request from '@/utils/request.js';

// 分页登录日志列表
export const getLoginLogPage = (data) => {
  return request({
    url: '/sys/login_log/page',
    method: 'post',
    data,
  });
};
