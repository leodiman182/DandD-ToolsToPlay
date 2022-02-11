const fecthOptions = async (search) => {
  const url = `https://www.dnd5eapi.co/api/${search}`; 
  const response = await fetch(url); 
  const data = await response.json(); 
  // console.log(data);

  return data; 
}

const inputOptions = async (opt) => {
  const options = (await fecthOptions(opt)).results;
  
  const insideRaces = document.querySelector(`#${opt}`); 

  options.forEach(async (race) => {
    const createOption = document.createElement('option'); 
    createOption.name = opt; 
    createOption.value = race.index; 
    createOption.innerText = race.name; 

    insideRaces.appendChild(createOption);
  })
}; 

const proficienciesOptions = async () => {
  const choseClass = document.querySelector('#classes').value;
  console.log(choseClass); 

};

const choseClass = document.querySelector('#classes'); 
choseClass.addEventListener('change', proficienciesOptions)

inputOptions('races');
inputOptions('classes');
inputOptions('subclasses');
inputOptions('alignments');
inputOptions('equipment');
// inputOptions('proficiencies');
inputOptions('skills');
inputOptions('traits');


proficienciesOptions();
