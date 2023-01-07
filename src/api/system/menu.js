import request from '@/utils/request.js';

// 获取菜单
export const getMenus = (data) => {
  return request({
    url: '/sys/menu/query',
    method: 'post',
    data,
  });
};

// 分页获取菜单信息
export const getMenuPage = (data) => {
  return request({
    url: '/sys/menu/page',
    method: 'post',
    data,
  });
};

// 更新菜单
export const updateMenu = (data) => {
  return request({
    url: '/sys/menu/update',
    method: 'post',
    data,
  });
};

// 删除菜单
export const deleteMenu = (data) => {
  return request({
    url: '/sys/menu/delete',
    method: 'post',
    data,
  });
};

// 新增菜单
export const storeMenu = (data) => {
  return request({
    url: '/sys/menu/insert',
    method: 'post',
    data,
  });
};
