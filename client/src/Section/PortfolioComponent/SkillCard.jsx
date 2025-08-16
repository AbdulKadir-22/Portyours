import '../Styles/SkillCard.css';

function SkillCard({ icon, name, level }) {
  return (
    <div className="skill-card">
      <div className="skill-icon">{icon}</div>
      <h4>{name}</h4>
      <p>{level}</p>
    </div>
  );
}

export default SkillCard;
