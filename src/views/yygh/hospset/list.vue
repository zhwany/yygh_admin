<template>
  <div class="app-container block">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()"> 查询</el-button>
      <el-button type="default" icon="el-icon-refresh-left" @click="resetData()"> 清空</el-button>
      <!-- 工具条 -->
      <el-button type="danger" icon="el-icon-delete" @click="removeRows()"> 批量删除</el-button>
    </el-form>

    <!-- 表格，遍历后端返回的医院设置信息集合-->
    <el-table :data="list" border style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (page - 1) * limit }}
        </template>
      </el-table-column>
      <el-table-column prop="hosname" label="医院名称" width="180" align="center" />
      <el-table-column prop="hoscode" label="医院编号" width="180" align="center" />
      <el-table-column prop="contactsName" label="联系人" width="180" align="center" />
      <el-table-column prop="contactsPhone" label="电话" width="120" align="center" />
      <el-table-column prop="status" label="状态" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/yygh/hospset/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="锁定操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            icon="el-icon-lock"
            @click="lockHostSet(scope.row.id,0)"
          >锁定
          </el-button>
          <el-button
            v-if="scope.row.status==0"
            type="danger"
            size="mini"
            icon="el-icon-unlock"
            @click="lockHostSet(scope.row.id,1)"
          >取消锁定
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding: 30px 0; text-align: center;"
      :current-page="page"
      :page-sizes="[3, 5, 7, 9]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
      searchObj: {}, // 查询条件

      multipleSelection: [] // 批量删除使用，批量选择中选择的记录列表，注意：不是每行的id
    }
  },

  created() { // Vue实例创建完成，执行created钩子函数
    this.fetchData()
  },

  methods: {
    fetchData(page = 1) { // 调用api层获取数据库中的数据
      this.page = page
      this.listLoading = true

      hospset
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          if (response.success === true) {
            this.list = response.data.rows
            this.total = response.data.total
          }
          this.listLoading = false
        })
    },

    // 分页，每页显示的记录数改变时调用
    handleSizeChange(val) {
      this.limit = val
      this.fetchData()
    },

    // 分页，跳转到指定的第几页调用
    handleCurrentChange(val) {
      this.page = val
      this.fetchData(val)
    },

    // 搜索条件清空
    resetData() {
      // this.searchObj.hosname = null
      // this.searchObj.hoscode = null
      this.searchObj = {}
      this.fetchData()
    },

    // 通过id删除
    removeDataById(id) {
      this.$confirm('确定要删除？', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      })
        .then(() => {
          return hospset.removeById(id)
        })
        .then(() => {
          if (this.total - 1 === this.limit) {
            this.fetchData(1)
          } else {
            this.fetchData(this.page)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
    },

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

    // 批量删除
    removeRows() {
      // 判断是否选中行
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '\xa0\xa0\xa0请选择要删除的数据',
          center: 'true'
        })
        return
      }

      this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      }).then(() => { // 确定执行then方法
        var idList = []
        // 遍历数组得到每个id值，设置到idList里面
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i]
          var id = obj.id
          idList.push(id)
        }
        // 调用接口
        hospset.removeRows(idList)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.fetchData(1)
          })
      })
    },

    // 锁定和取消锁定
    lockHostSet(id, status) {
      hospset.lockHospSet(id, status)
        .then(response => {
          // 刷新
          this.fetchData(this.page)
        })
    }

  }
}
</script>

<style lang="scss">
// 交换确认删除消息弹窗中确定和取消的位置
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
</style>
