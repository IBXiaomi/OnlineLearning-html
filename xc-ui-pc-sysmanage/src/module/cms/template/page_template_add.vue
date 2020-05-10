<template>
  <div>
    <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="选择模版" prop="templateId">-->
      <!--<el-select v-model="pageForm.templateId" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in templateList"-->
      <!--:key="item.templateId"-->
      <!--:label="item.templateName"-->
      <!--:value="item.templateId">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="模板名称" prop="pageName">
        <el-input v-model="pageForm.templateName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板参数" prop="pageName">
        <el-input v-model="pageForm.templateParameter" auto-complete="off"></el-input>
      </el-form-item>

      <!--<el-form-item label="数据URL" prop="pagePhysicalPath">-->
      <!--<el-input v-model="pageForm.pageDataURL" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--上传文件div-->


      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
      </el-form-item>
    </el-form>
    <div>
      <el-form :model="form">
        <el-form-item>
          <el-upload style="display: inline;"
                     ref="uploadFTLFile"
                     action="https://localhost:31001/cms/page/template/upload"
                     :limit="1"
                     :before-upload="beforeUpload"
                     :on-change="fileChange"
                     :auto-upload="false"
          >
            <el-button slot="trigger" type="primary" style="margin-left: 10px;" plain="">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <br/>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="go_back">返回</el-button>
    </div>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        pageId: '',
        siteList: [],
        templateList: [],
        pageForm: {
          siteId: '',
          templateId: '',
          pageType: '',
          pageCreateTime: new Date(),
          templateParameter: '',
          templateName: ''
        },
        form: {
          file: ''
        },
        pageFormRules: {
          siteId: [
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateName: [
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          templateParameter: [
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      addSubmit: function () {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              let formData= new FormData();
              formData.append('file',this.form.file);
              formData.append('pageForm',this.pageForm);
              cmsApi.cms_template_add(formData).then((result => {
                if (result.success) {
                  this.$message.success("提交成功");
                  this.$refs['pageForm'].resetFields();
                } else if (!result.success) {
                  this.$message.success(result.message);
                }
              }))
            })
          }
        })

      },
      fileChange: function (file) {
        alert(1)
        this.form.file = file.raw
      },
      uploadFile: function () {
        alert(1)
        this.$refs.uploadFTLFile.submit()
      },
      go_back: function () {
        this.$router.push({
          path: '/cms/page/list',
          query: {
            page: this.$route.query.page,
            siteId: this.$route.query.siteId
          }
        })
      },
      allTemplateList: function () {
        cmsApi.template_list().then((result => {
          this.templateList = result.queryResult.list
        }))
      },
      beforeUpload: function (file) {
        if (file.name === ' ') {
          this.$message.warning("请选择需要上传的模板");
          return false
        }
        this.files = file;
        const extension1 = file.name.split('.')[1] === 'ftl';
        const isMt10M = file.size / 1024 / 1024 > 10;
        if (!extension1) {
          this.$message.warning('上传模板只能是ftl格式!');
          return
        }
        if (isMt10M) {
          this.$message.warning('上传模板大小不能超过 10MB!');
          return
        }
        this.fileName = file.name;
        // setTimeout(() => {
        //   this.submitUpload(file);
        // }, 500);
        return false // 返回false不会自动上传
      },
      submitUpload(file) {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            this.$confirm('您确认上传吗?', '提示', {}).then(() => {
              let fileFormData = new FormData();
              fileFormData.append('file', file);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
              fileFormData.append('cmsTemplate', this.pageForm);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
              cmsApi.template_upload(fileFormData).then((result) => {
                if (result.success) {
                  this.$message.success("提交成功");
                } else if (!result.success) {
                  this.$message.success(result.message);
                }
              })
            })
          }
        })
      },
    }, mounted() {
      this.allTemplateList();
      cmsApi.site_list().then((result => {
        this.siteList = result.queryResult.list
      }))
    }
  }

</script>
<style>
  /*编写页面样式，不是必须*/
</style>
