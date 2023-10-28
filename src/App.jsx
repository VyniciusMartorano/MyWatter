import { useState, useEffect } from 'react';
import './App.css';
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import db from './service';

function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    getLastCount();
    setSize(localStorage.getItem('size') || '0');
  }, []);

  const getLastCount = () => {
    const q = query(collection(db, 'Water'));

    getDocs(q)
      .then(({ docs }) => {
        if (docs.length > 0) {
          setCount(docs[0].data().contador);
        }
      });
  };

  const setFirstWaterValue = (value) => {
    const q = query(collection(db, 'Water'));

    getDocs(q)
      .then(({ docs }) => {
        if (docs.length > 0) {
          // Pega o primeiro documento da coleção 'Water' e seu ID
          const firstDoc = docs[0];
          const firstDocID = firstDoc.id;

          // Define o valor do primeiro documento com o valor fornecido
          setDoc(doc(db, 'Water', firstDocID), { contador: value });

          // Atualiza o estado com o novo valor de 'count'
          setCount(value);
        } else {
          console.log('Nenhum documento encontrado na coleção "Water"');
        }
      });
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    localStorage.setItem('size', newSize);
  };

  return (
    <>
      <h1>My Water</h1>
      <div className="card">
        <button onClick={() => setFirstWaterValue(count + 1)}>
          Drink
        </button>
        <button onClick={() => setFirstWaterValue(count - 1)} style={{ marginLeft: '20px' }}>
          Undrink
        </button>

        <p>
          You have drunk <strong>{count * size}ml</strong> of water today
        </p>
        <button onClick={() => setFirstWaterValue(0)}>
          Reset
        </button>

        
      </div>
      <div>
        <span>
          <label htmlFor="size">Size bootle (ml)</label>
          <input
            id="size"
            type="number"
            style={{width: '50px', marginLeft: '10px'}}
            value={size}
            onChange={handleSizeChange}
            placeholder="Size of bottle (ml)"
          />
        </span>
      </div>
    </>
  );
}

export default App;
