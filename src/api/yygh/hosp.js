import request from '@/utils/request'

export default {
  // 分页查询医院列表
  getPageList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospital/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // 查询dictCode查询下级数据字典（Province查询省份列表）
  findByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },

  // 根据id查询下级数据字典，根据省份id查询城市列表
  findByParentId(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },

  // 更新医院的上线状态
  updateStatus(id, status) {
    return request({
      url: `/admin/hosp/hospital/updateStatus/${id}/${status}`,
      method: 'get'
    })
  },

  // 查看医院详情
  getHospById(id) {
    return request({
      url: `/admin/hosp/hospital/show/${id}`,
      method: 'get'
    })
  }
}
