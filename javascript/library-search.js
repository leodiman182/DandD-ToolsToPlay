const fetchOptions = async (search) => {
  const url = `https://www.dnd5eapi.co/api/${search}`; 
  const response = await fetch(url); 
  const data = await response.json();    
  
  return data; 
}

const getSelectedOption = (select) => {
  const selectOptions = document.getElementById(select); 
  const yourChoice = selectOptions.options[selectOptions.selectedIndex].innerText; 
  return yourChoice; 
}

const teste = async () => {
  const url = getSelectedOption('select-search-database');
  const data = await fetchOptions(url);
  console.log(data);
}

window.onload = async () => {
    let button = document.querySelector('.btn-library-search');
    button.addEventListener('click', teste);
}