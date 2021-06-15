import { Application, Request, Response } from 'express';
import { MovieController } from '../controllers/movieController';
import { auth } from "../config/auth";

export class MovieRoutes {

    private movie_controller: MovieController = new MovieController();

    public route(app: Application) {
        
        app.post('/api/movie', [auth], (req: Request, res: Response) => {
            this.movie_controller.create_movie(req, res);
        });

        app.get('/api/movie/:name', [auth], (req: Request, res: Response) => {
            this.movie_controller.get_movie(req, res);
        });

        app.put('/api/movie/:id', [auth], (req: Request, res: Response) => {
            this.movie_controller.update_movie(req, res);
        });

        app.delete('/api/movie/:id', [auth], (req: Request, res: Response) => {
            this.movie_controller.delete_movie(req, res);
        });

    }
}