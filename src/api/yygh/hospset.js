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
  }

}
