<template>
  <el-container>
    <el-aside width='200px'>
      <el-menu>
        <el-submenu>
          <template slot='title'>
            <i class='el-icon-message'></i>
            导航一
          </template><!-- title -->

          <el-menu-item-group>
            <el-menu-item>选项1</el-menu-item>
            <el-menu-item>选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu><!-- item -->

        <el-menu-item>
          <i class='el-icon-message'></i>
          导航二
        </el-menu-item><!-- item -->
      </el-menu>
    </el-aside><!-- aside -->

    <el-container>
      <el-header>

      </el-header><!-- header -->

      <el-main>
        <div id='app'>
        </div><!-- view -->
      </el-main><!-- content -->
    </el-container><!-- container -->
  </el-container>
</template>

<script>
  export default{
    name: 'Index'
  }
</script>