import { Outlet } from "@remix-run/react";

// we can use this only for outlet

const Concerts = () => {
  return (
    <div>
      <h1>Concerts.tsx</h1>
      <Outlet />
    </div>
  );
};

export default Concerts;
