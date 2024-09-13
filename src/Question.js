import React, { useState } from "react";
import "./App.css"; // Import specific styles for Question component

const Question = ({ question, updateQuestion, deleteQuestion, index, addChild }) => {
  const [showChildren, setShowChildren] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateQuestion({ ...question, [name]: value });
  };

  const handleAddChild = () => {
    const newChildQuestion = {
      id: Date.now(),
      text: '',
      type: 'Short Answer',
      children: [],
    };
    addChild(question.id, newChildQuestion);
  };

  const handleDelete = () => {
    deleteQuestion(question.id);
  };

  return (
    <div className={`question-item question-level-${index.split('.').length}`}>
      <div className="question-item-content">
        <div>
          <strong>{`Question ${index}:`}</strong>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleChange}
            placeholder="Enter question text"
          />
          <select name="type" value={question.type} onChange={handleChange}>
            <option value="Short Answer">Short Answer</option>
            <option value="True/False">True/False</option>
          </select>
          {question.type === 'True/False' && (
            <button onClick={handleAddChild}>Add Child Question</button>
          )}
        </div>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
      {question.children && showChildren && (
        <div className="nested-questions">
          {question.children.map((child) => (
            <Question
              key={child.id}
              question={child}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
              index={`${index}.${question.children.indexOf(child) + 1}`}
              addChild={addChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
