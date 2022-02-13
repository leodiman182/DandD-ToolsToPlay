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
    // console.log(equipment.equipment.name);
    const createEquipment = document.createElement('li');
    createEquipment.innerText = equipment.equipment.name; 
    createWhatUGet.appendChild(createEquipment); 
  })
};

const abilityInfo = async (ability) => {
  const url = `ability-scores/${ability}`; 
  const data = await fecthOptions(url);
  const description = data.desc;
  // console.log(data.desc);

  const abilityDescription = description.join(' ');
  return abilityDescription;
};

// adds spells options to choose by class 
const spellsToChoose = async () => { 
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}/spells`;
  const spellsList = (await fecthOptions(url)).results;
  // console.log(spellsList);

  const insideSpells = document.querySelector('#spellOptions');
  insideSpells.innerHTML = ''; 

  spellsList.forEach((spell) => {
    // // label + checkbox 
    console.log(spell);
    const createLabel = document.createElement('label'); 
    createLabel.for = spell.index;
    createLabel.innerText = spell.name;
    insideSpells.appendChild(createLabel);


    const createInput = document.createElement('input'); 
    createInput.type = 'checkbox'; 
    createInput.name = 'spells';
    createInput.id = spell.index;
    createLabel.appendChild(createInput);

  })

};

const spellsYouGet = async () => {
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`;
  const classInfo = await fecthOptions(url);

  const spellAbility = document.querySelector('#spellAbility'); 
  spellAbility.innerHTML = '';
  const levelAbility = document.querySelector('#levelAbility'); 
  levelAbility.innerHTML = ''; 

  const getSpellCasting = classInfo.spellcasting ? classInfo.spellcasting : ''; 
  
  if (getSpellCasting !== '') {
    const ability = getSpellCasting.spellcasting_ability.index;
    const abilityDescription = await abilityInfo(ability)
    spellAbility.innerHTML = abilityDescription;

    const description = getSpellCasting.info[0].desc[0];
    levelAbility.innerHTML = description;

    const insideSpells = document.querySelector('#spellOptions');
    insideSpells.innerHTML = ''; 
    const test = await spellsToChoose(); 
    // console.log(test);
    // console.log(getSpellCasting);
    // console.log(description);
  }
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

// create proficiencies options to choose according to the class you've chosen
// it still needs to limit the number of choices tho 
const proficienciesToChoose = async () => {
  const equipmentOptions = document.querySelector('#proficiencies-choices');
  equipmentOptions.innerHTML = ''; 
  
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`
  const getProficiencies = (await fecthOptions(url)).proficiency_choices;
  const numberOfChoices = getProficiencies[0].choose;
  
  const createP = document.createElement('p');
  createP.id = 'number-choices';
  createP.innerText = `Choose ${numberOfChoices} proficiencies:`;
  equipmentOptions.appendChild(createP);
  
  const proficienciesList = getProficiencies[0].from;

  proficienciesList.forEach((option) => {
    // console.log(option);

    const createLabel = document.createElement('label'); 
    createLabel.for = option.index;
    const nameOption = option.name.split(':')[0] === 'Skill' ? option.name.split(':')[1] : option.name.split(':')[0];
    createLabel.innerText = nameOption;
    equipmentOptions.appendChild(createLabel);
    // console.log(nameOption);

    const createInput = document.createElement('input'); 
    createInput.type = 'checkbox'; 
    createInput.name = 'proficiency';
    createInput.id = option.index;
    createLabel.appendChild(createInput);
  });

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

const raceOptions = document.querySelector('#races');

const racesDescription = async () => {
  const chosenRace = raceOptions.value;
  const url = `races/${chosenRace}`;
  const race = await fecthOptions(url)

  const alignments = document.querySelector('#alignments-info'); 
  alignments.innerText = race.alignment;

  const ageInfo = document.querySelector('#age-info'); 
  ageInfo.innerText = race.age;

  const sizeInfo = document.querySelector('#size-info'); 
  sizeInfo.innerText = race.size_description;

  const languageInfo = document.querySelector('#language-info');
  languageInfo.innerText = race.language_desc; 
  
  const languages = race.languages.reduce((acc, curr) => {
    
    console.log(curr);
    acc = `${acc} ${curr.name}.`
    return acc;
  }, '');

  const langYouSpeak = document.querySelector('#languages-uspeak');
  langYouSpeak.innerText = languages;

  const speed = document.querySelector('#speed');
  speed.innerText = `Speed: ${race.speed}`

}



// const getProficiencies = (await fecthOptions(url)).proficiency_choices;
// esta birosca é um array com um obj dentro. mas n consigo acessar chamando [0], nem .key --- SOS

//console.log(getProficiencies); 

inputOptions('races');
raceOptions.addEventListener('change', racesDescription)
inputOptions('classes');
// inputOptions('subclasses');
chosenClass.addEventListener('change', getSubclasses);
inputOptions('alignments');
// inputOptions('equipment');
chosenClass.addEventListener('change', equipmentsYouGet);
chosenClass.addEventListener('change', getEquipementByClass);
// inputOptions('proficiencies');
chosenClass.addEventListener('change', proficienciesYouGet);
chosenClass.addEventListener('change', proficienciesToChoose);
inputOptions('skills');
chosenClass.addEventListener('change', spellsYouGet);
inputOptions('traits');

module.exports = fecthOptions;

// proficienciesYouGet();
