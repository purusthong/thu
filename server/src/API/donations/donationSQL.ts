import { DataBase } from "../../DB/manager";

export class Donations {
    static async createPhieuDangKy(phieu: any) {
        const sql = `
            INSERT INTO PHIEUDANGKYHIENMAU (
                maTTCN, maChiTietDHM, maNguoiKham, maNguoiXetNghiem, maNguoiLayMau,
                benhKhac, sutCan, noiHach, chamCu, xamMinh, duocTruyenMau, suDungMaTuy,
                HIV, QHTD, QHTD_NguoiCungGioi, tiemVacXin, vungDich, biSot,
                biCumCamLanhsot, dungTKS, dTTT, dangMangThai, chamDutThaiKy,
                ungThu, tiepXucMau, sinhSongGanB, tgDuKien, xacNhan, maQR,
                tgKham, tgXetNghiem, tgLayMau, TTLS, huyetAp, hienMau,
                luongMauHien, lyDo, HST, HBV, MSD, phanUng, canNang, ghiChu,
                machMau, nhomMauXetNghiem, trangThai, anhChungNhan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await DataBase.gI().query(sql, [
            phieu.maTTCN, phieu.maChiTietDHM, phieu.maNguoiKham, phieu.maNguoiXetNghiem, phieu.maNguoiLayMau,
            phieu.benhKhac, phieu.sutCan, phieu.noiHach, phieu.chamCu, phieu.xamMinh, phieu.duocTruyenMau, phieu.suDungMaTuy,
            phieu.HIV, phieu.QHTD, phieu.QHTD_NguoiCungGioi, phieu.tiemVacXin, phieu.vungDich, phieu.biSot,
            phieu.biCumCamLanhsot, phieu.dungTKS, phieu.dTTT, phieu.dangMangThai, phieu.chamDutThaiKy,
            phieu.ungThu, phieu.tiepXucMau, phieu.sinhSongGanB, phieu.tgDuKien, phieu.xacNhan, phieu.maQR,
            phieu.tgKham, phieu.tgXetNghiem, phieu.tgLayMau, phieu.TTLS, phieu.huyetAp, phieu.hienMau,
            phieu.luongMauHien, phieu.lyDo, phieu.HST, phieu.HBV, phieu.MSD, phieu.phanUng, phieu.canNang, phieu.ghiChu,
            phieu.machMau, phieu.nhomMauXetNghiem, phieu.trangThai, phieu.anhChungNhan
        ]);
        return result;
    }
    

    static async getAllPhieuDangKy() {
        const sql = `SELECT * FROM PHIEUDANGKYHIENMAU`;
        const result = await DataBase.gI().query(sql);
        return result;
    }

    static async capNhatSauHienMau(maPDKHM: string, data: any) {
        const sql = `
            UPDATE PHIEUDANGKYHIENMAU 
            SET hienMau = ?, luongMauHien = ?, tgKham = ?, tgXetNghiem = ?, tgLayMau = ?, TTLS = ?, HST = ?, HBV = ?, MSD = ?, phanUng = ?, ghiChu = ?, trangThai = ?, anhChungNhan = ?
            WHERE maPDKHM = ?
        `;
        const result = await DataBase.gI().query(sql, [
            data.hienMau, data.luongMauHien, data.tgKham, data.tgXetNghiem, data.tgLayMau, data.TTLS, data.HST, data.HBV, data.MSD, data.phanUng, data.ghiChu, data.trangThai, data.anhChungNhan, maPDKHM
        ]);
        return result;
    }

    static async getLichSuHienMau(maTTCN: string) {
        const sql = `
            SELECT * FROM PHIEUDANGKYHIENMAU 
            WHERE maTTCN = ?
            ORDER BY tgDuKien DESC
        `;
        const result = await DataBase.gI().query(sql, [maTTCN]);
        return result;
    }

    static async getNguoiThamGiaTheoDot(maChiTietDHM: string) {
        const sql = `
            SELECT p.maPDKHM, p.maTTCN, t.hoTen, t.nhomMau, p.trangThai 
            FROM PHIEUDANGKYHIENMAU p
            JOIN THONGTINCANHANNGUOIHIENMAU t ON p.maTTCN = t.maTTCN
            WHERE p.maChiTietDHM = ?
        `;
        const result = await DataBase.gI().query(sql, [maChiTietDHM]);
        return result;
    }

    static async getChiTietPhieuHienMau(maPDKHM: string) {
        const sql = `
            SELECT p.*, t.hoTen, t.nhomMau, c.ngayToChuc, c.diaDiem, nv1.tenNV as tenNguoiKham, nv2.tenNV as tenNguoiXetNghiem, nv3.tenNV as tenNguoiLayMau
            FROM PHIEUDANGKYHIENMAU p
            LEFT JOIN THONGTINCANHANNGUOIHIENMAU t ON p.maTTCN = t.maTTCN
            LEFT JOIN CHITIETDHM c ON p.maChiTietDHM = c.maChiTietDHM
            LEFT JOIN NHANVIENYTE nv1 ON p.maNguoiKham = nv1.maNVYT
            LEFT JOIN NHANVIENYTE nv2 ON p.maNguoiXetNghiem = nv2.maNVYT
            LEFT JOIN NHANVIENYTE nv3 ON p.maNguoiLayMau = nv3.maNVYT
            WHERE p.maPDKHM = ?
        `;
        const result = await DataBase.gI().query(sql, [maPDKHM]);
        return result;
    }
}
