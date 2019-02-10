<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='search-bar'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='账户名'
            v-model='username'>

            <template slot='prepend'>账户名</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='昵称'
            v-model='nickname'>

            <template slot='prepend'>昵称</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='status' 
            placeholder='账户状态'
            :clearable='true'>

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
        <el-col :xs='24' :sm='24'>
          <el-button plain @click='refresh'>
            <font-awesome-icon :icon='["fas","redo"]'/>
            刷新
          </el-button>

          <el-button plain @click='search'>
            <font-awesome-icon :icon='["fas","search"]'/>
            查询
          </el-button>

          <el-button plain @click='reset'>
            <font-awesome-icon :icon='["fas","times"]'/>
            重置
          </el-button>

          <el-button plain @click='add'>
            <font-awesome-icon :icon='["fas","plus"]'/>
            添加
          </el-button>
        </el-col>
      </el-row>
    </div><!-- search bar -->

    <el-table
      :data='data'
      @selection-change='selectionChange'
      stripe
      border
      style='width:100%'
      height='450'>

      <el-table-column
        type='selection'
        header-align='center'
        align='center'
        width='55'>
      </el-table-column>

      <el-table-column
        prop='account.username'
        label='账号'
        header-align='center'
        align='center'
        width='200'
        fixed='left'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='nickname'
        label='昵称'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='sex'
        label='性别'
        header-align='center'
        align='center'
        :formatter='sexFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='account.status'
        label='账户状态'
        header-align='center'
        align='center'
        :formatter='accountStatusFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        fixed='right'
        label='操作'
        header-align='center'
        align='center'
        width='250'>
        <template slot-scope='scope'>
          <el-button size='small' type='text' @click='edit(scope.row.accountId)'>[用户详情]</el-button>
        </template>
      </el-table-column><!-- column -->
    </el-table><!-- table -->

    <el-pagination
      :page-sizes='[10, 20, 50, 100, 500]'
      :page-size='pageSize'
      :current-page='pageNum'
      :total='total'
      @current-change='currentChange'
      @size-change='sizeChange'
      layout='total, sizes, prev, pager, next'>
    </el-pagination><!-- pagination -->
  </div>
</template>

<script>
  import {get, put} from '../utils/utils'
  import {
    AccountStatusSelect,
    SexSelect,
    SalesPageList,
    SalesUpdateStatus,
  } from '../utils/api'

  export default{
    name: 'Sales',

    methods: {
      //查询
      getSales: function(){
        var params = {
          pageNum  : this.pageNum,
          pageSize : this.pageSize,
          username : this.username,
          nickname : this.nickname,
          status   : this.status,
        }

        get(SalesPageList, params).then(response => {
          var data = response.data;

          if(data.success){
            this.data  = data.result.content;
            this.total = data.result.total;
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
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
            this.sex = data.result;
          }else{
            this.$message.error(response.msg);
            console.log(data.msg);
          }
        });
      },
      //重置
      reset: function(){
        this.username = '';
        this.nickname = '';
        this.status   = '';
        this.pageNum  = 1;

        this.getSales();
      },
      //查询
      search: function(){
        this.pageNum = 1;

        this.getSales();
      },
      //刷新
      refresh: function(){
        this.getSales();
      },
      //添加
      add: function(){
        this.$router.push('/sales/add');
      },
      //编辑
      edit: function(accountId){
        this.$router.push('/sales/' + accountId);
      },
      //分页
      currentChange: function(currentPage){
        if(this.pageNum !== currentPage){
          this.pageNum = currentPage;
          //查询数据
          this.getSales();
        }
      },
      sizeChange: function(currentSize){
        if(this.pageSize !== currentSize){
          this.pageSize = currentSize;
          this.pageNum  = 1;
          //查询数据
          this.getSales();
        }
      },
      //选择
      selectionChange: function(selection){
        this.selection = selection;
      },
      //格式化
      accountStatusFormatter: function(row, column){
        var status = row['account']['status'];

        if(status === undefined){
          return '';
        }else{
          return this.accountStatus[status];
        }
      },
      sexFormatter: function(row, column){
        var sex = row[column.property];

        if(status === undefined){
          return '';
        }else{
          return this.sex[sex];
        }
      },
    },

    data(){
      return{
        //搜索框
        username : '',
        nickname : '',
        status   : '',
        //下拉
        accountStatus : {},
        sex           : {},
        //列表数据
        data     : [],
        //分页
        pageNum  : 1,
        pageSize : 10,
        total    : 0,
        //选择
        selection : [],
      }
    },

    created: function(){
      //初始化数据
      this.getAccountStatus();
      this.getSex();
      this.getSales();
    },
  }
</script>

