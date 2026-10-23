import { useState } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Recetas from "./pages/recetas/Recetas";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [pantalla, setPantalla] = useState("home");

  if (logueado === false) {
    return <Login onLogin={() => setLogueado(true)} />;
  }

  if (pantalla === "recetas") {
    return (
      <div>
        <button
          className="boton-cerrar-sesion"
          onClick={() => setPantalla("home")}
        >
          Volver al Home
        </button>

        <Recetas />
      </div>
    );
  }

  return (
    <Home
      onCerrarSesion={() => setLogueado(false)}
      onVerRecetas={() => setPantalla("recetas")}
    />
  );
}

export default App;
