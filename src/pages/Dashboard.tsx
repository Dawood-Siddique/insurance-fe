import React from 'react';
import { Header } from '../components/header';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>ID</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>1</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>John Doe</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>john.doe@example.com</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Admin</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>2</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Jane Smith</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>jane.smith@example.com</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
