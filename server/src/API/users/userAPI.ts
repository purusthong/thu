import express, { Request, Response, Router } from "express";

export class UserAPI {
    private router: Router;
    constructor() {
        this.router = express.Router();
        this.init();
    }

    get Router(): Router {
        return this.router;
    }

    private init() {
        this.router.get("/", (req: Request, res: Response) => {
            const idUser = req.body.id;
            
        })

    }
}