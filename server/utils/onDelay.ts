export default async function onDelay (cb: Function) {
  const time = Math.round(Math.random() * 3 * 1000)
  await new Promise(resolve => setTimeout(resolve, time)).then(() => {
    return cb()
  })
}
