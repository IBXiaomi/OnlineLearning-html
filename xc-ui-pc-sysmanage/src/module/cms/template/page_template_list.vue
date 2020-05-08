<template>
  <div>
    <el-form v-model="params">
      <!--编写页面静态部分，即view部分-->
      <el-select v-model="params.templateFileId" placeholder="请选择模板文件id">
        <el-option
          v-for="item in list"
          :key="item.templateId"
          :label="item.templateFileId"
          :value="item.templateId">
        </el-option>
      </el-select>

      <el-input v-model="params.templateName" placeholder="请输入模板名称" style="width:150px"></el-input>
      <el-button type="primary" size="medium" v-on:click="query">查询</el-button>
      <router-link :to="{path:'/cms/template/add',query:{
       page:this.params.page,
       siteId:this.params.siteId

      }}">
        <el-button type="primary" size="medium">新增模板</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="siteId" label="站点id" width="250">
      </el-table-column>
      <el-table-column prop="templateId" label="模板id" width="250">
      </el-table-column>
      <el-table-column prop="templateName" label="模板名称" width="150">
      </el-table-column>
      <el-table-column prop="templateParameter" label="模板参数" width="150">
      </el-table-column>
      <el-table-column prop="templateFileId" label="模板文件id" width="250">
      </el-table-column>
      <!--<el-table-column prop="pageCreateTime" label="创建时间" width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="siteId" label="站点id" width="180">-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="250">
        <template slot-scope="page">
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button
            size="small" type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
        </template>

      </el-table-column>
    </el-table>
    <!--冒号相当于v-bind;@符号相当与v-on-->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      v-on:current-change="changePage"
      style="float:right">
    </el-pagination>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: {
          page: 0,
          size: 10,
          templateFileId: '',
          templateName: ''
        }
      }
    },
    methods: {
      query: function () {
        //alert('查询');
        //调用服务端的接口
        // 在向后端传递查询参数时，需要先在return中定义需要传递的参数，否则后端查询数据存在问题
        cmsApi.page_template_list(this.params.page, this.params.size, this.params).then((result) => {

          //将res结果数据赋值给数据模型对象
          this.list = result.queryResult.list;
          this.total = result.queryResult.total;
        })
      },
      changePage: function (page) {//形参就是当前页码
        //调用query方法
        // alert(page)
        this.params.page = page;
        this.query()
      },
      siteQuery: function () {
        cmsApi.site_list().then((result) => {
          this.siteList = result.queryResult.list;
        })
      },
      edit: function (pageId) {

        this.$router.push({
          path: '/cms/page/edit/' + pageId
        })
      },
      del: function (pageId) {
        this.$confirm('您确认删除吗?', '提示', {}).then(() => {
          cmsApi.del(pageId).then((result => {
            if (result.success) {
              this.$message.success("删除成功");
              //刷新页面
              this.query()
            } else {
              this.$message.error("删除失败");
            }
          }))
        })
      }
    },

    // created() {
    //   this.params.page = Number.parseInt(this.$route.query.page || 1),
    //     this.params.siteId = this.$route.query.siteId || ''
    // }
    // ,
    // 实现进入页面显示数据
    mounted() {
      this.query();

    }
  }


</script>
<style>
  /*编写页面样式，不是必须*/
</style>
