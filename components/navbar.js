import react from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <h1>
        <Link href={"/"} passHref={true}>
          BLOG NAME UNDECIDED
        </Link>
      </h1>
    </div>
  );
};

export default NavBar;
