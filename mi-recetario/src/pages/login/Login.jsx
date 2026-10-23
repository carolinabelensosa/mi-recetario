import { useState } from "react";

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function ingresar(event) {
        event.preventDefault();

        if (usuario === "admin" && password === "1234") {
            setError("");
            onLogin();
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
    }

    return (
        <main className="login">
            <section className="login-card">
                <div className="login-icono">🍃</div>

                <h1>Mi Recetario</h1>
                <p className="login-subtitulo">
                    Tus recetas favoritas, en un solo lugar.
                </p>

                <form onSubmit={ingresar}>
                    <div className="campo">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(event) => setUsuario(event.target.value)}
                            placeholder="Ingresá tu usuario"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Ingresá tu contraseña"
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button className="boton-login" type="submit">
                        Ingresar
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;
