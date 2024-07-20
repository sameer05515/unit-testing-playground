import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import CustomSelect from '../common/CustomSelect';
import ContainerComponent from '../common/ContainerComponent';

// Parent component
export const Parent = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <ContainerComponent
        header={
          () =>
            <>
              <h2>Parent Component</h2>
              <CustomSelect onChange={(fileName) => {
                handleButtonClick(fileName);
              }} />
            </>
        }
        rightSection={null}
        footer={
          () =>
            <>
              <div>
                <Outlet />
              </div>
            </>
        }

      />
      <div>


      </div>
    </>
  );
};

// Child components
export const Child1 = () => {
  return <h3>Child 1 Component</h3>;
};

export const Child2 = () => {
  return <h3>Child 2 Component</h3>;
};