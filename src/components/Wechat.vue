<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>微信号管理</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='search-bar'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='微信号'
            v-model='wxno'>

            <template slot='prepend'>微信号</template>
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
          <el-input 
            placeholder='手机号码'
            v-model='phone'>

            <template slot='prepend'>手机号码</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='备注'
            v-model='remark'>

            <template slot='prepend'>备注</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='绑定销售'
            v-model='sales'>

            <template slot='prepend'>绑定销售</template>
          </el-input>
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
        prop='wxno'
        label='微信号'
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
        prop='sales.nickname'
        label='绑定销售'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='phone'
        label='手机号码'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='remark'
        label='备注'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='image'
        label='图片'
        header-align='center'
        align='center'>
        <template slot-scope='scope'>
          <img v-if='scope.row.image' :src='scope.row.image'>
        </template>
      </el-table-column><!-- column -->

      <el-table-column
        prop='qr'
        label='二维码'
        header-align='center'
        align='center'>
        <template slot-scope='scope'>
          <img v-if='scope.row.qr' :src='scope.row.qr'>
        </template>
      </el-table-column><!-- column -->

      <el-table-column
        fixed='right'
        label='操作'
        header-align='center'
        align='center'
        width='250'>
        <template slot-scope='scope'>
          <el-button size='small' type='text' @click='edit(scope.row.id)'>[产品信息]</el-button>
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
    WechatPageList,
  } from '../utils/api'

  export default {
    name: 'Wechat',
  
    methods: {
      //查询列表
      getWechat: function(){
        var params = {
          pageNum     : this.pageNum,
          pageSize    : this.pageSize,
          wxno        : this.wxno,
          nickname    : this.nickname,
          phone       : this.phone,
          remark      : this.remark,
          sales       : this.sales,
        }

        get(WechatPageList, params).then(response => {
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
        this.wxno     = '';
        this.nickname = '';
        this.phone    = '';
        this.remark   = '';
        this.sales    = '';
        this.pageNum  = 1;

        this.getWechat();
      },
      //查询
      search: function(){
        this.pageNum = 1;

        this.getWechat();
      },
      //刷新
      refresh: function(){
        this.getWechat();
      },
      //编辑
      edit: function(id){
        this.$router.push('/wechat/' + id);
      },
      //添加
      add: function(){
        this.$router.push('/wechat/add');
      },
      //分页
      currentChange: function(currentPage){
        if(this.pageNum !== currentPage){
          this.pageNum = currentPage;
          //查询数据
          this.getWechat();
        }
      },
      sizeChange: function(currentSize){
        if(this.pageSize !== currentSize){
          this.pageSize = currentSize;
          this.pageNum  = 1;
          //查询数据
          this.getWechat();
        }
      },
      //选择
      selectionChange: function(selection){
        this.selection = selection;
      },
    },
  
    data(){
        return{
          //搜索框
          wxno     : '',
          nickname : '',
          phone    : '',
          remark   : '',
          sales    : '',
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
      this.getWechat();
    },
  }
</script>

