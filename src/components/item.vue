<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='search-bar'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='商品编码'
            v-model='code'>

            <template slot='prepend'>商品编码</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='商品名称'
            v-model='name'>

            <template slot='prepend'>商品名称</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-input 
            placeholder='产品名称'
            v-model='productName'>

            <template slot='prepend'>产品名称</template>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='6'>
          <el-select 
            v-model='type' 
            placeholder='产品类型'
            :clearable='true'>

            <el-option
              v-for='(key, value) in productType'
              :key='value'
              :label='key'
              :value='value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->
      </el-row><!-- row -->

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

        <el-col :xs='24' :sm='24'>
          <el-button plain @click='exportTemplate'>
            <font-awesome-icon :icon='["fas","download"]'/>
            下载模板
          </el-button>

          <el-upload
            class='upload'
            :action='importItemTemplate'
            :multiple='false'
            :with-credentials='true'
            :show-file-list='false'
            :on-success='templateOnSuccess'
            accept='.xlsx'>

            <el-button plain>
              <font-awesome-icon :icon='["fas","file-import"]'/>
              导入模板
            </el-button>
          </el-upload>

          <el-button plain @click='updateIsCheckTrue'>
            <font-awesome-icon :icon='["fas","level-up-alt"]'/>
            商品上架
          </el-button>

          <el-button plain @click='updateIsCheckFalse'>
            <font-awesome-icon :icon='["fas","level-down-alt"]'/>
            商品下架
          </el-button>
        </el-col>
      </el-row><!-- button row -->
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
        prop='code'
        label='商品编码'
        header-align='center'
        align='center'
        width='200'
        fixed='left'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='product.number'
        label='产品编号'
        header-align='center'
        align='center'
        width='200'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='name'
        label='商品名称'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='product.name'
        label='产品名称'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='stock'
        label='库存'
        header-align='center'
        align='center'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='product.type'
        label='产品类型'
        header-align='center'
        align='center'
        :formatter='productTypeFormat'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='isCheck'
        label='是否上架'
        header-align='center'
        align='center'
        :formatter='boolFormat'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='createTime'
        label='导入时间'
        header-align='center'
        align='center'
        width='200'
        :formatter='dateFormat'>
      </el-table-column><!-- column -->

      <el-table-column
        fixed='right'
        label='操作'
        header-align='center'
        align='center'
        width='250'>
        <template slot-scope='scope'>
          <el-button size='small' type='text' @click='openStockDialog(scope.row.id, scope.row.stock)'>[修改库存]</el-button>
          <el-button size='small' type='text' @click='edit(scope.row.product.id)'>[产品信息]</el-button>
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

    <el-dialog 
      title='修改库存'
      width='300px'
      :close-on-click-modal='false'
      :visible.sync='stockDialog'
      :closed='closeStockDialog'>

      <el-form>
        <el-form-item>
          <el-input-number v-model='stock' label='库存'></el-input-number>
        </el-form-item>
      </el-form>

      <div slot='footer' class='dialog-footer'>
        <el-button @click='closeStockDialog'>取消</el-button>
        <el-button @click='updateStock'>确定</el-button>
      </div>
    </el-dialog><!-- stock dialog -->
  </div>
</template>

<script>
  import moment from 'moment'
  import {get, post, put}  from '../utils/utils'
  import {
    ProductTypeSelect,
    ItemPageList,
    ItemExportTemplate,
    ItemImportTemplate,
    ItemUpdateIsCheck,
    ItemUpdateStock,
  } from '../utils/api'

  export default{
    name: 'Item',

    methods: {
      //产品类型下拉数据
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
      //列表数据
      getItem: function(){
        var params = {
          pageNum     : this.pageNum,
          pageSize    : this.pageSize,
          code        : this.code,
          name        : this.name,
          productName : this.productName,
          type        : this.type,
        };

        get(ItemPageList, params).then(response => {
          var data = response.data;

          if(data.success){
            this.data  = data.result.content;
            this.total = data.result.total;
          }else{
            this.$message.error(response.msg);
          }
        });
      },
      //格式化时间
      dateFormat: function(row, column){
        var date = row[column.property];

        if(date === undefined){
          return '';

        }else{
          return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      //bool格式化
      boolFormat: function(row, column){
        var bool = row[column.property];

        if(bool === undefined){
          return '';
        }else{
          return bool ? '是' : '否';
        }
      },
      //产品类型格式化
      productTypeFormat: function(row, column){
        var type = row['product']['type'];

        if(type === undefined){
          return '';
        }else{
          return this.productType[type];
        }
      },
      //重置
      reset: function(){
        this.code        = '';
        this.name        = '';
        this.productName = '';
        this.type        = '';
        this.pageNum     = 1;

        this.getItem();
      },
      //查询
      search: function(){
        this.pageNum = 1;

        this.getItem();
      },
      //刷新
      refresh: function(){
        this.getItem();
      },
      //编辑
      edit: function(id){
        this.$router.push('/product/' + id);
      },
      //上下架
      updateIsCheckTrue: function(){
        if(this.selection === undefined || this.selection.length < 1){
          this.$message.warning('请选择需要上架的商品');
          return;
        }

        var ids = [];
        this.selection.forEach(element => {
          if(element.id !== undefined || element.id !== null){
            ids.push(element.id);
          }
        });

        put(ItemUpdateIsCheck, {isCheck : true}, JSON.stringify(ids),).then(response => {
          var data = response.data;

          if(data.success){
            this.$message.success(data.msg);
            this.reset();
          }else{
            this.$message.error(response.msg);
          }
        });
      },
      updateIsCheckFalse: function(){
        if(this.selection === undefined || this.selection.length < 1){
          this.$message.warning('请选择需要上架的商品');
          return;
        }

        var ids = [];
        this.selection.forEach(element => {
          if(element.id !== undefined || element.id !== null){
            ids.push(element.id);
          }
        });

        put(ItemUpdateIsCheck, {isCheck : false}, JSON.stringify(ids),).then(response => {
          var data = response.data;

          if(data.success){
            this.$message.success(data.msg);
            this.reset();
          }else{
            this.$message.error(response.msg);
          }
        });
      },
      //修改库存
      updateStock: function(){
        if(this.stockId === undefined || this.stockId === null){
           this.$message.warning('请选择需要修改的商品');
           return;
        }

        var params = {
          id    : this.stockId,
          stock : this.stock,
        };

        put(ItemUpdateStock, params).then(response => {
          var data = response.data;

          if(data.success){
            this.$message.success(data.msg);
            this.closeStockDialog();
            this.refresh();
          }else{
            this.$message.error(data.msg);
            console.log(data.msg);
          }
        });
      },
      //下载模板
      exportTemplate: function(){
        window.open(ItemExportTemplate, '_blank');
      },
      //分页
      currentChange: function(currentPage){
        if(this.pageNum !== currentPage){
          this.pageNum = currentPage;
          //查询数据
          this.getItem();
        }
      },
      sizeChange: function(currentSize){
        if(this.pageSize !== currentSize){
          this.pageSize = currentSize;
          this.pageNum  = 1;
          //查询数据
          this.getItem();
        }
      },
      //选择回调
      selectionChange: function(selection){
        this.selection = selection;
      },
      //模板上传回调
      templateOnSuccess: function(response, file, fileList){
        if(response.success){
          this.$message.success(response.msg);
          this.reset();
        }else{
          this.$message.error(response.msg);
        }
      },
      templateOnError: function(error, file, fileList){
          this.$message.error('服务器出错');
          console.log(error);
      },
      //打开库存弹窗
      openStockDialog: function(id, stock){
        if(id === undefined || id === null){
          this.$message.warning('请选择需要修改的商品');
          return;
        }

        this.stock       = stock;
        this.stockId     = id;
        this.stockDialog = true;
      },
      closeStockDialog: function(){
        this.stock       = 0;
        this.stockId     = '';
        this.stockDialog = false;
      },
    },

    data(){
      return{
        //列表数据
        data : [],
        //下拉
        productType : {},
        //分页
        pageNum  : 1,
        pageSize : 10,
        total    : 0,
        //选择
        selection : [],
        //输入框
        code        : '',
        name        : '',
        productName : '',
        type        : '',
        stock       : 0,
        stockId     : '',
        //api
        importItemTemplate : ItemImportTemplate,
        //弹窗
        stockDialog : false,
      }
    },
    
    created: function(){
      //初始化数据
      this.getProductType();
      this.getItem();
    },
  } 
</script>
