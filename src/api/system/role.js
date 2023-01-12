import request from '@/utils/request.js';
// 获取角色列表
export const getRoles = () => {
  return request({
    url: '/system/getAllRoleList',
    method: 'get',
  });
};

// 分页获取角色列表
export const getRolePage = (params) => {
  return request({
    url: '/system/getRoleListByPage',
    method: 'get',
    params,
  });
};

// 更新角色
export const updateRole = (data) => {
  return request({
    url: '/system/updateOrCreateRole',
    method: 'post',
    data,
  });
};

// 删除角色
export const deleteRole = (data) => {
  return request({
    url: '/system/deleteRole',
    method: 'delete',
    data,
  });
};

// 新增角色
export const storeRole = (data) => {
  return request({
    url: '/system/updateOrCreateRole',
    method: 'post',
    data,
  });
};

// 角色菜单权限更新
export const updateRoleMenu = (data) => {
  return request({
    url: '/system/updateRoleMenu',
    method: 'post',
    data,
  });
};

// 获取角色菜单权限
export const getRoleMenu = (data) => {
  return request({
    url: '/system/getRoleMenu',
    method: 'post',
    data,
  });
};
