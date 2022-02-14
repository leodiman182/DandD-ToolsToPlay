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

const createSection = (data) => {
  const value = data.results.reduce((acc, curr) => {
    acc.push(curr.name);
    return acc;
  }, []);
  
  value.forEach((element) => {
    let section = document.createElement('section');
    let sectionFather = document.querySelector('.library-list-database');
    section.className = 'section-list';
    section.innerHTML = element;
    sectionFather.appendChild(section);
  });
}

const getApiAndAddPage = async (func) => {
  const url = getSelectedOption('select-search-database');
  const data = await fetchOptions(url);
  console.log(data);
  func(data);
}

window.onload = async () => {
    let button = document.querySelector('.btn-library-search');
    button.addEventListener('click', function(){ getApiAndAddPage(createSection) });
}