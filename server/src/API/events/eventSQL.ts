import { DataBase } from "../../DB/manager";

export class DotHienMau {
    static async createDot(dot: any) {
        const sql = `
            INSERT INTO DOTHIENMAU (maNguoiDung, tenDHM, noiDung, ngayBD, ngayKT)
            VALUES (?, ?, ?, ?, ?)
        `;
        const result = await DataBase.gI().query(sql, [
            dot.maNguoiDung, dot.tenDHM, dot.noiDung, dot.ngayBD, dot.ngayKT
        ]);
        return result;
    }

    static async getDanhSachDot() {
        const sql = `SELECT * FROM DOTHIENMAU ORDER BY ngayBD DESC`;
        const result = await DataBase.gI().query(sql);
        return result;
    }

    static async getChiTietDot(maDHM: string) {
        const sql = `SELECT * FROM DOTHIENMAU WHERE maDHM = ?`;
        const result = await DataBase.gI().query(sql, [maDHM]);
        return result;
    }

    static async updateTrangThai(maDHM: string, trangThai: number) {
        const sql = `UPDATE DOTHIENMAU SET trangThai = ? WHERE maDHM = ?`;
        const result = await DataBase.gI().query(sql, [trangThai, maDHM]);
        return result;
    }
}
