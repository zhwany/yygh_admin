import request from '@/utils/request'

const api_name = '/admin/hosp/hospitalSet'

export default {

  // 医院设置列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },

  save(hospset) {
    return request({
      url: `${api_name}/saveHospSet`,
      method: 'post',
      data: hospset
    })
  }

}
