export const Modal = ({ closeModal, currentImage }) => {
  return (
    <div>
      <div>
        <button type="button" onClick={closeModal}>
          Close
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${currentImage.src}`}
          alt={currentImage.title}
        />
      </div>
    </div>
  );
};
