import { useMovie } from "hooks/useMovie";
import Image from "next/image";
import type { IMovie } from "types/movie";
import FavoriteHeart from "../../public/assets/icons/favorite-heart.svg";
import RatingStar from "../../public/assets/icons/rating-star.svg";

interface MovieCardProps extends IMovie {}

export const MovieCard = (props: MovieCardProps): JSX.Element => {
  const { favoriteMovie } = useMovie();

  return (
    <div className="bg-c-blue-800 flex px-10 py-7 rounded-lg shadow-card justify-between max-laptop-m:flex-col gap-6">
      <div className="flex max-laptop-m:justify-evenly max-tablet-m:flex-col gap-6">
        <div className="flex items-center max-tablet-m:justify-center">
          <a
            href={`https://www.themoviedb.org/movie/${props.id}`}
            rel="external noreferrer"
            target="_blank"
            title="Ir para o perfil do filme"
            className="text-white transition-colors mr-16 max-tablet-m:mr-0"
          >
            <Image
              src={props.image}
              alt="Movie image"
              width={160}
              height={160}
              className="shadow-image rounded-full h-40 object-cover hover:translate-y-1 transition-transform"
            />
          </a>
        </div>
        <div className="flex flex-col justify-center gap-6 w-[260px] text-lg text-white max-tablet-m:w-full max-tablet-m:text-center">
          <a
            href={`https://www.themoviedb.org/movie/${props.id}`}
            rel="external noreferrer"
            target="_blank"
            title="Ir para o perfil do filme"
            className="hover:text-zinc-400 transition-colors"
          >
            {props.name} ({props.year})
          </a>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <RatingStar />
              <span>{props.rating}</span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => favoriteMovie(props)}
                className="flex"
              >
                <FavoriteHeart
                  className={props.favorite ? "fill-c-red-700" : ""}
                />
              </button>
              <label
                title="Favoritar filme"
                onClick={() => favoriteMovie(props)}
                className="cursor-pointer hover:text-zinc-400"
              >
                Favoritar
              </label>
            </div>
          </div>
        </div>
      </div>
      <p className="text-c-gray-400 font-medium leading-8 w-[592px] flex items-center max-laptop-m:w-full">
        {props.description}
      </p>
    </div>
  );
};
