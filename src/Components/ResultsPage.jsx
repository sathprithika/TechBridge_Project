import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";


const ResultsPage = () => {
  const location = useLocation();
  const { knowledgeLevel, goal, experience } = location.state || {}; // Get passed state from SearchForm

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      if (!knowledgeLevel || !goal || !experience) {
        setError("Invalid search parameters. Please go back and try again.");
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams({
        knowledgeLevel,
        goal,
        experience,
      });

      console.log("Fetching courses with params:", queryParams.toString());

      const response = await fetch(`http://localhost:5000/courses/search?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      console.log("Received courses:", data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false); // ✅ Ensure loading is updated after request
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Course Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="mb-2">{course.description}</p>
              {/* <p className="text-sm text-gray-600">Knowledge Level: {course.knowledgeLevel}</p>
              <p className="text-sm text-gray-600">Goal: {course.goal}</p>
              <p className="text-sm text-gray-600">Experience: {course.experience}</p> */}
              <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
                View Course
              </a>
            </div>
          ))
        ) : (
          <p>No courses found based on your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;

