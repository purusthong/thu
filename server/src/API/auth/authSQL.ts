import { DataBase } from "../../DB/manager";

export class Auth{
    static async registerUser(tenDangNhap: string, matKhau: string) {
        const sql = "INSERT INTO `TAIKHOANNGUOIDUNG` (tenDangNhap, matKhau, maQuyen) VALUES (?, ?, ?)";
        const result = await DataBase.gI().query(sql, [tenDangNhap, matKhau, 4]);
        return result;
    }

    static async getIdAuth(tenDangNhap: string) {
        const sql = "SELECT maNguoiDung from `TAIKHOANNGUOIDUNG` WHERE tenDangNhap = (?)"
        const result = DataBase.gI().query(sql, [tenDangNhap]);
        return result;
    }
}