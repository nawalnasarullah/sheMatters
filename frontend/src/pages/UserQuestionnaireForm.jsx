import React, { useState } from "react"
import {
    Button,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useUpdateUserMutation } from "../redux/api/authApi";
import { updateUserProfile } from "../redux/features/authSlice"
import { useNavigate } from "react-router-dom";

export default function UserQuestionnaireForm() {
    
    const questions = [
        {
            question: "Do you feel depressed or unmotivated?",
            label: "depression",
        },
        {
            question: "Do you feel anxious or worried often?",
            label: "anxiety",
        },
        {
            question: "Are any family-related issues causing you distress?",
            label: "family_issues",
        },
        {
            question: "Do you have thoughts about harming yourself or committing suicide?",
            label: "self_harm",
        },
        {
            question: "Are you struggling to deal with any addiction?",
            label: "addiction",
        },
        {
            question: "Do you have trouble sleeping at night or with the quality of your sleep?",
            label: "sleep_issues",
        },
        {
            question: "Have you experienced any traumatic experience?",
            label: "trauma",
        },
        {
            question: "Do you have regular menstrual cycles?",
            label: "menstrual_health",
        },
    ];
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const [updateUser, { isLoading, isSuccess, isError, error : updateError }] = useUpdateUserMutation()
  const [answers, setAnswers] = useState(questions.map(() => ""))
  const [error, setError] = useState("")

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = value
    setAnswers(updatedAnswers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (answers.includes("")) {
      setError("Please answer all questions before submitting.")
      return
    }

    setError("")
    
    try{
        const labels = questions.filter( (ques,ind) => answers[ind] === 'yes' ).map( ques => ques.label)
        let response = await updateUser({labels , _id: user.user._id })
        dispatch(updateUserProfile({ user: response.data.user }))
        console.log("response :" , response)
        navigate("/dashboard")
    }
    catch(err){ 
        console.log(err)
    }

  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Typography
        variant="h6"
        color="primary.main"
        sx={{ fontWeight: 600, marginBottom: "10px" }}
      >
        User Questionnaire Form
      </Typography>
      <form onSubmit={handleSubmit} className="px-0 items-start ">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">{question.question}</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="yes"
                  className="form-radio"
                  checked={answers[index] === "yes"}
                  onChange={() => handleChange(index, "yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="no"
                  className="form-radio"
                  checked={answers[index] === "no"}
                  onChange={() => handleChange(index, "no")}
                />
                No
              </label>
            </div>
          </div>
        ))}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button type="submit"  variant="contained" sx={{ mt: 2 }}>
            Submit
        </Button>
      </form>
    </div>
  )
}
