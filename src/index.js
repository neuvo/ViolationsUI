import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import ComplianceDashboard from './ComplianceDashboard';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ComplianceDashboard />
  </StrictMode>
);