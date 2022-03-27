const MajorsData = {
  HTTT: {
    name: 'Hệ thống thông tin',
  },
  KHMT: {
    name: 'Khoa Học Máy Tính',
  },
  CNPM: {
    name: 'Công Nghệ Phần Mềm',
  },
  ANM: {
    name: 'An Ninh Mạng',
  },
}

const Majors = Object.values(MajorsData).map((major) => {
  return { label: major.name, value: major.name }
})

export default Majors
