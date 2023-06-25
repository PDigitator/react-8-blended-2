export const MoviesGallary = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ id, title, vote_count }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {vote_count}</p>
          </li>
        );
      })}
    </ul>
  );
};
