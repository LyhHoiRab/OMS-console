<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb><!-- breadcrumb -->

    <div class='search-bar'>
      <el-row>
        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='商品编码'>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='产品编码'>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='商品名称'>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-input 
            placeholder='产品名称'>
          </el-input>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-date-picker
            unlink-panels
            type='daterange'
            range-separator='至'
            start-placeholder='开始日期'
            end-placeholder='结束日期'>
          </el-date-picker>
        </el-col><!-- item -->

        <el-col :xs='24' :md='12' :lg='8'>
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for='item in options'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </el-col><!-- item -->
      </el-row><!-- row -->

      <el-row>
        <el-col :xs='24' :sm='24'>
          <el-button plain>
            <font-awesome-icon :icon='["fas","redo"]'/>
            刷新
          </el-button>

          <el-button plain>
            <font-awesome-icon :icon='["fas","search"]'/>
            查询
          </el-button>

          <el-button plain>
            <font-awesome-icon :icon='["fas","times"]'/>
            重置
          </el-button>

          <el-button plain>
            <font-awesome-icon :icon='["fas","plus"]'/>
            添加
          </el-button>
        </el-col>

        <el-col :xs='24' :sm='24'>
          <el-button plain>
            <font-awesome-icon :icon='["fas","file-download"]'/>
            下载模板
          </el-button>

          <el-button plain>
            <font-awesome-icon :icon='["fas","file-import"]'/>
            导入模板
          </el-button>

          <el-button plain>
            <font-awesome-icon :icon='["fas","file-export"]'/>
            导出数据
          </el-button>
        </el-col>
      </el-row><!-- button row -->
    </div><!-- search bar -->

    <el-table
      :data='data'
      stripe
      border
      style='width:100%'
      height='450'
      empty-text='-'>

      <el-table-column
        prop='code'
        label='商品编码'
        header-align='center'
        align='center'
        width='200'
        fixed='left'>
      </el-table-column><!-- column -->

      <el-table-column
        prop='product.code'
        label='产品编码'
        header-align='center'
        align='center'>
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
        prop='createTime'
        label='导入时间'
        header-align='center'
        align='center'
        width='200'
        :formatter='dateFormat'>
      </el-table-column><!-- column -->
    </el-table><!-- table -->

    <el-pagination
      :page-sizes='[10, 20, 50, 100, 500]'
      :page-size='10'
      :total='data.length'
      layout='total, sizes, prev, pager, next'>
    </el-pagination><!-- pagination -->
  </div>
</template>

<script>
  import moment from 'moment'

  export default{
    name: 'Item',

    methods: {
      dateFormat: (row, column) => {
        const date = row[column.property];

        if(date === undefined){
          return '';

        }else{
          return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    },

    data(){
      return {
        data: [{
          code: '1',
          name: '商品1',
          createTime: new Date(),
          product: {
            code: '#1',
            name: '产品1',
          }
        },{
          code: '2',
          name: '商品2',
          createTime: new Date(),
          product: {
            code: '#2',
            name: '产品2',
          }
        }],

        options: [{
          value: '1',
          label: '1',
        },{
          value: '2',
          label: '2',
        },{
          value: '3',
          label: '3',
        }]
      }
    },
  } 
</script>

<style>
  @import '../assets/css/item.css';
</style>
