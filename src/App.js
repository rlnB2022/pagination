import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();

    if(data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const prevPage = () => {
    if(page > 1) {
      setPage(page => page - 1);
    }
  }

  const nextPage = () => {
    if(page < (totalPages / 10)) {
      setPage(page => page + 1);
    }
  }

  const handleClickPage = num => {
    setPage(num);
  };

  return (
    <div className="App">
      {products.length > 0 && (<div style={{ display: 'flex' }}>
        <div style={{ cursor: page > 1 ? 'pointer' : '' }} disabled={page > 1} onClick={prevPage}>Prev</div>
          {[...Array(totalPages / 10)].map((_, index) => {
            return (<div key={index} onClick={() => handleClickPage(index + 1)} style={{ cursor: 'pointer', padding: '0 .5rem', fontWeight: (index+1) === page ? 'bold' : ''}}>{index + 1}</div>)
          })}
        <div style={{ cursor: page < totalPages ? 'pointer' : '' }} disabled={page < (products.length/10)} onClick={nextPage}>Next</div>
      </div>)}

      {products.length > 0 && (<div>
        {products.map(product => {
          return (
            <div key={product.id}>
              {product.title}
              <img src={product.thumbnail} alt={product.category} />
            </div>
          )
        })}

      </div>)}
    </div>
  );
}

export default App;
