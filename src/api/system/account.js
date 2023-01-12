import request from '@/utils/request.js';

// 分页获取用户信息
export const getAccountPage = (params) => {
  return request({
    url: '/system/getAccountList',
    method: 'get',
    params,
  });
};

// 更新用户
export const updateAccount = (data) => {
  return request({
    url: '/system/updateOrCreateAccount',
    method: 'post',
    data,
  });
};

// 删除用户
export const deleteAccount = (data) => {
  return request({
    url: '/system/deleteAccount',
    method: 'delete',
    data,
  });
};

// 新增用户
export const storeAccount = (data) => {
  return request({
    url: '/system/updateOrCreateAccount',
    method: 'post',
    data,
  });
};

// 更新密码
export const updatePassword = (data) => {
  return request({
    url: '/system/updatePassword',
    method: 'post',
    data,
  });
};
