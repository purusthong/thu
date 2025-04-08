import { DataBase } from "../../DB/manager";

export class Staff{
    static async createNhanVienYTe(maNguoiDung: string, maBV: string, tenChucVu: string, khoa: string, trinhDoCM: string) {
        const sql = `
            INSERT INTO NHANVIENYTE (maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM)
            VALUES (?, ?, ?, ?, ?)
        `;
        const result = await DataBase.gI().query(sql, [maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM]);
        return result;
    }
    static async getDanhSachNhanVienYTe() {
        const sql = `
            SELECT * FROM NHANVIENYTE WHERE trangThai = 1
        `;
        const result = await DataBase.gI().query(sql);
        return result;
    }
        
    static async updateNhanVienYTe(maNVYT: string, maNguoiDung: string, maBV: string, tenChucVu: string, khoa: string, trinhDoCM: string, trangThai: number) {
        const sql = `
            UPDATE NHANVIENYTE 
            SET maNguoiDung = ?, maBV = ?, tenChucVu = ?, khoa = ?, trinhDoCM = ?, trangThai = ?
            WHERE maNVYT = ?
        `;
        const result = await DataBase.gI().query(sql, [maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM, trangThai, maNVYT]);
        return result;
    }
    static async deleteNhanVienYTe(maNVYT: string) {
        const sql = "UPDATE NHANVIENYTE SET trangThai = 0 WHERE maNVYT = ?";
        const result = await DataBase.gI().query(sql, [maNVYT]);
        return result;
    }
    static async getChiTietNhanVienYTe(maNVYT: string) {
        const sql = `
            SELECT * FROM NHANVIENYTE WHERE maNVYT = ?
        `;
        const result = await DataBase.gI().query(sql, [maNVYT]);
        return result;
    }
    
    
}