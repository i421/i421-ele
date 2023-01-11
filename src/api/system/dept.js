import request from '@/utils/request.js';

// 分页获取部门信息
export const getDeptPage = (params) => {
  return request({
    url: '/system/getDeptList',
    method: 'get',
    params,
  });
};

// 更新部门
export const updateDept = (data) => {
  return request({
    url: '/system/updateOrCreateDept',
    method: 'post',
    data,
  });
};

// 删除部门
export const deleteDept = (data) => {
  return request({
    url: '/system/deleteDept',
    method: 'delete',
    data,
  });
};

// 新增部门
export const storeDept = (data) => {
  return request({
    url: '/system/updateOrCreateDept',
    method: 'post',
    data,
  });
};
