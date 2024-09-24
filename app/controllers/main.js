let quanLyNV = new QuanLyNhanVien();

function getEle(id) {
  return document.getElementById(id);
}

function setLoCalStorage() {
  localStorage.setItem('DSNV', JSON.stringify(quanLyNV.danhSachNhanVien));
}

function getLoCalStorage() {
  if (localStorage.getItem('DSNV')) {
    quanLyNV.danhSachNhanVien = JSON.parse(localStorage.getItem('DSNV'));
    hienThiTable(quanLyNV.danhSachNhanVien);
  }
}

function hienThiTable(arr) {
  let contentTable = '';
  arr.map(function (nhanVien, index) {
    let trNhanVien = `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.loai}</td>
        <td>
          <button data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${nhanVien.taiKhoan}');" class="btn btn-info">Xem</button>
          <button onclick="xoaNV('${nhanVien.taiKhoan}');" class="btn btn-danger">Xoá</button>
        </td>
      </tr>
    `;
    contentTable += trNhanVien;
  });
  getEle('tableDanhSach').innerHTML = contentTable;
}

window.onload = function () {
  getLoCalStorage();
};

function themNV() {
  let taiKhoan = getEle('tknv').value;
  let hoTen = getEle('name').value;
  let email = getEle('email').value;
  let matKhau = getEle('password').value;
  let ngayLam = getEle('datepicker').value;
  let luongCoBan = getEle('luongCB').value;
  let chucVu = getEle('chucvu').value;
  let gioLam = getEle('gioLam').value;

  let nhanVienMoi = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam,
  );
  nhanVienMoi.tongLuong = nhanVienMoi.tinhLuong();
  nhanVienMoi.loai = nhanVienMoi.xepLoai();
  quanLyNV.addNhanVien(nhanVienMoi);

  alert('Thêm thành công');
  setLoCalStorage();
  getLoCalStorage();
}

function xoaNV(idDelete) {
  quanLyNV.deleteNhanVien(idDelete);
  alert('Xoá thành công');
  setLoCalStorage();
  getLoCalStorage();
}

function xemChiTiet(idDetail) {
  let nhanVienDetail = quanLyNV.getDetail(idDetail);

  getEle('tknv').value = nhanVienDetail.taiKhoan;
  getEle('name').value = nhanVienDetail.hoTen;
  getEle('email').value = nhanVienDetail.email;
  getEle('password').value = nhanVienDetail.matKhau;
  getEle('datepicker').value = nhanVienDetail.ngayLam;
  getEle('luongCB').value = nhanVienDetail.luongCoBan;
  getEle('chucvu').value = nhanVienDetail.chucVu;
  getEle('gioLam').value = nhanVienDetail.gioLam;

  document.getElementById('header-title').innerHTML = 'Xem Chi Tiết';
  document.getElementById('btnThemNV').style.display = 'none';
  document.getElementById('btnCapNhat').style.display = 'block';
}

function capNhatNV() {
  let taiKhoan = getEle('tknv').value;
  let hoTen = getEle('name').value;
  let email = getEle('email').value;
  let matKhau = getEle('password').value;
  let ngayLam = getEle('datepicker').value;
  let luongCoBan = getEle('luongCB').value;
  let chucVu = getEle('chucvu').value;
  let gioLam = getEle('gioLam').value;

  let objUpdate = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam,
  );
  objUpdate.tongLuong = objUpdate.tinhLuong();
  objUpdate.loai = objUpdate.xepLoai();
  quanLyNV.updateNhanVien(objUpdate);

  alert('Cập nhật thành công');
  setLoCalStorage();
  getLoCalStorage();
}

function hienThiNhanVienTheoLoai() {
  const searchName = document.getElementById('searchName').value.trim();
  let nhanVienTheoLoai;

  if (searchName === '') {
    nhanVienTheoLoai = quanLyNV.danhSachNhanVien;
  } else if (
    searchName === 'Nhân viên xuất sắc' ||
    searchName === 'Nhân viên giỏi' ||
    searchName === 'Nhân viên khá' ||
    searchName === 'Nhân viên trung bình'
  ) {
    nhanVienTheoLoai = quanLyNV.searchNhanVienByLoai(searchName);
  } else {
    alert(
      'Loại nhân viên không hợp lệ \n(Nhân viên xuất sắc, Nhân viên giỏi, Nhân viên khá, Nhân viên trung bình). \nVui lòng nhập lại.',
    );
    return;
  }

  hienThiTable(nhanVienTheoLoai);
}

function clearInputFields() {
  getEle('tknv').value = '';
  getEle('name').value = '';
  getEle('email').value = '';
  getEle('password').value = '';
  getEle('datepicker').value = '';
  getEle('luongCB').value = '';
  getEle('chucvu').value = 'Chọn chức vụ';
  getEle('gioLam').value = '';
}

function validateForm() {
  let taiKhoan = getEle('tknv').value;
  let hoTen = getEle('name').value;
  let email = getEle('email').value;
  let matKhau = getEle('password').value;
  let ngayLam = getEle('datepicker').value;
  let luongCoBan = getEle('luongCB').value;
  let chucVu = getEle('chucvu').value;
  let gioLam = getEle('gioLam').value;

  let isValid = true;

  let taiKhoanPattern = /^[a-zA-Z0-9]{4,6}$/;
  if (!taiKhoanPattern.test(taiKhoan)) {
    alert('Tài khoản phải có 4-6 ký số và không được để trống');
    isValid = false;
  }

  let hoTenPattern = /^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF]+$/;
  if (!hoTenPattern.test(hoTen)) {
    alert('Tên nhân viên phải là chữ và không được để trống');
    isValid = false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Email phải đúng định dạng và không được để trống');
    isValid = false;
  }

  let matKhauPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  if (!matKhauPattern.test(matKhau)) {
    alert(
      'Mật khẩu phải có 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và không được để trống',
    );
    isValid = false;
  }

  let ngayLamPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!ngayLamPattern.test(ngayLam)) {
    alert('Ngày làm phải đúng định dạng mm/dd/yyyy và không được để trống');
    isValid = false;
  }

  if (luongCoBan < 1000000 || luongCoBan > 20000000 || luongCoBan === '') {
    alert(
      'Lương cơ bản phải từ 1,000,000 đến 20,000,000 và không được để trống',
    );
    isValid = false;
  }

  console.log('chucVu:', chucVu);

  if (chucVu != 'Sếp' && chucVu != 'Trưởng phòng' && chucVu != 'Nhân viên') {
    alert('Chức vụ phải hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)');
    isValid = false;
  }

  if (gioLam < 80 || gioLam > 200 || gioLam === '') {
    alert('Số giờ làm phải từ 80 đến 200 giờ và không được để trống');
    isValid = false;
  }

  return isValid;
}

getEle('btnThem').addEventListener('click', function () {
  clearInputFields();
  getEle('header-title').innerHTML = 'Thêm Nhân Viên';
  getEle('btnThemNV').style.display = 'block';
  getEle('btnCapNhat').style.display = 'none';
});

getEle('btnThemNV').addEventListener('click', function () {
  if (validateForm()) {
    themNV();
    $('#myModal').modal('hide');
  }
});

getEle('btnCapNhat').addEventListener('click', function () {
  if (validateForm()) {
    capNhatNV();
    $('#myModal').modal('hide');
  }
});

document.getElementById('btnTimNV').addEventListener('click', function () {
  let loai = getEle('searchName').value;
  hienThiNhanVienTheoLoai(loai);
});

document
  .getElementById('searchName')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      let loai = getEle('searchName').value;
      hienThiNhanVienTheoLoai(loai);
    }
  });
