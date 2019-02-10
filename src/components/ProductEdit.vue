<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to='/item'>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品信息</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='info'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='产品编码'
            v-model='data.code'
            readonly>

            <template slot='prepend'>产品编码</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='产品编号'
            v-model='data.number'>

            <template slot='prepend'>产品编号</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='产品名称'
            v-model='data.name'>

            <template slot='prepend'>产品名称</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input-number 
            v-model='data.price'
            placeholder='价格'
            label='价格'
            :precision='2'>
          </el-input-number>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-select v-model='data.customized' placeholder='定制类型'>
            <el-option
              v-for='(key, value) in customized'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-select v-model='data.type' placeholder='产品类型'>
            <el-option
              v-for='(key, value) in productType'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='质地'
            v-model='data.texture'>

            <template slot='prepend'>质地</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='规格'
            v-model='data.specification'>

            <template slot='prepend'>规格</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='说明'
            v-model='data.description'>

            <template slot='prepend'>说明</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='功效'
            v-model='data.effect'>

            <template slot='prepend'>功效</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='药监局网址'
            v-model='data.sfda'>

            <template slot='prepend'>药监局网址</template>
          </el-input>
        </el-col><!-- item -->
      </el-row>

      <el-row>
        <el-col :xs='24' :md='24'>
          <el-upload
            list-type='picture-card'
            accept='image/*'
            :action='productUploadCertificate'
            :with-credentials='true'
            :multiple='false'
            :on-success='certificateSuccess'
            :on-remove='certificateRemove'
            :file-list='certificate'>

            备案证书
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs='24' :md='24'>
          <el-upload
            accept='image/*'
            list-type='picture-card'
            :action='productUploadThumbnail'
            :with-credentials='true'
            :show-file-list='true'
            :multiple='false'
            :on-success='thumbnailSuccess'
            :on-remove='thumbnailRemove'
            :file-list='thumbnail'>

            产品图片
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs='24' :md='24'>
          <el-button plain @click='update'>
            提交
          </el-button>
        </el-col>
      </el-row>
    </div><!-- info -->
  </div>
</template>

<script>
  import {get, put} from '../utils/utils'
  import {
    ProductTypeSelect,
    CustomizedSelect,
    ProductGetById,
    ProductUpdate,
    ProductUploadCertificate,
    ProductUploadThumbnail,
  } from '../utils/api'

  export default{
    name : 'Product',

    methods: {
      //查询产品信息
      getProduct: function(){
        get(ProductGetById.replace('{id}', this.id)).then(response => {
          var data = response.data;

          if(data.success){
            this.data = data.result;

            if(this.data.certificates !== undefined && this.data.certificates !== null && this.data.certificates !== ''){
              var certificate = this.data.certificates.split(';');
              if(certificate !== undefined && certificate.length > 0){
                certificate.forEach(element => {
                  this.certificate.push({
                    url : element,
                  });
                });
              }
            }
            
            if(this.data.thumbnail !== undefined && this.data.thumbnail !== null && this.data.thumbnail !== ''){
              this.thumbnail.push({
                url : this.data.thumbnail,
              });
            }
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
      //提交
      update: function(){
        if(this.thumbnail.length > 0){
          var thumbnail = '';

          this.thumbnail.forEach(element => {
            thumbnail = element.url;
          });

          this.data.thumbnail = thumbnail;
        }else{
          this.data.thumbnail = '';
        }
        
        if(this.certificate.length > 0){
          var certificate = [];

          this.certificate.forEach(element => {
            certificate.push(element.url);
          });

          this.data.certificates = certificate.join(';');
        }else{
          this.data.certificates = '';
        }

        put(ProductUpdate, null, JSON.stringify(this.data)).then(response => {
          var data = response.data;

          if(data.success){
            this.$message.success(data.msg);
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
      //上传证书回调
      certificateSuccess: function(response, file, fileList){
        if(response.success){
          this.$message.success(response.msg);

          this.certificate.push({
            uid    : file.uid,
            name   : file.name,
            url    : response.result,
            status : 'success',
          });
        }
      },
      certificateRemove: function(file, fileList){
        this.certificate = fileList;
      },
      //上传图片回调
      thumbnailSuccess: function(response, file){
        if(response.success){
          this.$message.success(response.msg);

          this.thumbnail = [{
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
      thumbnailRemove: function(file, fileList){
        this.thumbnail = fileList;
      },
      //下拉
      getProductType: function(){
        get(ProductTypeSelect).then(response => {
          var data = response.data;

          if(data.success){
            this.productType = data.result;
          }else{
            this.$message.error(response.msg);
          }
        });
      },

      getCustomized: function(){
        get(CustomizedSelect).then(response => {
          var data = response.data;

          if(data.success){
            this.customized = data.result;
          }else{
            this.$message.error(response.msg);
          }
        });
      },
    },

    data(){
      return{
        //产品ID
        id          : this.$route.params.id,
        thumbnail   : [],
        certificate : [],
        //产品信息
        data : {},
        //下拉
        productType : {},
        customized  : {},
        //api
        productUploadCertificate : ProductUploadCertificate,
        productUploadThumbnail   : ProductUploadThumbnail,
      }
    },

    created: function(){
      //初始化数据
      this.getProductType();
      this.getCustomized();
      this.getProduct();
    },
  }
</script>

