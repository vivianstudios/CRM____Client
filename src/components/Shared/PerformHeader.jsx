import { NavLink } from "react-router-dom";


const PerformHeader = () => {
  return (
    <div className="w-full ">
      <div className="text-blue-500">
        <NavLink
          className={
            " mx-2 btn-design hover:text-neutral-100 py-2 px-3 rounded-sm "
          }
          to={"/dashboard/quarterly"}
        >
          {" "}
          Quarterly{" "}
        </NavLink>
        <NavLink
          className={
            " mx-2 btn-design hover:text-neutral-100 py-2 px-3 rounded-sm "
          }
          to={"/dashboard/monthly"}
        >
          {" "}
          Monthly{" "}
        </NavLink>
        <NavLink
          className={
            " mx-2 btn-design hover:text-neutral-100 py-2 px-3 rounded-sm "
          }
          to={"/dashboard/daily"}
        >
          {" "}
          Daily{" "}
        </NavLink>
      </div>
    </div>
  );
};

export default PerformHeader;
