import { DataBase } from "../../DB/manager";

export class Hospitals{
    static async createBenhVien(maBV: string, tenBV: string, maNguoiDung: string, emailBV: string, sdtBV: string, minhChungBV: string, trangThai: number = 1) {
        const sql = "INSERT INTO `BENHVIEN` (maBV, tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const result = await DataBase.gI().query(sql, [maBV, tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai]);
        return result;
    }
    static async getBenhVien(maBV: string) {
        const sql = "SELECT * FROM `BENHVIEN` WHERE maBV = ?";
        const result = await DataBase.gI().query(sql, [maBV]);
        return result;
    }
    static async updateBenhVien(maBV: string, tenBV: string, maNguoiDung: string, emailBV: string, sdtBV: string, minhChungBV: string, trangThai: number) {
        const sql = "UPDATE `BENHVIEN` SET tenBV = ?, maNguoiDung = ?, emailBV = ?, sdtBV = ?, minhChungBV = ?, trangThai = ? WHERE maBV = ?";
        const result = await DataBase.gI().query(sql, [tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV, trangThai, maBV]);
        return result;
    }
    static async deleteBenhVien(maBV: string) {
        const sql = "UPDATE `BENHVIEN` SET trangThai = 0 WHERE maBV = ?";
        const result = await DataBase.gI().query(sql, [maBV]);
        return result;
    }
    
    static async getDanhSachNguoiHienMau() {
        const sql = `
            SELECT 
                cn.maTTCN, cn.hoTen, cn.email, cn.sdt, cn.nhomMau, cn.soLanHM,
                phieu.tgLayMau, phieu.luongMauHien, phieu.anhChungNhan
            FROM THONGTINCANHANNGUOIHIENMAU cn
            JOIN PHIEUDANGKYHIENMAU phieu ON cn.maTTCN = phieu.maTTCN
            WHERE phieu.hienMau = 1
            ORDER BY phieu.tgLayMau DESC
        `;
        const result = await DataBase.gI().query(sql);
        return result;
    }
            
}