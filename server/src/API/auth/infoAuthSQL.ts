import { DataBase } from "../../DB/manager";

export class InfoAuth{
    static async updateInfoAuth(maNguoiDung: string, hoTen: string, Email: string, soDienThoai: string,
                                soDienThoaiBan: string, CCCD: string, gioiTinh: string, ngaySinh: string,ngheNghiep: string) {
        const sql = `INSERT INTO THONGTINCANHANNGUOIHIENMAU (maNguoiDung, hoTen, email, std, std_ban, CCCD, gioiTinh, ngaySinh, ngheNghiep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await DataBase.gI().query(sql, [maNguoiDung, hoTen, Email, soDienThoai, soDienThoaiBan, CCCD, gioiTinh, ngaySinh, ngheNghiep]);
        return result;
    }

    static async updateLocalAuth(soNha: string, maPhuongXa: string, maNguoiDung: string) {
        const sql = "INSERT INTO `CHITIETDIACHI` (SoNha, maPhuongXa, maNguoiDung) VALUES (?, ?, ?)";
        const result = await DataBase.gI().query(sql, [soNha, maPhuongXa, maNguoiDung]);
        return result;
    }
}