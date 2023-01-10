import request from '@/utils/request.js';

// 分页获取部门信息
export const getDictPage = (params) => {
  return request({
    url: '/system/getConfigList',
    method: 'get',
    params,
  });
};

// 更新部门
export const updateDict = (data) => {
  return request({
    url: '/sys/config/update',
    method: 'post',
    data,
  });
};

// 删除部门
export const deleteDict = (data) => {
  return request({
    url: '/sys/config/delete',
    method: 'post',
    data,
  });
};

// 新增部门
export const storeDict = (data) => {
  return request({
    url: '/sys/config/insert',
    method: 'post',
    data,
  });
};
