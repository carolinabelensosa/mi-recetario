function Home({ onCerrarSesion, onVerRecetas }) {
    return (
        <main className="home">
            <header className="home-header">
                <h1>🍃 Mi Recetario</h1>

                <p>
                    Tu espacio para organizar tus comidas favoritas.
                </p>

                <button
                    className="boton-cerrar-sesion"
                    onClick={onCerrarSesion}
                >
                    Cerrar sesión
                </button>
            </header>

            <section className="home-bienvenida">
                <p className="home-etiqueta">¡BIENVENIDA!</p>

                <h2>¿Qué cocinamos hoy?</h2>

                <p>
                    Encontrá inspiración, organizá tus recetas
                    y guardá esas comidas que tanto te gustan.
                </p>
            </section>

            <section className="home-secciones">
                <h2>Explorá tu recetario</h2>


                <div className="home-tarjetas">
                    <article className="home-tarjeta">
                        <span className="home-emoji">🍲</span>

                        <h3>Mis recetas</h3>

                        <p>
                            Consultá y organizá tus recetas favoritas.
                        </p>

                        <button
                            className="boton-login"
                            onClick={onVerRecetas}
                        >
                            Ver mis recetas
                        </button>
                    </article>

                    <article className="home-tarjeta">
                        <span className="home-emoji">🥗</span>

                        <h3>Categorías</h3>

                        <p>
                            Ordená tus comidas por tipo de preparación.
                        </p>
                    </article>
                </div>
            </section>

            <footer className="home-footer">
                <p>Hecho con ♥ para disfrutar de la cocina.</p>
            </footer>
        </main>
    );
}

export default Home;
