import { useState } from 'react';
import CharactersComponent from './CharactersComponent';
import CharacterDetails from './CharacterDetails';
import PhoneModelsComponent from './PhoneModelsComponent';
import './App.css';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="App">
      <h1>Harry Potter Characters</h1>
      <CharactersComponent onSelectCharacter={setSelectedCharacter} />
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onBack={() => setSelectedCharacter(null)}
        />
      )}
      <PhoneModelsComponent />
    </div>
  );
}

export default App;
