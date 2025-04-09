import express, { Request, Response, Router } from "express";
import { Staff } from "./staffSQL";

export class StaffAPI {
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
                const result = await Staff.getDanhSachNhanVienYTe();
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.get("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Staff.getChiTietNhanVienYTe(req.params.id);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.post("/", async (req: Request, res: Response) => {
            try {
                const { maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM } = req.body;
                const result = await Staff.createNhanVienYTe(maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM);
                res.status(201).json({ message: "Created", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.put("/:id", async (req: Request, res: Response) => {
            try {
                const { maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM, trangThai } = req.body;
                const result = await Staff.updateNhanVienYTe(req.params.id, maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM, trangThai);
                res.json({ message: "Updated", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.delete("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Staff.deleteNhanVienYTe(req.params.id);
                res.json({ message: "Deleted", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
    }
}
