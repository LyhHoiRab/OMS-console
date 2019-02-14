<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to='/payment'>支付方式管理</el-breadcrumb-item>
      <el-breadcrumb-item>支付方式信息</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='info'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='描述'
            v-model='data.description'>

            <template slot='prepend'>描述</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-select v-model='data.status' placeholder='可用状态'>
            <el-option
              v-for='(key, value) in usingStatus'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->
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
  import {
    get,
    post,
    put,
  } from '../utils/utils'

  import {
    UsingStateSelect,
    PaymentGetById,
    PaymentSave,
    PaymentUpdate,
  } from '../utils/api'

  export default{
    name: 'PaymentEdit',

    methods: {
      //提交
      submit: function(){
        if(this.id !== undefined && this.id !== null && this.id !== ''){
          put(PaymentUpdate, null, JSON.stringify(this.data)).then(response => {
            var data = response.data;

            if(data.success){
              this.$message.success(data.msg);
              this.$router.push('/payment');
            }else{
              this.$message.error(data.msg);
              console.log(data.msg);
            }
          });
        }else{
          post(PaymentSave, null, JSON.stringify(this.data)).then(response => {
            var data = response.data;

            if(data.success){
              this.$message.success(data.msg);
              this.$router.push('/payment');
            }else{
              this.$message.error(data.msg);
              console.log(data.msg);
            }
          });
        }
      },
      //查询
      getPayment: function(){
        get(PaymentGetById.replace('{id}', this.id)).then(response => {
          var data = response.data;

          if(data.success){
            this.data = data.result;
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
      //下拉
      getUsingStatus: function(){
        get(UsingStateSelect).then(response => {
          var data = response.data;

          if(data.success){
            this.usingStatus = data.result;
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
    },

    data(){
      return{
        //id
        id : this.$route.params.id,
        //数据
        data : {},
        //下拉
        usingStatus : {},
      }
    },

    created: function(){
      //初始化
      this.getUsingStatus();

      if(this.id !== undefined && this.id !== null && this.id !== ''){
        this.getPayment();
      }
    },
  }
</script>

