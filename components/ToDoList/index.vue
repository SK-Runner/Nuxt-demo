<template>
  <div class="h-full w-full relative px-[5px]">
    <ClientOnly>
      <el-checkbox
        v-for="item in todolist"
        :key="item.id" vb
        :checked="Boolean(item.status)"
        :label="item.describe"
        class="!block leading-[32px]"
        @change="handleCheck(item)"
      />
    </ClientOnly>

    <el-icon class="!fixed !text-[36px] right-2 bottom-2 cursor-pointer" @click="showAddToDo = true">
      <CirclePlusFilled />
    </el-icon>
  </div>

  <el-dialog
    v-model="showAddToDo"
    title="添加事项"
    width="500"
  >
  <el-form :model="form" label-width="120px">
    <el-form-item label="write the thing">
      <el-input v-model="form.toDoName" />
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showAddToDo = false">Cancel</el-button>
        <el-button type="primary" @click="addToDo">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
type toDoType = {
  id: number,
  describe: string,
  status: number,
  groupId: number
}
const todolist = reactive<toDoType[]>([])

const toDoStore = useToDoStore()
watch(
  () => toDoStore.groupId,
  async (newVal) => {
    if (typeof newVal === 'number' && newVal > -1) {
      queryToDoList(newVal)
    }
  }
)

async function queryToDoList(groupId: number) {
  const result = await $fetch('/api/things-list', {
    method: 'get',
    params: {
      groupId
    }
  })
  if (result.code === 1 && result.data.length > 0) {
    todolist.splice(0, todolist.length, ...result.data)
  }

  console.log(todolist);
  
}

async function handleCheck(item: toDoType) {
  const result = await $fetch('/api/update-to-do-status', {
    method: 'POST',
    body: {
      id: item.id,
      status: item.status === 1 ? 0 : 1
    }
  })
  if (result.code === 0) {
    ElMessage.error(result.message)
    return;
  }
  item.status = item.status === 1 ? 0 : 1
}

const showAddToDo = ref(false)
const form = reactive({
  toDoName: ''
})

async function addToDo() {
  if (form.toDoName?.trim()?.length === 0) {
    return ElMessage.error('代办事项描述不能为空')
  }

  const result = await $fetch('/api/save-to-do', {
    method: 'post',
    body: {
      groupId: toDoStore.groupId,
      name: form.toDoName,
    }
  })

  if (result.code === 1) {
    ElMessage.success('添加成功')
    queryToDoList(toDoStore.groupId)
    showAddToDo.value = false;
    form.toDoName = ''
  } else {
    ElMessage.error(result.message || '添加失败')
  }
}
</script>
<style scoped>
</style>