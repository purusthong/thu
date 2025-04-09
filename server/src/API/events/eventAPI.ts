import express, { Request, Response, Router } from "express";
import { DotHienMau } from "./eventSQL";

export class EventAPI {
    private router: Router;
    constructor() {
        this.router = express.Router();
        this.init();
    }

    get Router(): Router {
        return this.router;
    }

    private init() {
        this.router.get("/", async (_req: Request, res: Response) => {
            try {
                const result = await DotHienMau.getDanhSachDot();
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.post("/", async (req: Request, res: Response) => {
            try {
                const result = await DotHienMau.createDot(req.body);
                res.status(201).json({ message: "Created", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.get("/:id", async (req: Request, res: Response) => {
            try {
                const result = await DotHienMau.getChiTietDot(req.params.id);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.put("/:id/trang-thai", async (req: Request, res: Response) => {
            try {
                const { trangThai } = req.body;
                const result = await DotHienMau.updateTrangThai(req.params.id, trangThai);
                res.json({ message: "Updated", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
    }
}
