const fecthOptions = async (search) => {
  const url = `https://www.dnd5eapi.co/api/${search}`; 
  const response = await fetch(url); 
  const data = await response.json(); 
  // console.log(data);

  return data; 
}

const inputOptions = async (opt) => {
  const options = (await fecthOptions(opt)).results;
  
  const insideSelect = document.querySelector(`#${opt}`); 

  options.forEach(async (race) => {
    const createOption = document.createElement('option'); 
    createOption.name = opt; 
    createOption.value = race.index; 
    createOption.innerText = race.name; 

    insideSelect.appendChild(createOption);
  })
}; 

// add proficiencies you get when you choose your class. \/
const proficienciesYouGet = async () => {
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`;
  const getProficiencies = (await fecthOptions(url)).proficiencies;

  const createWhatUGet = document.querySelector('#proficiencies-uget');
  createWhatUGet.innerText = 'Proficiencies you get:'; 

  getProficiencies.forEach((proficiency) => {
    // console.log(proficiency);
    const createProficiency = document.createElement('li');
    createProficiency.innerText = proficiency.name;
    createWhatUGet.appendChild(createProficiency);
  })
};

const equipmentsYouGet = async () => {
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`;
  const getEquipments = (await fecthOptions(url)).starting_equipment;

  const createWhatUGet = document.querySelector('#equipments-uget');
  createWhatUGet.innerText = 'Starting equipment:'; 

  getEquipments.forEach((equipment) => {
    console.log(equipment.equipment.name);
    const createEquipment = document.createElement('li');
    createEquipment.innerText = equipment.equipment.name; 
    createWhatUGet.appendChild(createEquipment); 
  })
};

const chosenClass = document.querySelector('#classes'); 

// add subclasses by class 
const getSubclasses = async () => {
  const chosenClass = document.querySelector('#classes').value;
  const subclassesOptions = document.querySelector('#subclasses');
  subclassesOptions.innerHTML = '';
  const url = `classes/${chosenClass}`
  const getSubclasses = (await fecthOptions(url)).subclasses;
  
  getSubclasses.forEach((subclass) => {
    const createOption = document.createElement('option'); 
    createOption.innerText = subclass.name;
    subclassesOptions.appendChild(createOption);
    // console.log(subclass.name);
  });
};


// delete selected created 
const removeChildren = (dad) => {
  
}



// add equipments by class - incomplete 
const getEquipementByClass = async () => {
  const chosenClass = document.querySelector('#classes').value;
  const equipmentOptions = document.querySelector('#equipment-options');
  equipmentOptions.innerHTML = ''; 

  const createP = document.createElement('p'); 
  createP.innerText = 'Choose your equipments:'
  equipmentOptions.appendChild(createP);
  const url = `classes/${chosenClass}`
  const getEquipments = (await fecthOptions(url)).starting_equipment_options;
  
  // console.log(getEquipments);
  getEquipments.forEach((choice, index) => {
    const createSelect = document.createElement('select'); 
    createSelect.id = `equipment${index + 1}`; 
    equipmentOptions.appendChild(createSelect);
     // console.log(choice);
    choice.from.forEach((option) => {
      const firstKeyOpt = Object.keys(option)[0];
      const firstKeyEqp = Object.keys(option[firstKeyOpt]);
      
      //console.log(option[firstKeyOpt]);
      // não to conseguindo acessar os nomes que estão em outro lugar \/ sos 
      // const otherNameEqpt = option[firstKeyOpt].equipment.name ? option[firstKeyOpt].equipment.name : option[firstKeyOpt].from.equipment_category.name  
      const nameEquiptment = option[firstKeyOpt].name ? option[firstKeyOpt].name : 'oi'   // otherNameEqpt; 
      //console.log(nameEquiptment);
      
      const createOption = document.createElement('option'); 
      createOption.innerText = nameEquiptment;
      createSelect.appendChild(createOption);
    })
    
    // console.log(choice.from);
  })
}



// const getProficiencies = (await fecthOptions(url)).proficiency_choices;
// esta birosca é um array com um obj dentro. mas n consigo acessar chamando [0], nem .key --- SOS

//console.log(getProficiencies); 

inputOptions('races');
inputOptions('classes');
// inputOptions('subclasses');
chosenClass.addEventListener('change', getSubclasses);
inputOptions('alignments');
// inputOptions('equipment');
chosenClass.addEventListener('change', equipmentsYouGet);
chosenClass.addEventListener('change', getEquipementByClass);
// inputOptions('proficiencies');
chosenClass.addEventListener('change', proficienciesYouGet);
inputOptions('skills');
inputOptions('traits');


// proficienciesYouGet();
