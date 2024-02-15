import { z } from 'zod'
import pool from '../utils/mysql'

const toDoSchema = z.object({
  name: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = toDoSchema.safeParse(body)

  if (!result.success) {
    return generateResult(0, null, '必须输入待办事项名称')
  }
  
  try {
    await pool.execute('INSERT INTO `to_do` (`describe`, `group_id`, `status`) VALUES (?, ?, ?)', [body.name, body.groupId, 0])
    return generateResult(1, null, '分组创建成功')
  } catch (err) {
    return generateResult(0, null, '代办事项创建失败，请检查名称长度是否超过255个字')
  }
})