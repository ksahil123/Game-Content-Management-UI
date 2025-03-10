import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CharacterModal from '../components/CharacterModal';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch characters from API
  useEffect(() => {
    const fetchCharacters = async () => {
      const token = localStorage.getItem('token');
      try {
        //I can add the variable in the API to create this logic
        // ?search=${search}
        const response = await axios.get(`https://localhost:7259/api/GameCharacter`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCharacters(response.data);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      }
    };

    fetchCharacters();
  }, [search]);

  // Handle character selection for viewing/editing
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleModalClose = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="characters-container">
      <h2>Game Characters</h2>
      <input 
        type="text" 
        placeholder="Search by name or description..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-input"
      />
      <div className="character-grid">
        {characters.map((char) => (
          <div key={char.id} className="character-tile" onClick={() => handleCharacterClick(char)}>
            <img src={char.imageUrl} alt={char.name} className="character-image" />
            <h4>{char.name}</h4>
            <p className={`rarity ${char.rarity.toLowerCase()}`}>{char.rarity}</p>
            <div className="stars">
              {'★'.repeat(char.upgradeLevel)}{'☆'.repeat(5 - char.upgradeLevel)}
            </div>
            <p>Sort Order: {char.sortOrder}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Characters;
