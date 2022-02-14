// const fecthOptions = require('.fecthOptions/fecthOptions')

const fecthOptions = async (search) => {
  const url = `https://www.dnd5eapi.co/api/${search}`; 
  const response = await fetch(url); 
  const data = await response.json(); 
  // console.log(data);

  return data; 
}

// create different input options from api 
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

// add skills you get when you choose your class. \/
const skillsYouGet = async () => {
  // get class's skills 
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`;
  const getProficiencies = (await fecthOptions(url)).proficiencies;

  // description
  const createWhatUGet = document.querySelector('#proficiencies-uget');
  createWhatUGet.innerText = 'Class skills you get:'; 

  // create skills you get 
  getProficiencies.forEach((proficiency) => {
    // console.log(proficiency);
    const createProficiency = document.createElement('li');
    createProficiency.innerText = proficiency.name;
    createWhatUGet.appendChild(createProficiency);
  })
};

// add equipments you get by class 
const equipmentsYouGet = async () => {
  // get class's equipmets
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`;
  const getEquipments = (await fecthOptions(url)).starting_equipment;

  // description
  const createWhatUGet = document.querySelector('#equipments-uget');
  createWhatUGet.innerText = 'Starting equipment:'; 

  // creates equipments you get 
  getEquipments.forEach((equipment) => {
    // console.log(equipment.equipment.name);
    const createEquipment = document.createElement('li');
    createEquipment.innerText = equipment.equipment.name; 
    createWhatUGet.appendChild(createEquipment); 
  })
};

// get description of the ability you use to make spells
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
  // get class's spells list 
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}/spells`;
  const spellsList = (await fecthOptions(url)).results;
  // console.log(spellsList);

  // clear spells 
  const insideSpells = document.querySelector('#spellOptions');
  insideSpells.display = 'flex';
  insideSpells.innerHTML = ''; 

  // description 
  const createP = document.createElement('p');
  createP.innerText = 'Choose your spells:'
  insideSpells.appendChild(createP);

  // create spells options
  spellsList.forEach((spell) => {
    // console.log(spell);

    // option label
    const createLabel = document.createElement('label'); 
    createLabel.for = spell.index;
    createLabel.innerText = spell.name;
    insideSpells.appendChild(createLabel);

    // option input
    const createInput = document.createElement('input'); 
    createInput.type = 'checkbox'; 
    createInput.name = 'spells';
    createInput.id = spell.index;
    createLabel.appendChild(createInput);
  })
};

const spellsYouGet = async () => {
  // get class
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`;
  const classInfo = await fecthOptions(url);

  // get spell section
  const divSpells = document.querySelector('#spellCasting'); 
  divSpells.display = 'flex';

  // clear spell section 
  const spellAbility = document.querySelector('#spellAbility'); 
  spellAbility.innerHTML = '';
  const levelAbility = document.querySelector('#levelAbility'); 
  levelAbility.innerHTML = ''; 
  const insideSpells = document.querySelector('#spellOptions');
  insideSpells.innerHTML = ''; 

  // verifies if the class selected casts spells 
  const getSpellCasting = classInfo.spellcasting ? classInfo.spellcasting : ''; 
  if (getSpellCasting !== '') {
    // describes ability to cast spells
    const ability = getSpellCasting.spellcasting_ability.index;
    const abilityDescription = await abilityInfo(ability)
    spellAbility.innerHTML = abilityDescription;

    // describes class ability level 1 
    const description = getSpellCasting.info[0].desc[0];
    levelAbility.innerHTML = description;

    // create spells options 
    const spellOptions = await spellsToChoose(); 
    // console.log(spellOptions);
    // console.log(getSpellCasting);
    // console.log(description);
  }
};


const chosenClass = document.querySelector('#classes'); 

// add subclasses by class 
const getSubclasses = async () => {
  // get class's subclasses 
  const chosenClass = document.querySelector('#classes').value;
  const subclassesOptions = document.querySelector('#subclasses');
  const url = `classes/${chosenClass}`
  const getSubclasses = (await fecthOptions(url)).subclasses;

  // clear previous options 
  subclassesOptions.innerHTML = '';
  
  // create subclass options
  getSubclasses.forEach((subclass) => {
    const createOption = document.createElement('option'); 
    createOption.innerText = subclass.name;
    subclassesOptions.appendChild(createOption);
    // console.log(subclass.name);
  });
};

// gets skill's description 
// const getSkillDescription = () => {
  // 
// }

// adds alert when you pass the limit number of skills to choose
const limitSkillChoices = (event) => {
  // get number of choices
  // const isItBard = ? : 
  const numberOfChoices = document.querySelector('#number-choices').innerText; 
  const limitNumber = numberOfChoices.split(' ')[1];

  // get checked skills 
  const skillsSelected = document.querySelectorAll('.skill-to-choose:checked'); 
  
  // console.log(skillsSelected);
  // console.log(limitNumber);

  // throws alert if passed the limit 
  if (skillsSelected.length > limitNumber) {
      alert(`You can choose maximum of ${limitNumber} skill${limitNumber > 1 ? 's' : ''}.`); 
      event.target.checked = false;
      // change opacity css on other options 
  }
}

// get skills options by chosen class
const skillsToChoose = async () => {
  // get class's skills
  const chosenClass = document.querySelector('#classes').value;
  const url = `classes/${chosenClass}`
  const getProficiencies = (await fecthOptions(url)).proficiency_choices;
  
  // clear previous options
  const equipmentOptions = document.querySelector('#proficiencies-choices');
  equipmentOptions.innerHTML = ''; 
  
  // get number of skills you can choose
  const numberOfChoices = getProficiencies[0].choose;
  
  // description 
  const createP = document.createElement('p');
  createP.id = 'number-choices';
  createP.innerText = `Choose ${numberOfChoices} class skills:`;
  equipmentOptions.appendChild(createP);
  
  // create skills options
  const proficienciesList = getProficiencies[0].from;

  proficienciesList.forEach((option) => {
    // console.log(option);

    // option label
    const createLabel = document.createElement('label'); 
    createLabel.for = option.index;
    const nameOption = option.name.split(':')[0] === 'Skill' ? option.name.split(':')[1] : option.name.split(':')[0];
    createLabel.innerText = nameOption;
    equipmentOptions.appendChild(createLabel);
    // console.log(nameOption);

    // option input
    const createInput = document.createElement('input'); 
    createInput.type = 'checkbox'; 
    createInput.name = 'skill';
    createInput.id = option.index;
    createInput.className = 'skill-to-choose';
    createInput.addEventListener('change', limitSkillChoices)
    createLabel.appendChild(createInput);
  });
  
  const skills = document.querySelector('#skill-choices');
  
  // if you chose to be a bard, you gotta choose what you play
  if(chosenClass === 'bard') {
    // console.log(getProficiencies[1])
    
    // create bard section
    const createBardSkills = document.createElement('div'); 
    createBardSkills.id = 'bard-skills'; 
    skills.appendChild(createBardSkills); 

    // description 
    const createPBard = document.createElement('p'); 
    createPBard.innerText = `Choose ${numberOfChoices} bard skills:`
    createBardSkills.appendChild(createPBard); 

    // create instrument options
    getProficiencies[1].from.forEach((option) => {
      // instrument label 
      const createLabel = document.createElement('label'); 
      createLabel.for = option.index;
      createLabel.innerText = option.name;
      createBardSkills.appendChild(createLabel);

      // instrument input
      const createInput = document.createElement('input'); 
      createInput.type = 'checkbox'; 
      createInput.name = 'bard-skill';
      createInput.id = option.index;
      createInput.addEventListener('change', limitSkillChoices); // not working yet 
      createLabel.appendChild(createInput);
    })
  };
  
  // if the class selected isn't bard, clear instrument options
  const bardSkills = document.querySelector('#bard-skills');
  
  if (chosenClass !== 'bard') {
    if (bardSkills) {
      skills.removeChild(bardSkills)
    };
  };
}


// add equipments by class - incomplete 
const equipmentsYouChoose = async () => {
  // clear equipments 
  const chosenClass = document.querySelector('#classes').value;
  const equipmentOptions = document.querySelector('#equipment-options');
  equipmentOptions.innerHTML = ''; 

  // create description
  const createP = document.createElement('p'); 
  createP.innerText = 'Choose your equipments:'
  equipmentOptions.appendChild(createP);

  // get data from api 
  const url = `classes/${chosenClass}`
  const getEquipments = (await fecthOptions(url)).starting_equipment_options;
  // console.log(getEquipments);
  
  // create choice select 
  getEquipments.forEach((choice, index) => {
    const createSelect = document.createElement('select'); 
    createSelect.id = `equipment${index + 1}`; 
    equipmentOptions.appendChild(createSelect);

    // create options for each select choice 
    choice.from.forEach((option) => {
      // helps me access the information on the api 

      const firstKeyOpt = Object.keys(option)[0];
      const firstKeyEqp = Object.keys(option[firstKeyOpt]);
      // console.log(option[firstKeyOpt]);
      // console.log(firstKeyEqp);

      // getting option name from different object formats on the api    
      const differentNameEqp = firstKeyEqp[2] === 'from' ? option[firstKeyOpt].from.equipment_category.name : 'oi';
      const otherNameEqp = firstKeyEqp[0] === 'equipment' ?  option[firstKeyOpt].equipment.name : differentNameEqp; 
      const nameEquiptment = option[firstKeyOpt].name ? option[firstKeyOpt].name : otherNameEqp; 
    
      // creating option
      const createOption = document.createElement('option'); 
      createOption.innerText = nameEquiptment;
      createSelect.appendChild(createOption);
    })
  })
}

const raceOptions = document.querySelector('#races');

const racesDescription = async () => {
  // get chosen race 
  const chosenRace = raceOptions.value;
  const url = `races/${chosenRace}`;
  const race = await fecthOptions(url)

  // get alignment description
  const alignments = document.querySelector('#alignments-info'); 
  alignments.innerText = race.alignment;

  // get age description
  const ageInfo = document.querySelector('#age-info'); 
  ageInfo.innerText = race.age;

  // get size description
  const sizeInfo = document.querySelector('#size-info'); 
  sizeInfo.innerText = race.size_description;

  // get language description
  const languageInfo = document.querySelector('#language-info');
  languageInfo.innerText = race.language_desc; 
  
  // get languages you speak
  const languages = race.languages.reduce((acc, curr) => {
    //console.log(curr);
    acc = `${acc} ${curr.name}.`
    return acc;
  }, '');

  const langYouSpeak = document.querySelector('#languages-uspeak');
  langYouSpeak.innerText = `Languages you speak: ${languages}`;

  // get speed 
  const speed = document.querySelector('#speed');
  speed.innerText = `Speed: ${race.speed}`
}

const traitsYouGet = async () => {
  // get chosen race
  const chosenRace = raceOptions.value;
  const url = `races/${chosenRace}`;
  const race = await fecthOptions(url)

  // description
  const yourTraits = document.querySelector('#traits');
  yourTraits.innerHTML = race.traits.length > 1 ? 'Traits you get:' : '';

  // create traits list 
  race.traits.forEach((trait) => {
    const createLi = document.createElement('li');
    createLi.innerText = trait.name; 
    yourTraits.appendChild(createLi);
  })
  // console.log(race.traits);
};

//console.log(getProficiencies); 

inputOptions('races');
raceOptions.addEventListener('change', racesDescription)
inputOptions('classes');
// inputOptions('subclasses');
chosenClass.addEventListener('change', getSubclasses);
inputOptions('alignments');
// inputOptions('equipment');
chosenClass.addEventListener('change', equipmentsYouGet);
chosenClass.addEventListener('change', equipmentsYouChoose);
// inputOptions('proficiencies');
chosenClass.addEventListener('change', skillsYouGet);
chosenClass.addEventListener('change', skillsToChoose);
// chosenClass.addEventListener('change', limitSkillChoices);
// inputOptions('skills');
chosenClass.addEventListener('change', spellsYouGet);

raceOptions.addEventListener('change', traitsYouGet);


// get skills description when u select one 
// limit number of skill choices - still gotta limit bard skills tho 
// save everything on localStorage 
