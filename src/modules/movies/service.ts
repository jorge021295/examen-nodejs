import { IMovie } from './model';
import movie from './schema';

export default class UserService {
    
    public createMovie(user_params: IMovie, callback: any) {
        const _session = new movie(user_params);
        _session.save(callback);
    }

    public filterMovie(query: any, callback: any) {
        movie.findOne(query, callback);
    }

    public updateMovie(user_params: IMovie, callback: any) {
        const query = { _id: user_params._id };
        movie.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteMovie(_id: String, callback: any) {
        const query = { _id: _id };
        movie.deleteOne(query, callback);
    }

}