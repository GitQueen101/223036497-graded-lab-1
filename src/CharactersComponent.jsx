import React, { useState, useEffect } from 'react';

const CharactersComponent = ({ onSelectCharacter }) => {
  // variables and their placeholders
  const [characters, setCharacters] = useState([]);
  const [filter, setFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [aliveFilter, setAliveFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  // using 'fetch' to Fetch the character's data from the API
  useEffect(() => {
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // this is to filter out characters based on what is being searched and selected
  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(filter.toLowerCase()) &&
    (genderFilter ? character.gender === genderFilter : true) &&
    (aliveFilter ? (aliveFilter === 'alive' ? character.alive : !character.alive) : true) &&
    (speciesFilter ? character.species === speciesFilter : true)
  );

  return (
    <div className="characters-container">
      <h2>Characters</h2>
      {/* user uses search bar to searcg characters by name */}
      <input 
        type="text" 
        placeholder="Search by name" 
        onChange={(e) => setFilter(e.target.value)} 
      />
      {/* this dropdown is for choosing the character gender */}
      <select onChange={(e) => setGenderFilter(e.target.value)}>
        <option value="">all genders</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      {/* this dropdown is for the deceased or alive status */}
      <select onChange={(e) => setAliveFilter(e.target.value)}>
        <option value="">all</option>
        <option value="alive">alive</option>
        <option value="deceased">deceased</option>
      </select>
      {/* this dropdown is for the species a character is (human/dog or whatever they are) */}
      <select onChange={(e) => setSpeciesFilter(e.target.value)}>
        <option value="">all species</option>
        {Array.from(new Set(characters.map(char => char.species)))
          .map((species, index) => (
            <option key={index} value={species}>{species}</option>
        ))}
      </select>

      {/* here a display of a list of the characters found after searching */}
      <ul className="characters-list">
        {filteredCharacters.map((character, index) => (
          <li key={index} onClick={() => onSelectCharacter(character)}>
            <p><strong>Name:</strong> {character.name}</p>
            <p><strong>DOB:</strong> {character.dateOfBirth || 'Unknown'}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Status:</strong> {character.alive ? 'Alive' : 'Deceased'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersComponent;
