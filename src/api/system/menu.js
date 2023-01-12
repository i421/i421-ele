import request from '@/utils/request.js';

// 获取菜单
export const getMenus = (params) => {
  return request({
    url: '/system/getMenuList',
    method: 'get',
    params,
  });
};

// 分页获取菜单信息
export const getMenuPage = (params) => {
  return request({
    url: '/system/getMenuList',
    method: 'get',
    params,
  });
};

// 更新菜单
export const updateMenu = (data) => {
  return request({
    url: '/system/updateOrCreateMenu',
    method: 'post',
    data,
  });
};

// 删除菜单
export const deleteMenu = (data) => {
  return request({
    url: '/system/deleteMenu',
    method: 'delete',
    data,
  });
};

// 新增菜单
export const storeMenu = (data) => {
  return request({
    url: '/system/updateOrCreateMenu',
    method: 'post',
    data,
  });
};
