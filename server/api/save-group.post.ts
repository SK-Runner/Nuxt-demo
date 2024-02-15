import { z } from 'zod'
import pool from '../utils/mysql'

const groupSchema = z.object({
  name: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = groupSchema.safeParse(body)

  if (!result.success) {
    return generateResult(0, null, '必须输入分组名称')
  }
  
  try {
    await pool.execute('INSERT INTO `group` (`group_name`) VALUES (?)', [body.name])
    return generateResult(1, null, '分组创建成功')
  } catch (err) {
    return generateResult(0, null, '分组创建失败，请检查名称长度是否超过255个字')
  }
})