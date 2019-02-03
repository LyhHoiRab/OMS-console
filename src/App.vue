<template>
  <div id='app'>
    <el-container>
      <el-aside width='200px'>
        <el-menu router>
          <el-submenu index='1'>
            <template slot='title'>
              <font-awesome-icon :icon='["fas", "warehouse"]'/>
              仓库管理
            </template><!-- title -->

            <el-menu-item-group>
              <el-menu-item index='/item'>
                <font-awesome-icon :icon='["fas", "box-open"]'/>
                产品管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu><!-- submenu -->

          <el-menu-item index='/'>
            <i class='el-icon-message'></i>
            导航二
          </el-menu-item>
        </el-menu>
      </el-aside><!-- aside -->

      <el-container>
        <el-header>
        
        </el-header><!-- header -->

        <el-main>
          <router-view/>
        </el-main><!-- content -->
      </el-container><!-- container -->
    </el-container>
  </div>
</template>

<script>
  export default{
    name: 'App',
  } 
</script>

<style>
  @import './assets/css/app.css';
</style>

