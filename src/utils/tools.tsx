import {IGame} from '../interface'
export const deepClone = (obj:any = {}, map = new Map()) => {
  if (typeof obj !== 'object') {
    return obj
  }
  if (map.get(obj)) {
    return map.get(obj)
  }
  let res:any = {}
  if (obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]') {
    res = []
  }
  map.set(obj, res)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key],map)
    }
  }
  return res
}

const getTime = (t: IGame): number => {
  // 数字太大排序失效，不能用时间戳
  let v = +t.release_date.split('-').join('')
  return v
}
export const quickSort = (arr:Array<IGame>):Array<IGame> => {
    if (arr.length < 2) return arr
    let pivot = arr[0] // 选择基准值
    let less:Array<IGame>=[],greater:Array<IGame> = []
    arr.forEach((item,index) => {
        if(index === 0) return
        if (getTime(item) <= getTime(pivot)) {
            less.push(item)
        }else {
            greater.push(item)
        }
    })
    return quickSort(less).concat([pivot], quickSort(greater))
}