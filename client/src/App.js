import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <h1>Hello World!</h1>

      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p> // api hasn't been fetched
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p> // map members 1 by 1
        ))
      )
    }
    </div>
  )
}

export default App