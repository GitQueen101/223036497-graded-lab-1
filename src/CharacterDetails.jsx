import React from 'react';

const CharacterDetails = ({ character, onBack }) => {
  //if no character is provided, nothing will be displayed
  if (!character) return null;

  return (
    <div>
      <h2>Character Details</h2>
      {/*displays the details of the character being selected/searched */}
      <p><strong>Name:</strong> {character.name}</p>
      <p><strong>DOB:</strong> {character.DOB}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Birth Date:</strong> {character.dateOfBirth}</p>
    </div>
  );
};

export default CharacterDetails;
