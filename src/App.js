
import React from 'react';
import BarExample from "./components/bar"
import './App.css';
import firebase from './firebase'

function App() {
  const [votes, setVotes] = React.useState([])
  
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("votes").get()
      setVotes(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])


  return (
    <>
      {votes.map(({answers,question}) => {
         console.log(question);
         return(  <ul>
         <li>{question}</li>
         <li>{Object.keys(answers).map(a =>  answers[a].result).join(', ')}</li>
         <BarExample />
        </ul>)
      })}
    </>
  );
}

export default App;
