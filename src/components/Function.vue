<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='search-bar'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='API'
            v-model='api'>

            <template slot='prepend'>API</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='method' 
            placeholder='请求方式'
            :clearable='true'>

            <el-option
              v-for='(key, value) in methodSelect'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='allocatable' 
            placeholder='是否可分配'
            :clearable='true'>

            <el-option
              v-for='(key, value) in trueFalseSelect'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='granted' 
            placeholder='是否需要分配'
            :clearable='true'>

            <el-option
              v-for='(key, value) in trueFalseSelect'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='cookie' 
            placeholder='是否需要登录'
            :clearable='true'>

            <el-option
              v-for='(key, value) in trueFalseSelect'
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
        </el-col>
      </el-row>
    </div><!-- search bar -->

    <el-table
      :data='data'
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
        prop='description'
        label='描述'
        header-align='center'
        align='center'
        width='200'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='api'
        label='API'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='method'
        label='请求方式'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='allocatable'
        label='是否可分配'
        header-align='center'
        align='center'
        :formatter='booleanFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='granted'
        label='是否需要分配'
        header-align='center'
        align='center'
        :formatter='booleanFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='cookie'
        label='是否需要登录'
        header-align='center'
        align='center'
        :formatter='booleanFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        fixed='right'
        label='操作'
        header-align='center'
        align='center'
        width='250'>
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
  import {get} from '../utils/utils'
  import {
    FunctionPageList
  } from '../utils/api'

  export default{
    name: 'Function',

    methods: {
      //格式化
      booleanFormatter: function(row, column){
        var boolean = row[column.property];

        if(boolean === undefined){
          return '';
        }else{
          return boolean ? '是' : '否';
        }
      },
      //查询
      getFunction: function(){
        var params = {
          pageNum     : this.pageNum,
          pageSize    : this.pageSize,
          api         : this.api,
          method      : this.method,
          allocatable : this.allocatable,
          granted     : this.granted,
          cookie      : this.cookie,
        }

        get(FunctionPageList, params).then(response => {
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
      //重置
      reset: function(){
        this.pageNum     = 1;
        this.api         = '';
        this.method      = '',
        this.allocatable = '';
        this.granted     = '';
        this.cookie      = '';

        this.getFunction();
      },
      //查询
      search: function(){
        this.pageNum = 1;

        this.getFunction();
      },
      //刷新
      refresh: function(){
        this.getFunction();
      },
      //分页
      currentChange: function(currentPage){
        if(this.pageNum !== currentPage){
          this.pageNum = currentPage;
          //查询数据
          this.getFunction();
        }
      },
      sizeChange: function(currentSize){
        if(this.pageSize !== currentSize){
          this.pageSize = currentSize;
          this.pageNum  = 1;
          //查询数据
          this.getFunction();
        }
      },
    },

    data(){
      return{
        //数据
        data : [],
        //搜索框
        api         : '',
        method      : '',
        allocatable : '',
        granted     : '',
        cookie      : '',
        //分页
        pageNum  : 1,
        pageSize : 10,
        total    : 0,
        //下拉
        trueFalseSelect : {
          true  : '是',
          false : '否'
        },
        methodSelect    : {
          'GET'    : 'GET',
          'POST'   : 'POST',
          'PUT'    : 'PUT',
          'DELETE' : 'DELETE',
        },
      }
    },

    created: function(){
      //初始化数据
      this.getFunction();
    },
  }
</script>
