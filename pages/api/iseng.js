const now = new Date()
const regDate = now.toLocaleString("id-ID", {
  day: "2-digit",
})
const tail = regDate.toString() + now.getFullYear().toString()
console.log(tail)
