import { z } from 'zod'
import pool from '../utils/mysql'

const thingSchema = z.object({
  groupId: z.number(),
})

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  params.groupId = parseInt(params.groupId as string)
  const validateResult = thingSchema.safeParse(params)
  console.log(params);
  
  if (!validateResult.success) {
    return generateResult(0, [], '分组ID为空')
  }

  const [result] = await pool.query('SELECT * FROM sys.to_do WHERE group_id = ?', [params.groupId])

  return generateResult(1, result)
})
