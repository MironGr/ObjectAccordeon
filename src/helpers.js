/* 
  функция по трансформации сиходного массива с элементами
  без потомков к массиву с элементами у которых есть потомки (свойство children)
*/
export function getFormattedArr(filtredArr) {
  const resultArr = []

  // id всех объектов у которых есть потомки
  const parentIdSet = new Set([...filtredArr.map(obj => obj.parentId)])
  const parentIdArr = Array.from(parentIdSet)

  // id всех объектов
  const allId = filtredArr.map(obj => obj.id)

  // проверка наличия id родителя в переданном массиве
  const parentIdArrOrigin = parentIdArr.filter(parentId => allId.includes(parentId))

  // массив объектов которые не являются родителями
  const childIdArr = filtredArr.filter(obj => !parentIdArrOrigin.includes(obj.id))

  // массив объектов у которых есть потомки
  const parents = filtredArr.filter(obj => parentIdArrOrigin.includes(obj.id))

  // все потомки, не являющиеся родителями, в итерации
  const allChildren = []
  
  // результирующий массив в итерации
  const resultArrTemp = [...parents.map(obj => {
    const finalChildren = childIdArr.filter(objChild => obj.id === objChild.parentId)
    allChildren.push(...finalChildren)
    if(finalChildren.length) {
      obj.children = finalChildren
      return obj
    }
  })]

  // массив без undefined
  resultArr.push(...resultArrTemp.filter(obj => !!obj))

  // вычитание из исходного массива всех потомком не имеющих своих потомков
  const nextArrNoChild = filtredArr.filter(obj => !allChildren.includes(obj))

  // подмена значений потомков имеющих своих потомков
  const nextArr = nextArrNoChild.map(obj => {
    const [filter] = resultArr.filter(result => result.id === obj.id)
    return filter ? filter : obj
  })

  
  
  // проверка наличия элементов с потомками
  if(parentIdArrOrigin.length > 1) {
    // рекурсия
    return getFormattedArr(nextArr)
  } else {
    // чистка объектов с parentId !== 0
    const nextArrDisplay = nextArr.filter(obj => obj.parentId === 0)
    return nextArrDisplay
  }
}