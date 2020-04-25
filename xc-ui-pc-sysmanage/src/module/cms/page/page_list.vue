<template>
  <div>
    <el-form v-model="params">
      <!--编写页面静态部分，即view部分-->
      <el-select v-model="params.siteId" placeholder="请选择" >
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      <el-input v-model="params.pageAliase" placeholder="请输入页面别名" size="small">页面别名</el-input>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="siteId" label="站点id" width="180">
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
        siteList: [],
        list: [],
        total: 0,
        params: {
          page: 1,
          size: 10,
          siteId: '',
          pageAliase: ''
        }
      }
    },
    methods: {
      query: function () {
        //alert('查询');
        //调用服务端的接口
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((result) => {
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
      }
    },
    // 实现进入页面显示数据
    mounted() {
      this.query();
      this.siteQuery();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
