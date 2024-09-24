class NhanVien {
  constructor(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam,
  ) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loai = '';
  }

  tinhLuong() {
    let tongLuong = 0;
    if (this.chucVu === 'Sếp') {
      tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu === 'Trưởng phòng') {
      tongLuong = this.luongCoBan * 2;
    } else if (this.chucVu === 'Nhân viên') {
      tongLuong = this.luongCoBan;
    }
    return tongLuong;
  }

  xepLoai() {
    let loai = '';
    if (this.gioLam >= 192) {
      loai = 'Nhân viên xuất sắc';
    } else if (this.gioLam >= 176) {
      loai = 'Nhân viên giỏi';
    } else if (this.gioLam >= 160) {
      loai = 'Nhân viên khá';
    } else {
      loai = 'Nhân viên trung bình';
    }
    return loai;
  }
}
