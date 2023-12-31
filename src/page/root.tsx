import { Outlet } from "react-router-dom";
import SidenavItems from "../component/SidenavItems";

export default function Root() {
  return (
    <>
      {/* other elements */}

      <SidenavItems
        navItems={[
          { icon: null, label: "json", to: "tool/json" },
          // { icon: null, label: "string", to: "json" },
        ]}
      />

      {/* other elements */}

      <div id="detail" className="container">
        <Outlet />
      </div>
    </>
  );
}
