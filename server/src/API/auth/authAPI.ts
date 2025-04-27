import express, { Request, Response, Router } from "express";
import { Auth } from "./authSQL";
import { InfoAuth } from "./infoAuthSQL";
import { User } from "../users/userSQL";

export class AuthAPI {
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
            res.send("Auth API is running");
        });

        this.router.post("/register", (req: Request, res: Response) => {
            try {
                const { matKhau, CCCD, hoVaTen, ngaySinh, gioiTinh, soDienThoai, soDienThoaiBan, Email, ngheNghiep, soNha, maPhuongXa } = req.body;
                
                if (!CCCD || !matKhau === undefined) {
                    res.status(400).json({ error: "Missing fields" });
                }

                Auth.registerUser(CCCD, matKhau)
                    .then((resultRes: any) => {
                        const rowsRes = resultRes[0];
                        if (!rowsRes || rowsRes.length == 0) {
                            res.status(404).json({ error: "Register found" });
                        }
                        Auth.getIdAuth(CCCD).then((result: any) => {
                            const rows = result[0];
                            if (!rows || rows.length == 0) {
                                res.status(404).json({ error: "User not found" });
                            }
                            const maNguoiDung = rows[0].maNguoiDung;
                            const updateInfo = InfoAuth.updateInfoAuth(maNguoiDung, hoVaTen, Email, soDienThoai, soDienThoaiBan ?? "00", CCCD, gioiTinh, ngaySinh, ngheNghiep);
                            const updateLocal = InfoAuth.updateLocalAuth(soNha, maPhuongXa, maNguoiDung);
                            Promise.all([updateInfo, updateLocal]).then((result) => {
                                res.status(201).json({ message: "User registered successfully", data: result });
                            }).catch((error) => {
                                res.status(500).json({ error: "Server error", details: error.message || error });
                            })
                        });

                    })
                    .catch((error) => {
                        res.status(500).json({ error: "Server error", details: error.message || error });
                    });
            } catch (error) {
                res.status(500).json({ error: "Server error", details: error });
            }
        });
        this.router.post("/login", (req: Request, res: Response) => {
            const { tenDangNhap, matKhau } = req.body;
            if (!tenDangNhap || !matKhau) {
                res.status(400).json({ error: "Missing fields" });
            }
        
            User.getPasswordByTenDangNhap(tenDangNhap)
                .then((result: any) => {
                    const rows = result[0];
        
                    if (!rows || rows.length === 0) {
                        res.status(404).json({ error: "User not found" });
                    }
        
                    const storedPassword = rows[0].matKhau;
        
                    if (storedPassword === matKhau) {
                        res.status(200).json({ message: "Login successful" });
                    } else {
                        res.status(401).json({ error: "Incorrect password" });
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error: "Server error", details: error.message || error });
                });
        });
        
        
    }
}
