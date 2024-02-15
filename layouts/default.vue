<template>
  <div id="defaultLayout" class="w-full h-[100vh]">
    <el-container class="h-full">
      <el-header class="border-b-2 box-border">
        <app-header></app-header>
      </el-header>
      <el-main class="!p-0">
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped>
</style>