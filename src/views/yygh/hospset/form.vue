<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospset.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospset.hoscode" />
      </el-form-item>
      <el-form-item label="api地址">
        <el-input v-model="hospset.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="hospset.contactsName" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="hospset.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospset from '@/api/yygh/hospset'

export default {
  data() {
    return {
      hospset: {},
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },

  // 注意：获取路由参数，使用的是 $route ，没有r
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.fetchDataById(id)
    }
  },

  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.hospset.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 保存
    saveData() {
      hospset.save(this.hospset).then(resp => {
        if (resp.code === 20000) {
          // console.log(resp.code)
          // console.log(resp.message)
          if (resp.message !== '') {
            this.$message.error(resp.message)
            this.saveBtnDisabled = false
          } else {
            this.$message({
              type: 'seccess',
              message: '保存成功'
            })
            this.$router.push({
              path: '/yygh/hospset/list'
            })
          }
        }
      })
    },

    // 用于更新医院设置时的数据回显
    fetchDataById(id) {
      hospset.getById(id)
        .then(response => {
          this.hospset = response.data.item
        })
    },

    updateData() {
      this.saveBtnDisabled = true
      hospset.updateById(this.hospset)
        .then(response => {
          return this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        .then(response => {
          this.$router.push({
            path: '/yygh/hospset/list'
          })
        })
    }
  }
}
</script>
