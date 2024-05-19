const input = document.querySelector("input")
const signupBtn = document.querySelector("button")
let inputValue = ""

input.addEventListener("input", (e) => {
  console.log(e)
  input.value = e.target.value
  inputValue = e.target.value
})

console.log("si", input)

signupBtn.addEventListener('click', () => {
  console.log("fsdfsd")
  window.alert(`You successfully signed up for newsletter. Your email is ${inputValue}`)
})
