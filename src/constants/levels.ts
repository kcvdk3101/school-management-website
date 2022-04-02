const LevelsData = {
  FRESHER: {
    name: 'Fresher',
  },
  JUNIOR: {
    name: 'Junior',
  },
  SENIOR: {
    name: 'Junior',
  },
  MANAGER: {
    name: 'Manager',
  },
}

const Levels = Object.values(LevelsData).map((level) => {
  return { label: level.name, value: level.name }
})

export default Levels
