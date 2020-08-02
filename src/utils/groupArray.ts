export function groupArray(arrayA: string[], arrayB: string[]): string[][] {
  const listA = arrayA.slice()
  const listB = arrayB.slice()

  const groupAmount = Math.floor(listA.length / listB.length)

  return listB.reduce((accu, current) => {
    let group = [current]
    if (listA.length < groupAmount * 2) {
      group = [...group, ...listA]
    } else {
      group = [...group, ...listA.splice(0, groupAmount)]
    }
    return [...accu, group]
  }, [] as string[][])
}
