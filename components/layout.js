import Nav from "./nav";

const layoutStyle = {
  background: "#E0DCC6",
  margin: "0px",
  padding: "5px"
};

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      {props.account ? <Nav account={props.account} /> : <Nav />}
      {props.children}
    </div>
  );
}
