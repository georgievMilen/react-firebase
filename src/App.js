import React from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";
import firebase from "./firebase";

function App() {
  const [votes, setVotes] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: [
      {
        label: "",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [],
      },
    ],
  });

  function getVotesAmount(answers, options) {
    let answersData = answers;
    let optionsData = options;

    const validAnswers = answersData.map((answer) => {
      if (Array.isArray(answer)) getVotesAmount(answer, optionsData);
      return optionsData.map((a) => {
        if (a.includes(answer)) return answer;
        return false;
      });
    });
    console.log(validAnswers);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("votes").get();
      const responseVotes = data.docs.map((doc) => doc.data());

      let responseQuestions = [];
      let responseAnswers = [];
      let responseOptions = [];

      responseVotes.map(({ answers, question, options }) => {
        responseQuestions.push(question);
        responseAnswers.push(
          Object.keys(answers).map((a) => answers[a].result)
        );
        responseOptions.push(
          Object.keys(options).map((option) => options[option])
        );
      });

      setVotes(responseVotes);
      setQuestions(responseQuestions);
      setAnswers(responseAnswers);
      setOptions(responseOptions);

      getVotesAmount(responseAnswers, responseOptions);

      setChartData({
        labels: [...responseOptions[0]],
        datasets: [
          {
            label: responseQuestions[0],
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [5, 3, 1, 3],
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <Bar
        data={chartData}
        width={250}
        height={250}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </>
  );
}

export default App;
