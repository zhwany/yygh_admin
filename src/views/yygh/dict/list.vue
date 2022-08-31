<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <el-button type="text" @click="exportData"><i class="fa fa-plus"/> 导出</el-button>
      </div>
    </div>

    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="150"
      />

      <el-table-column
        prop="dictCode"
        label="编码"
        width="150"
      />

      <el-table-column
        prop="value"
        label="值"
        width="150"
      />

      <el-table-column
        prop="createTime"
        label="创建时间"
      />
    </el-table>
  </div>
</template>

<script>
import dict from '@/api/yygh/dict'
export default {
  data() {
    return {
      list: [] // 数据字典列表数组
    }
  },
  created() {
    this.getDictList(1)
  },
  methods: {
    // 数据字典列表
    getDictList(id) {
      dict.dictList(id)
        .then(response => {
          this.list = response.data.list
        })
    },
    load(tree, treeNode, resolve) {
      dict.dictList(tree.id).then(response => {
        resolve(response.data.list)
      })
    },
    exportData() {
      window.open('http://localhost:8202/admin/cmn/dict/exportData')
    }
  }
}
</script>
