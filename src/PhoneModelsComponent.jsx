import React, { useState, useEffect } from 'react';

const PhoneModelsComponent = () => {
  const [phones, setPhones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec?route=brand-list') 
      .then(response => response.json())
      .then(data => {
        setPhones(data.phones); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // filters phones based on what is being searched
  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    phone.features.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phone Models</h2>

      <input
        type="text"
        placeholder="Search by name, brand, or features"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%', boxSizing: 'border-box' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredPhones.length > 0 ? (
          filteredPhones.map((phone, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '15px', width: 'calc(33% - 20px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h3>{phone.name}</h3>
              <p><strong>Brand:</strong> {phone.brand}</p>
              <p><strong>Price:</strong> ${phone.price}</p>
              <p><strong>Features:</strong> {phone.features}</p>
            </div>
          ))
        ) : (
          <p>No phones found.</p>
        )}
      </div>
    </div>
  );
};

export default PhoneModelsComponent;
