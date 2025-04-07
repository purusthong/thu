import express, { Request, Response, Router } from "express";

export class PostAPI {
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
            
        })
    }
}