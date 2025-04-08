import { DataBase } from "../../DB/manager";

export class Auth{
    static async registerUser(tenDangNhap: string, matKhau: string, maQuyen: number) {
        const sql = "INSERT INTO `TAIKHOANNGUOIDUNG` (tenDangNhap, matKhau, maQuyen) VALUES (?, ?, ?)";
        const result = await DataBase.gI().query(sql, [tenDangNhap, matKhau, maQuyen]);
        return result;
    }
}