import express, { Request, Response, Router } from "express";
import { Post } from "./postSQL";

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
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                const result = await Post.getAllPost();
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.get("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Post.getPost(Number(req.params.id));
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.post("/", async (req: Request, res: Response) => {
            try {
                const result = await Post.createPost(req.body);
                res.status(201).json({ message: "Created", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.put("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Post.updatePost(Number(req.params.id), req.body);
                res.json({ message: "Updated", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.delete("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Post.deletePost(Number(req.params.id));
                res.json({ message: "Deleted", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
    }
}
