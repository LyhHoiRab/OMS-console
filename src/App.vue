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

          <el-submenu index='2'>
            <template slot='title'>
              <font-awesome-icon :icon='["fas", "street-view"]'/>
              人员管理
            </template><!-- title -->  

            <el-menu-item-group>
              <el-menu-item index='/sales'>
                <font-awesome-icon :icon='["fas", "user"]'/>
                销售管理
              </el-menu-item>

              <el-menu-item index='/wechat'>
                <font-awesome-icon :icon='["fab", "weixin"]'/>
                微信号管理
              </el-menu-item>

              <el-menu-item index='/payment'>
                <font-awesome-icon :icon='["fab", "weixin"]'/>
                支付方式管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu><!-- submenu -->

          <el-submenu index='3'>
            <template slot='title'>
              <font-awesome-icon :icon='["fas", "street-view"]'/>
              系统管理
            </template><!-- title -->  

            <el-menu-item-group>
              <el-menu-item index='/role'>
                <font-awesome-icon :icon='["fas", "user"]'/>
                角色管理
              </el-menu-item>

              <el-menu-item index='/function'>
                <font-awesome-icon :icon='["fas", "user"]'/>
                权限管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu><!-- submenu -->
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

