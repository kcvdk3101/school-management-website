const SkillsData = {
  ASPNET: {
    name: 'ASP.NET',
  },
  FLUTTER: {
    name: 'Flutter',
  },
  IOS: {
    name: 'iOS',
  },
  JAVA: {
    name: 'Java',
  },
  KOTLIN: {
    name: 'Kotlin',
  },
  REACTJS: {
    name: 'ReactJS',
  },
  UXUI: {
    name: 'UX-UI',
  },
  ANDROID: {
    name: 'Android',
  },
  CSHARP: {
    name: 'C#',
  },
  JAVASCRIPT: {
    name: 'JavaScipt',
  },
  LARAVEL: {
    name: 'Laravel',
  },
  NODEJS: {
    name: 'NodeJS',
  },
  REACTNATIVE: {
    name: 'React Native',
  },
  ANGULAR: {
    name: 'Angular',
  },
  CPP: {
    name: 'C++',
  },
  DEVOPS: {
    name: 'DevOps',
  },
  GOLANG: {
    name: 'Golang',
  },
  MYSQL: {
    name: 'MySQL',
  },
  NOSQL: {
    name: 'NoSQL',
  },
  PHP: {
    name: 'PHP',
  },
  PYTHON: {
    name: 'Python',
  },
  RUBY: {
    name: 'Ruby',
  },
  SQL: {
    name: 'SQL',
  },
  DJANGO: {
    name: 'Django',
  },
  HTML5: {
    name: 'HTML5',
  },
  CSS3: {
    name: 'CSS3',
  },
  VUEJS: {
    name: 'VueJS',
  },
  TESTER: {
    name: 'Tester',
  },
  QAQC: {
    name: 'QA-QC',
  },
}

const Skills = Object.values(SkillsData).map((skill) => {
  return { label: skill.name, value: skill.name }
})

export default Skills
