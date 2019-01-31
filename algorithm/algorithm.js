// ----------------------阶乘-------------------------
function factorialize (num) {
  // 请把你的代码写在这里
  if (num === 0) {
    return 1
  }
  var ele = 1
  for (let index = 1; index <= num; index++) {
    ele = index * ele
  }
  return ele
}
factorialize(5)

// 判断是否回文，去掉所有非字母数字后--------------------------
function palindrome (str) {
  // 请把你的代码写在这里
  var newStr = str.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  var reverStr = newStr.split('').reverse().join('')
  if (newStr === reverStr) {
    return true
  }

  return false
}
palindrome('eye')

// 找出最长单词------------------------
function findLongestWord (str) {
  // 请把你的代码写在这里
  var arrStr = str.split(' ')
  var lstr = 0
  for (let index = 0; index < arrStr.length; index++) {
    var currLen = arrStr[index].length
    if (currLen > lstr) {
      lstr = currLen
    }
  }
  return lstr
}

findLongestWord('The quick brown fox jumped over the lazy dog')
