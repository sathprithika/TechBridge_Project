// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SearchForm.css";

// const SearchForm = () => {
//   const [knowledgeLevel, setKnowledgeLevel] = useState("");
//   const [goal, setGoal] = useState("");
//   const [experience, setExperience] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/results", { state: { knowledgeLevel, goal, experience } }); // ✅ Pass values to ResultsPage
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={knowledgeLevel} onChange={(e) => setKnowledgeLevel(e.target.value)} placeholder="Knowledge Level" />
//       <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal" />
//       <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchForm;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

const SearchForm = () => {
  const [knowledgeLevel, setKnowledgeLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results", { state: { knowledgeLevel, goal, experience } });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <h2>Find Your Course</h2>

        <label>Knowledge Level</label>
        <select value={knowledgeLevel} onChange={(e) => setKnowledgeLevel(e.target.value)} required>
          <option value="">Select Knowledge Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Goal</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
          <option value="">Select Goal</option>
          <option value="Understand Node.js fundamentalst">Understand Node.js fundamentals</option>
          <option value="Become a Full-Stack Developer">Become a Full-Stack Developer</option>
          <option value="Understand data science concepts">Understand data science concepts</option>
          <option value="Build interactive UIs with React">Build interactive UIs with React</option>
          <option value="Build machine learning models">Build machine learning models</option>
        </select>

        <label>Experience</label>
        <select value={experience} onChange={(e) => setExperience(e.target.value)} required>
          <option value="">Select Experience Level</option>
          <option value="No experience needed">No experience needed</option>
          <option value="Basic HTML, CSS, and JavaScript">Basic HTML, CSS, and JavaScript</option>
          <option value="No prior experience needed">No prior experience needed</option>
          <option value="Basic JavaScript knowledge">Basic JavaScript knowledge</option>
          <option value="Basic Python and math knowledge">Basic Python and math knowledge</option>
        </select>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
