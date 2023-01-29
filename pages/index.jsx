import Head from 'next/head';
import {useState} from 'react';
import styles from "./index.module.css";

export default function Home() {

  const [count, setCounter] = useState(0);
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

async function onSubmit(e) {

      e.preventDefault()

      try {
      if(count == 10) {
        return console.log('you have reached your limit')
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({question: questionInput})
      });

      const data = await response.json();
      if(response.status !== 200) {
        throw data.error || new Error(`Requst failed with status ${response.status}`);
      }

      setResult(data.result);
      setCounter(count + 1)
      setQuestionInput("");

    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.body}>      
      <Head>
        <title>AI answer for anything</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       <img src='/favicon.ico' className={styles.icon} />
       <h3>Q&A OpenAI API</h3>
       <form onSubmit={onSubmit}>
          <input
          type='text'
          name='question'
          value={questionInput}
          onChange={(e) =>{
            setQuestionInput(e.target.value)
            console.log(questionInput)
          }
        } 
          placeholder='Make a question'
          />
          <input
            type="submit" 
            value="Generate answer"/>
       </form>
       <div className={styles.result}>{result}</div>
      </main>
      </div>
  )
}
