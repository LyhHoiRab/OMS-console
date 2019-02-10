<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to='/wechat'>微信号管理</el-breadcrumb-item>
      <el-breadcrumb-item>微信号信息</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='info'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='微信号'
            v-model='data.wxno'>

            <template slot='prepend'>微信号</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='昵称'
            v-model='data.nickname'>
            
            <template slot='prepend'>昵称</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='手机号码'
            v-model='data.phone'>
            
            <template slot='prepend'>手机号码</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='备注'
            v-model='data.remark'>
            
            <template slot='prepend'>备注</template>
          </el-input>
        </el-col><!-- item -->
      </el-row>

      <el-row>
        <el-col :xs='24' :md='24'>
          <el-upload
            accept='image/*'
            list-type='picture-card'
            :action='wechatUploadImage'
            :with-credentials='true'
            :show-file-list='true'
            :multiple='false'
            :on-success='imageSuccess'
            :on-remove='imageRemove'
            :file-list='image'>

            微信图片
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs='24' :md='24'>
          <el-upload
            accept='image/*'
            list-type='picture-card'
            :action='wechatUploadQr'
            :with-credentials='true'
            :show-file-list='true'
            :multiple='false'
            :on-success='qrSuccess'
            :on-remove='qrRemove'
            :file-list='qr'>

            二维码
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs='24' :md='24'>
          <el-button plain @click='submit'>
            提交
          </el-button>
        </el-col>
      </el-row>
    </div><!-- info -->
  </div>
</template>

<script>
  import {get, post, put} from '../utils/utils'
  import {
    WechatUploadImage,
    WechatUploadQr,
    WechatSave,
    WechatUpdate,
    WechatGetById,
  } from '../utils/api'

  export default {
    name: 'WechatEdit',

    methods: {
      //查询
      getWechat: function(){
        get(WechatGetById.replace('{id}', this.id)).then(response => {
          var data = response.data;

          if(data.success){
            this.data = data.result;

            if(this.data.image !== undefined && this.data.image !== null && this.data.image !== ''){
              this.image.push({
                url : this.data.image,
              });
            }

            if(this.data.qr !== undefined && this.data.qr !== null && this.data.qr !== ''){
              this.qr.push({
                url : this.data.qr,
              });
            }
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
      //提交
      submit: function(){
        if(this.image.length > 0){
          var image = '';

          this.image.forEach(element => {
            image = element.url;
          });

          this.data.image = image;
        }else{
          this.data.image = '';
        }

        if(this.qr.length > 0){
          var qr = '';

          this.qr.forEach(element => {
            qr = element.url;
          });

          this.data.qr = qr;
        }else{
          this.data.qr = '';
        }
          
        if(this.data.id === undefined || this.data.id === null){
          //新增
          post(WechatSave, null, JSON.stringify(this.data)).then(response => {
            var data = response.data;
            
            if(data.success){
              this.$message.success(data.msg);
              this.$router.push('/wechat');
            }else{
              this.$message.error(data.msg);
            }
          });
        }else{
          //修改
          put(WechatUpdate, null, JSON.stringify(this.data)).then(response => {
            var data = response.data;
            
            if(data.success){
              this.$message.success(data.msg);
              this.$router.push('/wechat');
            }else{
              this.$message.error(data.msg);
            }
          });
        }
      },
      //上传图片回调
      imageSuccess: function(response, file){
        if(response.success){
          this.$message.success(response.msg);

          this.image = [{
            uid    : file.uid,
            name   : file.name,
            url    : response.result,
            status : 'success',
          }];

        }else{
          this.$message.error(response.msg);
          console.log(response.msg);
        }
      },
      imageRemove: function(file, fileList){
        this.image = fileList;
      },
      qrSuccess: function(response, file){
        if(response.success){
          this.$message.success(response.msg);

          this.qr = [{
            uid    : file.uid,
            name   : file.name,
            url    : response.result,
            status : 'success',
          }];

        }else{
          this.$message.error(response.msg);
          console.log(response.msg);
        }
      },
      qrRemove: function(file, fileList){
        this.qr = fileList;
      },
    },

    data(){
      return{
        id    : this.$route.params.id,
        image : [],
        qr    : [],
        //数据
        data : {},
        //api
        wechatUploadImage : WechatUploadImage,
        wechatUploadQr    : WechatUploadQr, 
      }
    },

    created: function(){
      if(this.id !== undefined && this.id !== null && this.id !== ''){
        this.getWechat();
      }
    },
  }
</script>

