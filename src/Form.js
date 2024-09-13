import React, { useState } from "react";
import Question from "./Question";
import "./App.css"; // Import specific styles for Form component

const Form = () => {
  const [questions, setQuestions] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  // Function to add a new question
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      type: 'Short Answer',
      children: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Function to update an existing question
  const updateQuestion = (updatedQuestion) => {
    const updatedQuestions = updateQuestionRecursively(questions, updatedQuestion);
    setQuestions(updatedQuestions);
  };

  // Recursive function to update a question
  const updateQuestionRecursively = (questionsList, updatedQuestion) => {
    return questionsList.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      }
      if (question.children) {
        return {
          ...question,
          children: updateQuestionRecursively(question.children, updatedQuestion),
        };
      }
      return question;
    });
  };

  // Function to delete a question
  const deleteQuestion = (id) => {
    const updatedQuestions = deleteQuestionRecursively(questions, id);
    setQuestions(updatedQuestions);
  };

  // Recursive function to delete a question
  const deleteQuestionRecursively = (questionsList, id) => {
    return questionsList
      .filter((question) => question.id !== id)
      .map((question) => ({
        ...question,
        children: deleteQuestionRecursively(question.children, id),
      }));
  };

  // Function to add a child question to a parent question
  const addChild = (parentId, childQuestion) => {
    const updatedQuestions = addChildRecursively(questions, parentId, childQuestion);
    setQuestions(updatedQuestions);
  };

  // Recursive function to add a child question
  const addChildRecursively = (questionsList, parentId, childQuestion) => {
    return questionsList.map((question) => {
      if (question.id === parentId) {
        if (!question.children) {
          question.children = [];
        }
        return {
          ...question,
          children: [...question.children, childQuestion],
        };
      }
      if (question.children) {
        return {
          ...question,
          children: addChildRecursively(question.children, parentId, childQuestion),
        };
      }
      return question;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    setSubmittedQuestions(questions);
  };

  // Render the list of questions
  const renderQuestions = (questionsList, parentIndex = "") => {
    return questionsList.map((question, idx) => {
      const newIndex = parentIndex ? `${parentIndex}.${idx + 1}` : `${idx + 1}`;
      return (
        <Question
          key={question.id}
          question={question}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          index={newIndex}
          addChild={addChild}
        />
      );
    });
  };

  // Render the submitted questions
  const renderSubmittedQuestions = (questionsList, parentIndex = "") => {
    return questionsList.map((question, idx) => {
      const newIndex = parentIndex ? `${parentIndex}.${idx + 1}` : `${idx + 1}`;
      return (
        <div key={question.id} className="question-item">
          <div>
            <strong>{`Question ${newIndex}:`}</strong> {question.text} (Type: {question.type})
          </div>
          {question.children && question.children.length > 0 && (
            <div className="nested-questions">
              <strong>Child Questions:</strong>
              {renderSubmittedQuestions(question.children, newIndex)}
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <div className="form-container">
      <h1>Question Form</h1>
      <button onClick={addQuestion}>Add Question</button>
      {renderQuestions(questions)}
      <button onClick={handleSubmit}>Submit</button>

      {submittedQuestions.length > 0 && (
        <div>
          <h2>Submitted Questions</h2>
          {renderSubmittedQuestions(submittedQuestions)}
        </div>
      )}
    </div>
  );
};

export default Form;
