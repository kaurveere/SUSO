import React, { useState, useEffect} from 'react'

function Example() {
    const [data, setData] = useState({ members: [] });
    
      useEffect(() => {
        fetch('/members')
          .then((res) => res.json())
          .then((json) => {
            setData(json);
            console.log(json);
          })
          .catch(console.error);
      }, []);
    
      return (
        <div>
    
          {(typeof data.members === 'undefined') ? (
              <p>Loading...</p>
          ) : (
            data.members.map((member, i) => (
              <p key={i}>{member}</p>
            ))
          )}
    
        </div>
      )
}

export default Example