import React from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBox";

export default function Movies() {
  const [movies, setMovies] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [genres, setGenres] = React.useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortedColumn, setSortedColumn] = React.useState({
    path: "title",
    order: "asc",
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre("");
    setCurrentPage(1);
  };
  const pageSize = 4;

  React.useEffect(() => {
    // async function fetchData() {
    //   const { data } = await getGenres();

    //   const genres = [...data];

    //   console.log(genres);
    // }

    // fetch("http://localhost:3900/api/genres")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    setGenres(getGenres());
    setMovies(getMovies());
  }, []);

  const { length: count } = movies;

  const handleDelete = (movie) => {
    const newMovies = movies.filter((x) => x._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = (movie) => {
    const likedMovies = [...movies];
    const index = likedMovies.indexOf(movie);
    likedMovies[index] = { ...likedMovies[index] };
    likedMovies[index].liked = !likedMovies[index].liked;
    setMovies(likedMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSort = (path) => {
    setSortedColumn({ path, order: sortedColumn.order });
  };

  const getPageData = () => {
    let filtered = movies;

    if (searchQuery)
      filtered = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    else if (selectedGenre === "allGenres") filtered = movies;

    const sorted = _.orderBy(
      filtered,
      [sortedColumn.path],
      [sortedColumn.order]
    );
    const paginatedMovies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: paginatedMovies };
  };

  if (count === 0) return <p>There are no movies in the database</p>;
  const { totalCount, data } = getPageData();
  return (
    <div>
      <Link
        to="/movies/new"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        New Movie
      </Link>

      <div className="row">
        <div className="col-1">
          <ListGroup
            items={genres}
            onItemSelect={handleSelectGenre}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col-4">
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <MoviesTable
            movies={data}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
            sortedColumn={sortedColumn}
          />
        </div>
      </div>
      <div>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
