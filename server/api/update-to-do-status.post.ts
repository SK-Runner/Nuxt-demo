import { z } from 'zod'
import pool from '../utils/mysql'

const bodyScheme = z.object({
  status: z.number(),
  id: z.number(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  body.id = parseInt(body.id as string)
  console.log(body);
  
  const validateResult = bodyScheme.safeParse(body)

  if (!validateResult.success) {
    return generateResult(0, null, '服务异常')
  }

  try {
    await pool.execute('UPDATE `to_do` SET `status` = ? WHERE `id` = ?', [body.status, body.id])
    return generateResult(1, null, '状态更新成功')
  } catch (error) {
    return generateResult(0, null, '修改异常')
  }
})