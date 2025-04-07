
create database QLHM;

use QLHM;

create table QUYEN
(
	maQuyen int primary key auto_increment,
    tenQuyen nvarchar(100)
);

create table TAIKHOANNGUOIDUNG
(
	maNguoiDung int primary key auto_increment,
    tenDangNhap varchar(50),
    matKhau varchar(50),
    maQuyen int,
    foreign key (maQuyen) references QUYEN(maQuyen) on update cascade
);
-- drop database QLHM;

create table TENTINHTHANHPHO (
    maTinhThanhPho int primary key auto_increment,
    tenTinhPho nvarchar(150)
);

create table TENPHUONGXA (
    maPhuongXa int primary key auto_increment,
    tenPhuongXa nvarchar(150),
	maTinhThanhPho int,
    foreign key (maTinhThanhPho) references TENTINHTHANHPHO(maTinhThanhPho) on update cascade
);

create table CHITIETDIACHI (
    idChiTietDiaChi int primary key auto_increment,
    SoNha NVARCHAR(50) NOT NULL,
    maPhuongXa int,
    foreign key (maPhuongXa) references TENPHUONGXA(maPhuongXa) on update cascade,
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade
);

create table BENHVIEN
(
	maBV varchar(20) primary key,
    tenBV nvarchar(100),
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade,
   --  diachi nvarchar(200),
    emailBV varchar(50),
    sdtBV varchar(11),
    minhChungBV varchar(200),
    trangThai int default '1' check (trangThai in ('0','1')) -- 0: chưa kích hoạt, 1: đã kích hoạt
);

create table THONGTINCANHANNGUOIHIENMAU 
(
	maTTCN int primary key auto_increment,
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade,
    hoTen nvarchar(50),
	email varchar(50),
    sdt varchar(11),
    sdt_ban varchar(12),
	CCCD varchar(12) unique,
    gioiTinh int default '1' check (gioiTinh in ('0','1')),
    nhomMau varchar(5),
    ngaySinh date,
    -- diaChi nvarchar(100),
    ngheNghiep nvarchar(100),
    -- username varchar(20),
    soLanHM int check (soLanHM >=0 or solanHM <30),
    trangThai int default '1' check (trangThai in ('0','1'))-- 0: chưa kích hoạt, 1: đã kích hoạt
    -- password varchar(50)
    
);

create table NHANVIENYTE
(
	maNVYT int primary key auto_increment,
--     maTTCN int,
--     foreign key (maTTCN) references THONGTINCANHAN(maTTCN) on update cascade,
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade,
    maBV varchar(20),
    foreign key (maBV) references BENHVIEN(maBV) on update cascade,
    tenChucVu nvarchar(100),
    khoa nvarchar(100),
    trinhDoCM nvarchar(100),
	trangThai int default '1' check (trangThai in ('0','1')) -- 0: chưa kích hoạt, 1: đã kích hoạt
);

create table DONVILIENKET
(
	maDVLK varchar(20) primary key,
    maTTCN int,
    foreign key (maTTCN) references THONGTINCANHANNGUOIHIENMAU(maTTCN) on update cascade,
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade,
    tenDV nvarchar(100),
    -- diaChiDV nvarchar(100),
    emailDV varchar(50),
    sdtDV varchar(11),
    minhChungDV varchar(200),
    trangThai int default '1' check (trangThai in ('0','1')) -- 0: chưa kích hoạt, 1: đã kích hoạt
);

create table DOTHIENMAU
(
	maDHM int primary key auto_increment,
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade,
    tenDHM nvarchar(100),
    noiDung nvarchar(1000),
    ngayBD datetime,
    ngayKT datetime,
    trangThai int default '1' check(trangThai in ('0','1')) -- 0: Hết hạn, 1: Đang diễn ra
);

create table CHITIETDHM
(
	maChiTietDHM int primary key auto_increment,
    maDHM int,
    foreign key (maDHM) references DOTHIENMAU(maDHM) on update cascade,
    maBV varchar(20),
    foreign key (maBV) references BENHVIEN(maBV) on update cascade,
    maDVLK varchar(20),
    foreign key (maDVLK) references DONVILIENKET(maDVLK) on update cascade,
	maNguoiDung int,
    foreign key (maNguoiDung) references TAIKHOANNGUOIDUNG(maNguoiDung) on update cascade,
    ngayDK datetime,
    tenBaiDang nvarchar(100),
    -- Người đại diện
   --  nguoiDK nvarchar(50),
	diaChi nvarchar(100),
    -- đối tượng tham gia
    dTTG nvarchar(50),
    soLuong int check (soLuong >=1 or soLuong <=1000) ,
	ngayBatDauDK datetime,
    ngayKetThucDK datetime,
    ngayToChuc datetime,
    nguoiDangBai nvarchar(50),
    anhBaiDang varchar(200),
    khungGioHienMau nvarchar(50),
    liDo nvarchar(1000), -- lý do tổ chức hiến máu cho đvlk
    phanHoi nvarchar(200), -- phản hồi của đơn vị liên kết
    trangThai int default '0' check (trangThai in ('0','1')) -- 0: chưa xác nhận, 1: đã xác nhận
);


create table DANHSACHNHANVIENTHUCHIEN
(
    maChiTietDHM int,
    foreign key (maChiTietDHM) references CHITIETDHM(maChiTietDHM) on update cascade,
    maNVYT int,
    foreign key (maNVYT) references NHANVIENYTE(maNVYT) on update cascade,
    nhiemVu nvarchar(50), -- lay mau, kham lam san, xet nghiem
    primary key (maChiTietDHM, maNVYT)
);

create table PHIEUDANGKYHIENMAU
(
	maPDKHM int primary key auto_increment,
    maTTCN int,
    foreign key (maTTCN) references THONGTINCANHANNGUOIHIENMAU (maTTCN) on update cascade,
    maChiTietDHM int,
    foreign key (maChiTietDHM) references CHITIETDHM(maChiTietDHM) on update cascade,
    -- NVYT cho ket qua hm
    maNguoiKham int,
    foreign key (maNguoiKham) references NHANVIENYTE(maNVYT) on update cascade,
    maNguoiXetNghiem int,
    foreign key (maNguoiXetNghiem) references NHANVIENYTE(maNVYT) on update cascade,
    maNguoiLayMau int,
    foreign key (maNguoiLayMau) references NHANVIENYTE(maNVYT) on update cascade,
	benhKhac nvarchar(200),
    sutCan int default 0,
    noiHach int default 0,
    chamCu int default 0,
    xamMinh int default 0,
    duocTruyenMau int default 0,
    suDungMaTuy int default 0,
    HIV int default 0,
    QHTD int default 0,
    QHTD_NguoiCungGioi int default 0,
    tiemVacXin int default 0,
    vungDich int default 0,
    biSot int default 0,
	biCumCamLanhsot int default 0,
    dungTKS int default 0,
    -- đối tượng tàn tật
    dTTT int default 0,
    dangMangThai int default 0,
    chamDutThaiKy int default 0,
    ungThu int default 0,
    tiepXucMau int default 0,
    sinhSongGanB int default 0,
    tgDuKien datetime,
    xacNhan int,
    maQR varchar(200),
    -- kết quả hiến máu
    tgKham datetime,
    tgXetNghiem datetime,
    tgLayMau datetime,
    -- trạng thái lâm sàng
    TTLS nvarchar(50),
    huyetAp nvarchar(50),
    hienMau int default 0,
    luongMauHien int,
    lyDo nvarchar(100),
    HST int,
    HBV int,
    MSD int,
    phanUng nvarchar(100),
    canNang int check (canNang >=1),
    ghiChu nvarchar(1000),
    machMau nvarchar(100),
    nhomMauXetNghiem varchar(50),
    trangThai int check (trangThai in ('0','1','2','3','4')), -- 0,1 là của người dùng: 0: thất bại, 1: Thành công; 2,3,4 của nvyt: cap nhat xong, dang cap nhat, chua cap nhat
    anhChungNhan nvarchar(200) -- ảnh chứng nhận sau khi hiến máu thành công
);

alter table THONGTINCANHANNGUOIHIENMAU 
add constraint CHECK_TTCN_email check (
    email regexp '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(\\.vn)?$'
);

alter table THONGTINCANHANNGUOIHIENMAU 
add constraint CHECK_TTCN_sdt CHECK (
    sdt regexp '^(\\+?[0-9]{10,12})$'
);

alter table THONGTINCANHANNGUOIHIENMAU 
add constraint CHECK_TTCN_sdt_ban CHECK (
    sdt_ban regexp '^(\\+?[0-9]{10,12})$'
);

alter table THONGTINCANHANNGUOIHIENMAU  
add constraint CHECK_TTCN_CCCD CHECK (
    CCCD regexp '^[0-9]{9,12}$'
);

alter table BENHVIEN
add constraint CHECK_BV_email check (
    emailBV regexp '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(\\.vn)?$'
);

alter table BENHVIEN
add constraint CHECK_BV_sdt CHECK (
    sdtBV regexp '^(\\+?[0-9]{10,12})$'
);

alter table DONVILIENKET
add constraint CHECK_DV_email check (
    emailDV regexp '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(\\.vn)?$'
);

alter table DONVILIENKET
add constraint CHECK_DV_sdt CHECK (
    sdtDV regexp '^(\\+?[0-9]{10,12})$'
);

