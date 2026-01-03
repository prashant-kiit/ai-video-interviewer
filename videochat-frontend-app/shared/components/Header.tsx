import Logout from "./Logout";

type HeaderProps = {
  title: string;
  isHorizontalLine?: boolean;
  size?: number;
  isTopHeader?: boolean;
};

const getHeadeeTagBySize = (size: number, title: string) => {
  switch (size) {
    case 1:
      return <h1>{title}</h1>;
    case 2:
      return <h2>{title}</h2>;
    case 3:
      return <h3>{title}</h3>;
    case 4:
      return <h4>{title}</h4>;
    case 5:
      return <h5>{title}</h5>;
    case 6:
      return <h6>{title}</h6>;
    default:
      return <h1>{title}</h1>;
  }
};

export default function Header({
  title,
  isHorizontalLine = false,
  size = 1,
  isTopHeader = false,
}: HeaderProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {getHeadeeTagBySize(size, title)}
        {isTopHeader && <Logout />}
      </div>
      {isHorizontalLine && <hr />}
    </div>
  );
}
