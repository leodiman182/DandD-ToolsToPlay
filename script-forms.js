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



inputOptions('races');
inputOptions('classes');
inputOptions('subclasses');
inputOptions('alignments');
inputOptions('equipment');
inputOptions('proficiencies');
inputOptions('skills');
inputOptions('traits');

// const btnSubmit = document.querySelector('#save');


// window.onload = { 
  
// }

