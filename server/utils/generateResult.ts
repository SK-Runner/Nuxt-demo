export default function(
  code: number,
  data: unknown,
  message: string = ''
) {
  return {
    code,
    data,
    message
  }
};