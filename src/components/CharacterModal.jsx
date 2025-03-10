import './CharacterModal.css';

const CharacterModal = ({ character, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>{character.name}</h3>
        <img src={character.imageUrl} alt={character.name} className="modal-image" />
        <p><strong>Description:</strong> {character.description}</p>
        <p><strong>Rarity:</strong> {character.rarity}</p>
        <p><strong>Upgrade Level:</strong> {'★'.repeat(character.upgradeLevel)}</p>
        <p><strong>Sort Order:</strong> {character.sortOrder}</p>
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default CharacterModal;
