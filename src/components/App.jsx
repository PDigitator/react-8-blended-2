import { Component } from 'react';

import { Button } from './Button/Button';
import { fetchMovies } from 'servises/moviesApi';
import { MoviesGallary } from './MoviesGallary/MoviesGallary';

class App extends Component {
  state = {
    isMoviesShown: false,
    isLoading: false,
    movies: [],
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { isMoviesShown, page } = this.state;

    if (
      (prevState.isMoviesShown !== isMoviesShown || prevState.page !== page) &&
      isMoviesShown
    ) {
      this.setState({ isLoading: true });

      fetchMovies(page)
        .then(({ data: { results } }) => {
          this.setState(prevState => ({
            movies: [...prevState.movies, ...results],
          }));
        })
        .catch(err => {
          console.log('ERROR', err);
        })
        .finally(() => {
          this.setState({ isLoading: true });
        });
    }

    if (prevState.isMoviesShown !== isMoviesShown && !isMoviesShown) {
      this.setState({ movies: [], page: 1 });
    }
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      isMoviesShown: !prevState.isMoviesShown,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isMoviesShown, movies } = this.state;

    return (
      <>
        <Button
          text={isMoviesShown ? 'Hide movies list' : 'Show movies list'}
          clickHandler={this.toggleVisibility}
        />
        {isMoviesShown && (
          <>
            <MoviesGallary movies={movies} />
            <Button text="Load more" clickHandler={this.loadMore} />
          </>
        )}
      </>
    );
  }
}

export default App;
