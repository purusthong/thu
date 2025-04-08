import { DataBase } from "../../DB/manager";

export class Admin {
    static async createQuyen(quyen: any) {
        const sql = `INSERT INTO QUYEN (tenQuyen) VALUES (?)`;
        return await DataBase.gI().query(sql, [quyen.tenQuyen]);
    }
    static async getAllQuyen() {
        const sql = `SELECT * FROM QUYEN`;
        return await DataBase.gI().query(sql);
    }
    static async getQuyenById(maQuyen: number) {
        const sql = `SELECT * FROM QUYEN WHERE maQuyen = ?`;
        return await DataBase.gI().query(sql, [maQuyen]);
    }
    static async updateRQuyen(maQuyen: number, tenQuyen: string) {
        const sql = `UPDATE QUYEN SET tenQuyen = ? WHERE maQuyen = ?`;
        return await DataBase.gI().query(sql, [tenQuyen, maQuyen]);
    }

    static async deleteRQuyen(maQuyen: number) {
        const sql = `DELETE FROM QUYEN WHERE maQuyen = ?`;
        return await DataBase.gI().query(sql, [maQuyen]);
    }

    static async updateUserRQuyen(maNguoiDung: number, maQuyen: number) {
        const sql = `UPDATE TAIKHOANNGUOIDUNG SET maQuyen = ? WHERE maNguoiDung = ?`;
        return await DataBase.gI().query(sql, [maQuyen, maNguoiDung]);
    }
}
