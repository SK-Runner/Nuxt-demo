import generateResult from '../utils/generateResult'
import pool from '../utils/mysql'

/**
 * query groupList by groupId
 */
export default defineEventHandler(async (event) => {
  const [result] = await pool.query('SELECT * FROM sys.group');
  console.log(result);
  if (result && result.length > 0) {
    let groupList = result.map((item) => ({
      id: item.id,
      name: item.group_name,
    }))
    return generateResult(1, groupList)
  }
  return generateResult(1, [])
})
