function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7292/api/products");
        if (!response.ok) {
          throw new Error(`Http Error - code ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error Fetching Products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.quantity} in stock
          </li>
        ))}
      </ul>
    </>
  );
}
