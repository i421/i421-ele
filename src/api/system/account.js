import request from '@/utils/request.js';

// 分页获取用户信息
export const getAccountPage = (data) => {
  return request({
    url: '/sys/user/page',
    method: 'post',
    data,
  });
};

// 更新用户
export const updateAccount = (data) => {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data,
  });
};

// 删除用户
export const deleteAccount = (data) => {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    data,
  });
};

// 新增用户
export const storeAccount = (data) => {
  return request({
    url: '/sys/user/insert',
    method: 'post',
    data,
  });
};

// 更新密码
export const updatePassword = (data) => {
  return request({
    url: '/sys/user/update/password',
    method: 'post',
    data,
  });
};
