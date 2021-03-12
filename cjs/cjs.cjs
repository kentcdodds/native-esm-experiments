async function main() {
  const mjs = await import('./mjs.mjs')
  console.log(mjs.fn(1, 2))
}
main()
