<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to='/sales'>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售信息</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='info'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='账号'
            v-model='data.account.username'
            :readonly='accountId !== undefined'>

            <template slot='prepend'>账号</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='密码'
            v-model='data.account.password'>

            <template slot='prepend'>密码</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-select v-if='data.account.status' v-model='data.account.status' placeholder='账户状态'>
            <el-option
              v-for='(key, value) in accountStatus'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->
      </el-row>

      <el-row>
        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='昵称'
            v-model='data.nickname'>

            <template slot='prepend'>昵称</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-select v-model='data.sex' placeholder='性别'>
            <el-option
              v-for='(key, value) in sexType'
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
  import JSEncrypt        from 'jsencrypt'
  import {get, put, post} from '../utils/utils'

  import {
    AccountStatusSelect,
    SexSelect,
    RSAPublicKey,
    SalesGetByAccountId,
    SalesSave,
    SalesUpdate,
  } from '../utils/api'

  export default{
    name: 'SalesEdit',

    methods: {
      //提交
      submit: function(){
        if(this.data.account.password !== undefined && this.data.account.password !== null && this.data.account.password !== ''){
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey(this.rsaPublicKey);

          this.data.account.password = encrypt.encrypt(this.data.account.password);
        }

        if(this.accountId !== undefined && this.accountId !== null && this.accountId !== ''){
          put(SalesUpdate, null, JSON.stringify(this.data)).then(response => {
            var data = response.data;

            if(data.success){
              this.$message.success(data.msg);
              this.$router.push('/sales');
            }else{
              this.$message.error(data.msg);
            }
          });

        }else{
          post(SalesSave, null, JSON.stringify(this.data)).then(response => {
            var data = response.data;

            if(data.success){
              this.$message.success(data.msg);
              this.$router.push('/sales');
            }else{
              this.$message.error(data.msg);
            }
          });
        }
      },
      //下拉
      getAccountStatus: function(){
        get(AccountStatusSelect).then(response => {
          var data = response.data;

          if(data.success){
            this.accountStatus = data.result;
          }else{
            this.$message.error(response.msg);
            console.log(data.msg);
          }
        });
      },
      getSex: function(){
        get(SexSelect).then(response => {
          var data = response.data;

          if(data.success){
            this.sexType = data.result;
          }else{
            this.$message.error(response.msg);
            console.log(data.msg);
          }
        });
      },
      //查询数据
      getSales: function(){
        get(SalesGetByAccountId.replace('{accountId}', this.accountId)).then(response => {
          var data = response.data;

          if(data.success){
            this.data = data.result;
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
      //查询公钥
      getRSAPublicKey: function(){
        get(RSAPublicKey).then(response => {
          var data = response.data;

          if(data.success){
            this.rsaPublicKey = data.result;
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      }
    },

    data(){
      return{
        accountId    : this.$route.params.accountId,
        rsaPublicKey : '',
        //数据 
        data : {
          account : {}
        },
        //下拉
        accountStatus : {},
        sexType       : {},
      }
    },

    created: function(){
      //初始化数据
      this.getAccountStatus();
      this.getSex();
      this.getRSAPublicKey();

      if(this.accountId !== undefined && this.accountId !== null && this.accountId !== ''){
        this.getSales();
      }
    },
  }
</script>

