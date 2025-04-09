import express, { Request, Response, Router } from "express";
import { Parter } from "./partnerSQL";

export class PartnerAPI {
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
                const result = await Parter.getDonViLienKet(req.params.id);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.post("/", async (req: Request, res: Response) => {
            try {
                const { maDVLK, maTTCN, maNguoiDung, tenDV, emailDV, sdtDV, minhChungDV, trangThai } = req.body;
                const result = await Parter.createDonViLienKet(
                    maDVLK, maTTCN, maNguoiDung, tenDV, emailDV, sdtDV, minhChungDV, trangThai || 1
                );
                res.status(201).json({ message: "Created", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.put("/:id", async (req: Request, res: Response) => {
            try {
                const { tenDV, emailDV, sdtDV, minhChungDV, trangThai } = req.body;
                const result = await Parter.updateDonViLienKet(
                    req.params.id, tenDV, emailDV, sdtDV, minhChungDV, trangThai
                );
                res.json({ message: "Updated", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });

        this.router.delete("/:id", async (req: Request, res: Response) => {
            try {
                const result = await Parter.deleteDonViLienKet(req.params.id);
                res.json({ message: "Deleted", data: result });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
    }
}
