import { FilterField } from "components/FilterField";
import { Header } from "components/Header";
import { MovieList } from "components/MovieList";
import { SearchField } from "components/SearchField";
import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setApiKey, setFavoriteMovies } from "redux/movie/actions";
import type { IMovie } from "types/movie";
import { useLocalStorage } from "usehooks-ts";

interface HomeProps {
  apiKey: string;
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      apiKey: String(process.env.API_KEY),
    },
  };
};

const Home: NextPage<HomeProps> = ({ apiKey }): JSX.Element => {
  const dispatch = useDispatch();
  const [storageMovies] = useLocalStorage<IMovie[]>("favorite_movies", []);

  useEffect(() => {
    dispatch(setApiKey(apiKey));
    dispatch(setFavoriteMovies(storageMovies));
  }, []);

  return (
    <div className="bg-c-blue-900 min-h-screen font-kumbh-sans">
      <Header />
      <SearchField />
      <FilterField />
      <MovieList />
    </div>
  );
};

export default Home;
