<template>
  <div class="h-full pb-[5px] flex flex-col justify-between">
    <ul class="leading-[26px]">
      <template v-if="groupList.length">
        <li
          v-for="item in groupList"
          class="cursor-pointer"
          :class="active === item.id ? 'border-l-4 border-blue-700 pl-[2px]' : 'pl-[6px] box-border'"
          :key="item.id"
          @click="enter(item.id)"
          >
            {{ item.name }}
        </li>
      </template>
    </ul>
    <div class="cursor-pointer pl-[6px] flex items-center" @click="openAddGroup">
      <el-icon class="rotate-45 mr-1"><CloseBold /></el-icon>
      <span>Add group</span>
    </div>
  </div>

  <el-dialog
    v-model="showAddGroup"
    title="添加分组"
    width="500"
  >
  <el-form :model="form" label-width="120px">
    <el-form-item label="group name">
      <el-input v-model="form.groupName" />
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showAddGroup = false">Cancel</el-button>
        <el-button type="primary" @click="addGroup">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
type groupItem = {
  id: number,
  name: string,
}

const groupList = reactive<groupItem[]>([])
const toDoStore = useToDoStore()
const active = computed(() => toDoStore.groupId)

onMounted(async () => {
  queryGroup()
});

async function queryGroup() {
  const result: {
    code: number,
    data: groupItem[],
    message?: string,
  } = await $fetch('/api/group-list', {
    method: 'get',
  })
  if (result.code === 1 && result?.data?.length) {
    groupList.splice(0, groupList.length, ...result.data)
    toDoStore.groupId = result.data[0].id
  }
}

function enter(id: number) {
  toDoStore.groupId = id
}

function openAddGroup() {
  showAddGroup.value = true
}

const showAddGroup = ref(false)

const form = reactive({
  groupName: '',
})

async function addGroup() {
  if (form.groupName.trim().length === 0) {
    return ElMessage.error('分组名不能为空')
  }
  const result: {
    code: number,
    data: null,
    message?: string,
  } = await $fetch('/api/save-group', {
    method: 'post',
    body: {
      name: form.groupName,
    }
  })

  if (result.code === 1) {
    ElMessage.success('添加成功')
    queryGroup()
    showAddGroup.value = false;
    form.groupName = ''
  } else {
    ElMessage.error(result.message || '添加失败')
  }
}
</script>
<style scoped>
</style>