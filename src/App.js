
import React from 'react';

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
         console.log(question)
         Object.keys(answers).map(a => console.log(answers[a].result))
      })}
      <div>asd</div>
    </>
  );
}

export default App;
