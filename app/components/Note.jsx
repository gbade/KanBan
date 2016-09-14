import React from 'react';

/***export default ({task}) => <div>{task}</div>;***/
    
export default ({children, ...props}) => (
  <div {...props}>
    {children}
  </div>
);