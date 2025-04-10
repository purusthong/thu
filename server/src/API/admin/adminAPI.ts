import express, { Request, Response, Router } from "express";
import { Admin } from "./adminSQL";

export class AdminAPI {
    private router: Router;
    constructor() {
        this.router = express.Router();
        this.init();
    }

    get Router(): Router {
        return this.router;
    }

    private init() {
        this.router.get("/quyen", async (_req: Request, res: Response) => {
            try {
                const result = await Admin.getAllQuyen();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Server error", details: err });
            }
        });
    
        this.router.post("/quyen", async (req: Request, res: Response) => {
            try {
                const result = await Admin.createQuyen(req.body);
                res.status(201).json({ message: "Permission created successfully", data: result });
            } catch (err) {
                res.status(500).json({ error: "Server error", details: err });
            }
        });
    
        this.router.put("/quyen/:id", async (req: Request, res: Response) => {
            try {
                const result = await Admin.updateRQuyen(Number(req.params.id), req.body.tenQuyen);
                res.json({ message: "Permission updated successfully", data: result });
            } catch (err) {
                res.status(500).json({ error: "Server error", details: err });
            }
        });
    
        this.router.delete("/quyen/:id", async (req: Request, res: Response) => {
            try {
                const result = await Admin.deleteRQuyen(Number(req.params.id));
                res.json({ message: "Permission deleted successfully", data: result });
            } catch (err) {
                res.status(500).json({ error: "Server error", details: err });
            }
        });
    
        this.router.get("/quyen/:id", async (req: Request, res: Response) => {
            try {
                const result = await Admin.getQuyenById(Number(req.params.id));
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Server error", details: err });
            }
        });
    
        this.router.put("/cap-quyen/:maNguoiDung", async (req: Request, res: Response) => {
            try {
                const result = await Admin.updateUserRQuyen(Number(req.params.maNguoiDung), req.body.maQuyen);
                res.json({ message: "User permission updated successfully", data: result });
            } catch (err) {
                res.status(500).json({ error: "Server error", details: err });
            }
        });
    }
    
}
