import request from '@/utils/request.js';
// 获取角色列表
export const getRoles = (params) => {
  return request({
    url: '/system/getRoleList',
    method: 'get',
    params,
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
    url: '/sys/role/update',
    method: 'post',
    data,
  });
};

// 删除角色
export const deleteRole = (data) => {
  return request({
    url: '/sys/role/delete',
    method: 'post',
    data,
  });
};

// 新增角色
export const storeRole = (data) => {
  return request({
    url: '/sys/role/insert',
    method: 'post',
    data,
  });
};

// 角色菜单权限更新
export const updateRoleMenu = (data) => {
  return request({
    url: '/sys/role/menu/update',
    method: 'post',
    data,
  });
};

// 获取角色菜单权限
export const getRoleMenu = (data) => {
  return request({
    url: '/sys/role/menu/ids',
    method: 'post',
    data,
  });
};
