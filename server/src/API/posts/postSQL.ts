import { DataBase } from "../../DB/manager";

export class Post {
    static async createPost(data: {
        maDHM: number,
        maBV: string,
        maDVLK: string,
        maNguoiDung: number,
        tenBaiDang: string,
        diaChi: string,
        dTTG: string,
        soLuong: number,
        ngayBatDauDK: string,
        ngayKetThucDK: string,
        ngayToChuc: string,
        nguoiDangBai: string,
        anhBaiDang: string,
        khungGioHienMau: string,
        liDo: string,
        phanHoi: string,
        trangThai?: number
    }) {
        const sql = `
            INSERT INTO CHITIETDHM (
                maDHM, maBV, maDVLK, maNguoiDung, ngayDK, tenBaiDang, diaChi,
                dTTG, soLuong, ngayBatDauDK, ngayKetThucDK, ngayToChuc,
                nguoiDangBai, anhBaiDang, khungGioHienMau, liDo, phanHoi, trangThai
            )
            VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.maDHM, data.maBV, data.maDVLK, data.maNguoiDung, data.tenBaiDang,
            data.diaChi, data.dTTG, data.soLuong, data.ngayBatDauDK,
            data.ngayKetThucDK, data.ngayToChuc, data.nguoiDangBai,
            data.anhBaiDang, data.khungGioHienMau, data.liDo,
            data.phanHoi, data.trangThai ?? 0
        ];
        return await DataBase.gI().query(sql, values);
    }

    static async getPost(maChiTietDHM: number) {
        const sql = "SELECT * FROM CHITIETDHM WHERE maChiTietDHM = ?";
        return await DataBase.gI().query(sql, [maChiTietDHM]);
    }

    static async updatePost(maChiTietDHM: number, data: {
        tenBaiDang: string,
        diaChi: string,
        dTTG: string,
        soLuong: number,
        ngayBatDauDK: string,
        ngayKetThucDK: string,
        ngayToChuc: string,
        anhBaiDang: string,
        khungGioHienMau: string,
        liDo: string,
        phanHoi: string,
        trangThai: number
    }) {
        const sql = `
            UPDATE CHITIETDHM SET
                tenBaiDang = ?, diaChi = ?, dTTG = ?, soLuong = ?,
                ngayBatDauDK = ?, ngayKetThucDK = ?, ngayToChuc = ?,
                anhBaiDang = ?, khungGioHienMau = ?, liDo = ?, phanHoi = ?, trangThai = ?
            WHERE maChiTietDHM = ?
        `;
        const values = [
            data.tenBaiDang, data.diaChi, data.dTTG, data.soLuong,
            data.ngayBatDauDK, data.ngayKetThucDK, data.ngayToChuc,
            data.anhBaiDang, data.khungGioHienMau, data.liDo,
            data.phanHoi, data.trangThai, maChiTietDHM
        ];
        return await DataBase.gI().query(sql, values);
    }

    static async deletePost(maChiTietDHM: number) {
        const sql = "UPDATE CHITIETDHM SET trangThai = 0 WHERE maChiTietDHM = ?";
        return await DataBase.gI().query(sql, [maChiTietDHM]);
    }

    static async getAllPost() {
        const sql = "SELECT * FROM CHITIETDHM ORDER BY ngayDK DESC";
        return await DataBase.gI().query(sql);
    }
}
