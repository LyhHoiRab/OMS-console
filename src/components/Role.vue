<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='search-bar'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='角色名'
            v-model='name'>

            <template slot='prepend'>角色名</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='isSystem' 
            placeholder='角色类型'
            :clearable='true'>

            <el-option
              v-for='(key, value) in system'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='status' 
            placeholder='可用状态'
            :clearable='true'>

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
        prop='name'
        label='角色名'
        header-align='center'
        align='center'
        width='200'
        fixed='left'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='isSystem'
        label='是否系统角色'
        header-align='center'
        align='center'
        :formatter='booleanFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='status'
        label='可用状态'
        header-align='center'
        align='center'
        :formatter='usingStatusFormatter'>
      </el-table-column><!-- column -->

      <el-table-column
        fixed='right'
        label='操作'
        header-align='center'
        align='center'
        width='250'>
        <template slot-scope='scope'>
          <el-button size='small' type='text' @click='edit(scope.row.id)'>[角色详情]</el-button>
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
  import {get} from '../utils/utils'
  import {
    UsingStateSelect,
    RolePageList,
  } from '../utils/api'

  export default{
    name: 'Role',

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
      usingStatusFormatter: function(row, column){
        var status = row[column.property];

        if(status === undefined){
          return '';
        }else{
          return this.usingStatus[status];
        }
      },
      //查询
      getRole: function(){
        var params = {
          pageNum  : this.pageNum,
          pageSize : this.pageSize,
          name     : this.name,
          isSystem : this.isSystem,
          status   : this.status,
        }

        get(RolePageList, params).then(response => {
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
      //重置
      reset: function(){
        this.name     = '';
        this.isSystem = '';
        this.status   = '';
        this.pageNum  = 1;

        this.getRole();
      },
      //查询
      search: function(){
        this.pageNum = 1;

        this.getRole();
      },
      //刷新
      refresh: function(){
        this.getRole();
      },
      //添加
      add: function(){
        this.$router.push('/role/add');
      },
      //编辑
      edit: function(accountId){
        this.$router.push('/role/' + id);
      },
      //分页
      currentChange: function(currentPage){
        if(this.pageNum !== currentPage){
          this.pageNum = currentPage;
          //查询数据
          this.getRole();
        }
      },
      sizeChange: function(currentSize){
        if(this.pageSize !== currentSize){
          this.pageSize = currentSize;
          this.pageNum  = 1;
          //查询数据
          this.getRole();
        }
      },
    },

    data(){
      return{
        //数据
        data : [],
        //下拉
        usingStatus : {},
        system      : {
           true  : '系统角色',
           false : '普通角色',
        },
        //搜索框
        name     : '',
        status   : '',
        isSystem : '',
        //分页
        pageNum  : 1,
        pageSize : 10,
        total    : 0,
      }
    },

    created: function(){
      //初始化数据
      this.getUsingStatus();
      this.getRole();
    },
  }
</script>
