function A(a) {
  A = function (b) {
    console.log("内层A方法")
    console.log("b: "+b)
    console.log(a + b++)
  }
  console.log("外层A方法")
  console.log(a++)
  console.log("a: "+a)
}
A(1)
console.log("-----------------------------")
A(2)
