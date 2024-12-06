import React from 'react';

const TestPage = () => {
  const data = {
    items: [
      {
        id: 1,
        name: 'Item 1',
        city: 'cape town',
        ingredients: ['Salt', 'Pepper', 'Garlic'],
      },
      {
        id: 2,
        name: 'Item 2',
        city: 'durban',
        ingredients: ['Tomato', 'Onion', 'Curry Leaves'],
      },
      {
        id: 3,
        name: 'Item 3',
        city: 'lusaka',
        ingredients: ['Chicken', 'Paprika', 'Ginger'],
      },
      {
        id: 5,
        name: 'mazambane',
        city: 'thembisa',
        ingredients: ['Potato', 'Thyme', 'Rosemary'],
      },
    ],
  };

  console.log('Data from object:', data);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Test Page</h1>
      <div style={styles.cardContainer}>
        {data.items.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardTitle}>{item.name}</div>
            <p>City: {item.city}</p>
            <ul>
              {item.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles (for React DOM)
const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default TestPage;
