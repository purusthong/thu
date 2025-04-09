import express, { Request, Response, Router } from "express";
import { Donations } from "./donationSQL";

export class DonationAPI {
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
                const result = await Donations.getAllPhieuDangKy();
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Lỗi server", details: err });
            }
        });

        this.router.post("/", async (req: Request, res: Response) => {
            try {
                const result = await Donations.createPhieuDangKy(req.body);
                res.status(201).json({ message: "Tạo phiếu thành công", data: result });
            } catch (err) {
                res.status(500).json({ error: "Lỗi server", details: err });
            }
        });

        this.router.put("/:id/sau-hien-mau", async (req: Request, res: Response) => {
            try {
                const result = await Donations.capNhatSauHienMau(req.params.id, req.body);
                res.json({ message: "Cập nhật thành công", data: result });
            } catch (err) {
                res.status(500).json({ error: "Lỗi server", details: err });
            }
        });

        this.router.get("/lich-su/:maTTCN", async (req: Request, res: Response) => {
            try {
                const result = await Donations.getLichSuHienMau(req.params.maTTCN);
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Lỗi server", details: err });
            }
        });

        this.router.get("/dot/:maChiTietDHM", async (req: Request, res: Response) => {
            try {
                const result = await Donations.getNguoiThamGiaTheoDot(req.params.maChiTietDHM);
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Lỗi server", details: err });
            }
        });

        this.router.get("/chi-tiet/:maPDKHM", async (req: Request, res: Response) => {
            try {
                const result = await Donations.getChiTietPhieuHienMau(req.params.maPDKHM);
                res.json(result);
            } catch (err) {
                res.status(500).json({ error: "Lỗi server", details: err });
            }
        });
    }
}
