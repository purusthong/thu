-- Thêm quyền
insert into QUYEN (tenQuyen) values ('Admin'), ('Bệnh viện'), ('Đơn vị liên kết'), ('Người hiến máu');

-- Tài khoản người dùng
insert into TAIKHOANNGUOIDUNG (tenDangNhap, matKhau, maQuyen)
values ('admin1', '123456', 1),
       ('bvuser', '123456', 2),
       ('dvuser', '123456', 3),
       ('nguoi1', '123456', 4);

-- Tỉnh thành và phường xã
insert into TENTINHTHANHPHO (tenTinhPho) values ('TP Hồ Chí Minh');
insert into TENPHUONGXA (tenPhuongXa, maTinhThanhPho) values ('Phường 1', 1);

-- Địa chỉ chi tiết
insert into CHITIETDIACHI (SoNha, maPhuongXa, maNguoiDung) values ('123A', 1, 1);

-- Bệnh viện
insert into BENHVIEN (maBV, tenBV, maNguoiDung, emailBV, sdtBV, minhChungBV)
values ('BV001', 'Bệnh viện Chợ Rẫy', 2, 'croy@example.com', '0901234567', 'cm1.jpg');

-- Thông tin cá nhân người hiến máu
insert into THONGTINCANHANNGUOIHIENMAU (maNguoiDung, hoTen, email, sdt, sdt_ban, CCCD, gioiTinh, nhomMau, ngaySinh, ngheNghiep, soLanHM)
values (4, 'Nguyễn Văn A', 'vana@example.com', '0912345678', '0281234567', '123456789012', 1, 'O+', '1995-01-01', 'Nhân viên văn phòng', 3);

-- Nhân viên y tế
insert into NHANVIENYTE (maNguoiDung, maBV, tenChucVu, khoa, trinhDoCM)
values (2, 'BV001', 'Bác sĩ', 'Truyền máu', 'Bác sĩ chuyên khoa I');

-- Đơn vị liên kết
insert into DONVILIENKET (maDVLK, maTTCN, maNguoiDung, tenDV, emailDV, sdtDV, minhChungDV)
values ('DV001', 1, 3, 'Đoàn thanh niên ĐH Bách Khoa', 'dv1@example.com', '0908765432', 'minhchungdv.jpg');

-- Đợt hiến máu
insert into DOTHIENMAU (maNguoiDung, tenDHM, noiDung, ngayBD, ngayKT)
values (1, 'Hiến máu mùa xuân', 'Tổ chức tại trường Bách Khoa', '2025-04-20 08:00:00', '2025-04-20 17:00:00');

-- Chi tiết đợt hiến máu
insert into CHITIETDHM (maDHM, maBV, maDVLK, maNguoiDung, ngayDK, tenBaiDang, diaChi, dTTG, soLuong, ngayBatDauDK, ngayKetThucDK, ngayToChuc, nguoiDangBai, anhBaiDang, khungGioHienMau, liDo)
values (1, 'BV001', 'DV001', 1, now(), 'Chương trình Xuân Hồng', '268 Lý Thường Kiệt, Q10', 'Sinh viên', 100, '2025-04-15 00:00:00', '2025-04-19 23:59:00', '2025-04-20 09:00:00', 'admin1', 'xuandong.jpg', '9h-12h', 'Góp phần cứu người dịp Tết');

-- Danh sách nhân viên thực hiện
insert into DANHSACHNHANVIENTHUCHIEN (maChiTietDHM, maNVYT, nhiemVu) values (1, 1, 'Lấy máu');

-- Phiếu đăng ký hiến máu
insert into PHIEUDANGKYHIENMAU (maTTCN, maChiTietDHM, maNguoiKham, maNguoiXetNghiem, maNguoiLayMau, canNang, xacNhan, hienMau, luongMauHien, trangThai)
values (1, 1, 1, 1, 1, 60, 1, 1, 350, 1);
