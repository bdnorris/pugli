export default () => {
  
  console.log("Hello World!");

  // testing arrow functions
  document.querySelector('h1').addEventListener('click', (e) => {
    e.currentTarget.style.color = (e.currentTarget.style.color === 'red') ? 'black' : 'red';
  })

  // testing polyfills with NodeList forEach
  document.querySelectorAll('h2').forEach((d) => {
    console.log(d.innerText);
  })
}