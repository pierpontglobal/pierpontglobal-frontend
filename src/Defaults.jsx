import React from 'react';

export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3000' : 'https://api.pierpontglobal.com';
