export default () => {
  
  console.log("Hello World!");

  document.querySelector('h1').addEventListener('click', (e) => {
    e.currentTarget.style.color = (e.currentTarget.style.color === 'red') ? 'black' : 'red';
  })
}