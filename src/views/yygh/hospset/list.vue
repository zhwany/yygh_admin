<template>
  <div class="app-container block">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="主键" width="180" align="center"></el-table-column>
      <el-table-column prop="hosname" label="医院名称" width="180" align="center"></el-table-column>
      <el-table-column prop="hoscode" label="医院编号" width="180" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/yygh/hospset/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding: 30px 0; text-align: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 7, 9]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import hospset from '@/api/yygh/hospset'

export default {

  data() { // 定义数据
    return {
      listLoading: true, // 是否显示loading信息
      list: [], // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 9, // 每页记录数
      searchObj: {}// 查询条件
    }
  },

  created() { // Vue实例创建完成，执行created钩子函数
    this.fetchData()
  },

  methods: {
    fetchData() { // 调用api层获取数据库中的数据
      this.listLoading = true

      hospset
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          if (response.success === true) {
            this.list = response.data.list
            this.total = response.data.total
          }
          this.listLoading = false
        })
    },
    handleSizeChange(val) {
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchData()
    },
    resetData() {
      // this.searchObj.hosname = null
      // this.searchObj.hoscode = null
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>
