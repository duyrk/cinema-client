import ApiUtil from "@utils/AxiosInstance";

export const AuthServiceEndpoint ={
    getAllMovie: 'movie',
    addMovie: 'movie',
    deleteMovie : (movieId: string) => "movie/${movieId}"
}

export const MovieService = {
    getAllMovie: async () =>{ 
       return ApiUtil.get<IMovieResponse>(AuthServiceEndpoint.getAllMovie)
    },
    addMovie: async (body: IMovieRequest) =>{
        return ApiUtil.post<IMovieRequest>(AuthServiceEndpoint.addMovie, body)
    },
    deleteMovie:  async (movieId: string) =>{
        return ApiUtil.delete<IMovieResponse>(AuthServiceEndpoint.deleteMovie(movieId))
    }
}  as const