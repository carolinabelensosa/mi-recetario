import { useEffect, useState } from "react";

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    function ingresar(event) {
        event.preventDefault();

        const encontrado = usuarios.find(
            (user) => user.email === usuario && user.password === password
        );

        if (encontrado) {
            setError("");
            onLogin();
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
    }

    const consultarbase = async () => {
        const response = await fetch("https://6afe22bf3a0e70bc8d532696.mockapi.io/usuarios")
        const data = await response.json()

        console.log(data);
        setUsuarios(data);
    }

    useEffect(() => {
        consultarbase()
    }, [])

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
