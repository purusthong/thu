import express, { Request, Response, Router } from "express";
import { Hospitals } from "./hospitalSQL";

export class HospitalAPI {
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
                const result = await Hospitals.getBenhVien(req.params.id);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.post("/", async (req: Request, res: Response) => {
            try {
                const { maBV, tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai } = req.body;
                const result = await Hospitals.createBenhVien(
                    maBV, tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai || 1
                );
                res.status(201).json({ message: "Created", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.put("/:id", async (req: Request, res: Response) => {
            try {
                const { tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai } = req.body;
                const result = await Hospitals.updateBenhVien(
                    req.params.id, tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai
                );
                res.json({ message: "Updated", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.delete("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Hospitals.deleteBenhVien(req.params.id);
                res.json({ message: "Deleted", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.get("/nguoi-hien-mau/danhsach", async (_req: Request, res: Response) => {
            try {
                const result = await Hospitals.getDanhSachNguoiHienMau();
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
    }
}
