import ApiUtil from "@utils/AxiosInstance";

export const MovieServiceEndPoint ={
    getAllMovie: 'movie',
    addMovie: 'movie',
    getMovieById: (moviedId: string) => `movie/${moviedId}`,
    deleteMovie: (movieId: string) => `movie/${movieId}`,
    updateMovie: (movieId: string) => `movie/${movieId}`
}

export const MovieService = {
    getAllMovie: async () =>{ 
       return ApiUtil.get<IMovieResponse>(MovieServiceEndPoint.getAllMovie)
    },
    addMovie: async (body: IMovieRequest) =>{
        return ApiUtil.post<IMovieRequest>(MovieServiceEndPoint.addMovie, body)
    },
    getMovieById: async (movieId: string) =>{
        return ApiUtil.get<IGetMovieByIdResponse>(MovieServiceEndPoint.getMovieById(movieId))
    },
    deleteMovie: async (movieId: string) =>{
        return ApiUtil.delete<null>(MovieServiceEndPoint.deleteMovie(movieId))
    },
    updateMovie: async (movieId: string, body: IMovieRequest) => {
        return ApiUtil.put<null>(MovieServiceEndPoint.updateMovie(movieId), body)
    }
}  as const