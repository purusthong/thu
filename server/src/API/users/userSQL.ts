import { DataBase } from "../../DB/manager";

export class User {
    static async getUser(maNguoiDung: string) {
        const sql = "SELECT * FROM `TAIKHOANNGUOIDUNG` WHERE maNguoiDung = ?";
        const result = await DataBase.gI().query(sql, [maNguoiDung]);
        return result;
    }
    static async updateUser(maNguoiDung: string, tenDangNhap: string, matKhau: string, maQuyen: string) {
        const sql = "UPDATE `TAIKHOANNGUOIDUNG` SET tenDangNhap = ?, matKhau = ?, maQuyen = ? WHERE maNguoiDung = ?";
        const result = await DataBase.gI().query(sql, [tenDangNhap, matKhau, maQuyen, maNguoiDung]);
        return result;
    }

    static async getPasswordById(maNguoiDung: number){
        const sql = "SELECT matKhau FROM `TAIKHOANNGUOIDUNG` WHERE maNguoiDung = ?";
        const result = await DataBase.gI().query(sql, [maNguoiDung]);
        return result;
    }

    static async getPasswordByTenDangNhap(tenDangNhap: string){
        const sql = "SELECT matKhau FROM `TAIKHOANNGUOIDUNG` WHERE tenDangNhap = ?";
        const result = await DataBase.gI().query(sql, [tenDangNhap]);
        return result;
    }

    static async findUserByUsername(tenDangNhap: string) {
        const sql = "SELECT * FROM `TAIKHOANNGUOIDUNG` WHERE tenDangNhap LIKE ?";
        const result = await DataBase.gI().query(sql, [`%${tenDangNhap}%`]);
    
        return result;
    }
    
    
}