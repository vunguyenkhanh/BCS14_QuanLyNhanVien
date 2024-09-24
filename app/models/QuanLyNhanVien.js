class QuanLyNhanVien {
  constructor() {
    this.danhSachNhanVien = [];
  }
  addNhanVien(nhanVienMoi) {
    this.danhSachNhanVien.push(nhanVienMoi);
  }

  deleteNhanVien(idDelete) {
    let indexDel = this.danhSachNhanVien.findIndex(function (nhanVien) {
      return nhanVien.taiKhoan == idDelete;
    });
    this.danhSachNhanVien.splice(indexDel, 1);
  }

  getDetail(idDetail) {
    let indexDetail = this.danhSachNhanVien.find(function (nhanVien) {
      return nhanVien.taiKhoan == idDetail;
    });
    return indexDetail;
  }

  updateNhanVien(objUpdate) {
    let indexUpdate = this.danhSachNhanVien.findIndex(function (nhanVien) {
      return nhanVien.taiKhoan == objUpdate.taiKhoan;
    });
    this.danhSachNhanVien[indexUpdate] = objUpdate;
  }

  searchNhanVienByLoai(loai) {
    return this.danhSachNhanVien.filter((nhanVien) => nhanVien.loai === loai);
  }
}
