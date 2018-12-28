import { open } from './base'
if (open) {
  document.body.innerHTML = `<h1>welcome</h1>`
} else {
  document.body.innerHTML = `<h1>close</h1>`
}
