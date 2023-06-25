import { useState, useEffect } from 'react';

import { Button } from './Button/Button';
import { fetchMovies } from 'servises/moviesApi';
import { MoviesGallary } from './MoviesGallary/MoviesGallary';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const App = () => {
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (isMoviesShown) {
      setIsLoading(true);

      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prevMovies => [...prevMovies, ...results]);
        })
        .catch(err => {
          console.log('ERROR', err);
        })
        .finally(() => {
          setIsLoading(false);
        });

    }
    
    if (!isMoviesShown) {
      setMovies([]);
      setPage(1);
    }
  }, [page, isMoviesShown]);
  

  const toggleVisibility = () => {
   setIsMoviesShown(prevIsMoviesShow => !prevIsMoviesShow);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  const deleteMovies = (id) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  }

  const openModal = (data) => {
    setCurrentImage(data);
  }

  const closeModal = () => {
    setCurrentImage(null);
  }
    

    return (
      <>
        <Button
          text={isMoviesShown ? 'Hide movies list' : 'Show movies list'}
          clickHandler={toggleVisibility}
        />
        {isMoviesShown && (
          <>
            <MoviesGallary movies={movies} deleteMovies={deleteMovies} openModal={openModal} />
            <Button text="Load more" clickHandler={loadMore} />
            {isLoading && <Loader />}
          </>
        )}
        {currentImage && <Modal closeModal={closeModal} currentImage={currentImage} />}
      </>
    );

}

export default App;
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
