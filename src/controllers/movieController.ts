import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IMovie } from '../modules/movies/model';
import MovieService from '../modules/movies/service';
import e = require('express');

export class MovieController {

    private movie_service: MovieService = new MovieService();

    public create_movie(req: Request, res: Response) {
        if (req.body.name && req.body.classification ) {
            const movie_params: IMovie = {
                name: req.body.name,
                classification: req.body.classification
            };
            this.movie_service.createMovie(movie_params, (err: any, user_data: IMovie) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create movie successfull', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_movie(req: Request, res: Response) {
        if (req.params.id) {
            const movie_filter = { name: req.params.name };
            this.movie_service.filterMovie(movie_filter, (err: any, movie_data: IMovie) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get movie successfull', movie_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_movie(req: Request, res: Response) {
        if (req.params.id &&
            req.body.name ||
            req.body.classification) {
            const movie_filter = { _id: req.params.id };
            this.movie_service.filterMovie(movie_filter, (err: any, movie_data: IMovie) => {
                if (err) {
                    mongoError(err, res);
                } else if (movie_data) {
                    const movie_params: IMovie = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : movie_data.name,
                        classification: req.body.classification ? req.body.gender : movie_data.classification
                    };
                    this.movie_service.updateMovie(movie_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update movie successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid movie', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_movie(req: Request, res: Response) {
        if (req.params.id) {
            this.movie_service.deleteMovie(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete movie successfull', null, res);
                } else {
                    failureResponse('invalid movie', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}