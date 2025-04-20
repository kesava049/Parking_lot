import React, { useState } from "react";
import LeftBar from "./components/LeftBar";
import TopBar from "./components/TopBar";

import SearchPage from "./components/SearchPage";
import PickupPage from "./components/PickupPage";
import ParkingPage from "./components/ParkingPage";

export default function App() {
  const [activePage, setActivePage] = useState("park");

  return (
    <div className="flex h-screen">
      <LeftBar setActivePage={setActivePage} />
      <div className="flex-1">
        <TopBar />
        {activePage === "park" && <ParkingPage />}
        {activePage === "search" && <SearchPage />}
        {activePage === "pickup" && <PickupPage />}
      </div>
    </div>
  );
}