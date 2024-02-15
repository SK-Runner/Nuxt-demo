<template>
  <div class="h-full">
    <el-container class="h-full">
      <el-aside width="200px" class="border-r-2 box-border">
        <GroupList></GroupList>
      </el-aside>
      <el-main>
        <ToDoList></ToDoList>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElMain } from 'element-plus';
</script>

<style lang="scss" scoped>
</style>