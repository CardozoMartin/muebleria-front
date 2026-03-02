import logoImg from "../assets/logo.png";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh",  }}>
      <img src={logoImg} alt="Logo" style={{ width: "400px", height: "400px" }} />
    </div>
  );
}
