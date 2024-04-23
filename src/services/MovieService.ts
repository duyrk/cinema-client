import ApiUtil from "@utils/AxiosInstance";

export const AuthServiceEndpoint ={
    getAllMovie: 'movie',
    addMovie: 'movie',
    getMovieById: (moviedId: string) => `movie/${moviedId}`,
    deleteMovie: (movieId: string) => `movie/${movieId}`,
    updateMovie: (movieId: string) => `movie/${movieId}`
}

export const MovieService = {
    getAllMovie: async () =>{ 
       return ApiUtil.get<IMovieResponse>(AuthServiceEndpoint.getAllMovie)
    },
    addMovie: async (body: IMovieRequest) =>{
        return ApiUtil.post<IMovieRequest>(AuthServiceEndpoint.addMovie, body)
    },
    getMovieById: async (movieId: string) =>{
        return ApiUtil.get<IGetMovieByIdResponse>(AuthServiceEndpoint.getMovieById(movieId))
    },
    deleteMovie: async (movieId: string) =>{
        return ApiUtil.delete<null>(AuthServiceEndpoint.deleteMovie(movieId))
    },
    updateMovie: async (movieId: string, body: IMovieRequest) => {
        return ApiUtil.put<null>(AuthServiceEndpoint.updateMovie(movieId), body)
    }
}  as const