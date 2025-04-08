import { DataBase } from "../../DB/manager";

export class Parter{
    static async createDonViLienKet(maDVLK: string, maTTCN: string, maNguoiDung: string, tenDV: string, emailDV: string, sdtDV: string, minhChungDV: string, trangThai: number = 1) {
        const sql = "INSERT INTO `DONVILIENKET` (maDVLK, maTTCN, maNguoiDung, tenDV, emailDV, sdtDV, minhChungDV, trangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const result = await DataBase.gI().query(sql, [maDVLK, maTTCN, maNguoiDung, tenDV, emailDV, sdtDV, minhChungDV, trangThai]);
        return result;
    }
    static async updateDonViLienKet(maDVLK: string, tenDV: string, emailDV: string, sdtDV: string, minhChungDV: string, trangThai: number) {
        const sql = "UPDATE `DONVILIENKET` SET tenDV = ?, emailDV = ?, sdtDV = ?, minhChungDV = ?, trangThai = ? WHERE maDVLK = ?";
        const result = await DataBase.gI().query(sql, [tenDV, emailDV, sdtDV, minhChungDV, trangThai, maDVLK]);
        return result;
    }
    static async getDonViLienKet(maDVLK: string) {
        const sql = "SELECT * FROM `DONVILIENKET` WHERE maDVLK = ?";
        const result = await DataBase.gI().query(sql, [maDVLK]);
        return result;
    }
    static async deleteDonViLienKet(maDVLK: string) {
        const sql = "UPDATE `DONVILIENKET` SET trangThai = 0 WHERE maDVLK = ?";
        const result = await DataBase.gI().query(sql, [maDVLK]);
        return result;
    }
        
}