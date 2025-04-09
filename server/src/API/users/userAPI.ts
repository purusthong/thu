import express, { Request, Response, Router } from "express";
import { User } from "./userSQL";

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
        this.router.get("/:id", async (req: Request, res: Response) => {
            try {
                const result = await User.getUser(req.params.id);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.put("/:id", async (req: Request, res: Response) => {
            try {
                const { tenDangNhap, matKhau, maQuyen } = req.body;
                const result = await User.updateUser(req.params.id, tenDangNhap, matKhau, maQuyen);
                res.json({ message: "Updated successfully", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.get("/password/:id", async (req: Request, res: Response) => {
            try {
                const result = await User.getPasswordById(Number(req.params.id));
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.get("/", async (req: Request, res: Response) => {
            try {
                const { tenDangNhap } = req.query;
                if (!tenDangNhap) {
                    res.status(400).json({ error: "Missing tenDangNhap" });
                }
                else {
                    const result = await User.findUserByUsername(tenDangNhap.toString());
                    res.json(result);
                }
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
    }
}
