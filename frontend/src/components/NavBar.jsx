import { Link } from "react-router";
import {PlusIcon} from "lucide-react"

const NavBar = () => {
  return (
    <div className="relative navbar container z-10"> {/* This ensures proper background */}
      <div className="navbar-start">
        <Link className="btn btn-ghost text-base sm:text-xl">
          ThinkBoard
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/create" className="btn btn-primary btn-sm sm:btn-md">
        <PlusIcon className="size-4 sm:size-5"/>
         <span className="hidden sm:inline"> New Note</span>
        </Link>  
      </div>
    </div>
  );
};

export default NavBar;
