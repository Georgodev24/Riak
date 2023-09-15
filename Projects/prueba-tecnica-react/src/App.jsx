import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'
import { fetchFact } from './services/fetch'

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`;
const CAT_PREFIX_IMG_URL = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState()
  const [imageURL, setImageURL] = useState()

  useEffect(async () => {
    getRandomFact().then((newFact) => setFact(newFact))
  }, [])

  useEffect(() => {
    if (!fact) return
    fetchFact(fact).then((newImageURL) => setImageURL(newImageURL))
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact(setFact)
    setFact(newFact)
  }

  return (
    <>
      <main>
        <h1>App de gatitos</h1>
        <button onClick={handleClick}>Get new fact</button>
        {fact && <p>{fact}</p>}
        {imageURL && <img src={`${CAT_PREFIX_IMG_URL}${imageURL}`} />}
      </main>
    </>
  )
}