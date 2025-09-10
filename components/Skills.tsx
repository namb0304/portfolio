import { FaPython, FaReact, FaDocker, FaGitAlt, FaPhp } from 'react-icons/fa';
import { SiJavascript, SiFlask, SiFastapi, SiFirebase, SiTailwindcss } from 'react-icons/si';

const skills = [
  { name: 'Python', icon: <FaPython /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'PHP', icon: <FaPhp /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Flask', icon: <SiFlask /> },
  { name: 'FastAPI', icon: <SiFastapi /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  // 他にも追加できます
];

const Skills = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-cyan-500 hover:text-gray-900 transition-colors">
              <span className="text-xl">{skill.icon}</span>
              <span className="font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;