import { useState, useEffect } from "react";

function Recetas() {
    const [recetas, setRecetas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState(() => {
        const guardadas = localStorage.getItem("categorias");
        return guardadas ? JSON.parse(guardadas) : [];
    });
    const [preparacion, setPreparacion] = useState("");
    const [recetaEditando, setRecetaEditando] = useState(null);

    const consultarRecetas = async () => {
        const response = await fetch(
            "https://6afe22bf3a0e70bc8d532696.mockapi.io/recetas"
        );

        const data = await response.json();

        setRecetas(data);
    };

    useEffect(() => {
        consultarRecetas();
    }, []);

    async function guardarReceta(event) {
        event.preventDefault();

        const nuevaReceta = {
            nombre: nombre,
            categoria: categoria,
            preparacion: preparacion
        };

        if (recetaEditando) {
            await fetch(
                `https://6afe22bf3a0e70bc8d532696.mockapi.io/recetas/${recetaEditando}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevaReceta)
                }
            );
        } else {
            await fetch(
                "https://6afe22bf3a0e70bc8d532696.mockapi.io/recetas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevaReceta)
                }
            );
        }

        consultarRecetas();

        setNombre("");
        setCategoria("");
        setPreparacion("");
        setRecetaEditando(null);
    }
    async function eliminarReceta(id) {
        await fetch(
            `https://6afe22bf3a0e70bc8d532696.mockapi.io/recetas/${id}`,
            {
                method: "DELETE"
            }
        );

        consultarRecetas();
    }

    function editarReceta(receta) {
        setNombre(receta.nombre);
        setCategoria(receta.categoria);
        setPreparacion(receta.preparacion);
        setRecetaEditando(receta.id);
    }

    return (
        <main className="home">
            <header className="home-header">
                <h1>🍃 Mis recetas</h1>
                <p>Acá vas a encontrar tus comidas favoritas.</p>
            </header>

            <section className="home-bienvenida">
                <h2>Agregar una receta</h2>

                <form className="formulario-receta" onSubmit={guardarReceta}>

                    <input
                        type="text"
                        placeholder="Nombre de la receta"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        required
                    />

                    <select
                        value={categoria}
                        onChange={(event) => setCategoria(event.target.value)}
                        required
                    >
                        <option value="">Seleccioná una categoría</option>

                        {categoria && !categorias.some((item) => item.nombre === categoria) && (
                            <option value={categoria}>{categoria}</option>
                        )}

                        {categorias.map((item) => (
                            <option key={item.id} value={item.nombre}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Preparación"
                        value={preparacion}
                        onChange={(event) => setPreparacion(event.target.value)}
                        required
                    />

                    <button className="boton-login" type="submit">
                        {recetaEditando ? "Guardar cambios" : "Agregar receta"}
                    </button>

                    {recetaEditando && (
                        <button
                            type="button"
                            className="boton-cerrar-sesion"
                            onClick={() => {
                                setNombre("");
                                setCategoria("");
                                setPreparacion("");
                                setRecetaEditando(null);
                            }}
                        >
                            Cancelar edición
                        </button>
                    )}
                </form>
            </section>

            <section className="home-secciones">
                <h2>Mis recetas guardadas</h2>

                {recetas.length === 0 ? (
                    <p>Todavía no agregaste recetas.</p>
                ) : (
                    recetas.map((receta) => (
                        <article className="home-tarjeta tarjeta-receta" key={receta.id}>
                            <h3>🍽️ {receta.nombre}</h3>
                            <p>Categoría: {receta.categoria}</p>
                            <p>{receta.preparacion}</p>

                            <div className="botones-receta">
                                <button
                                    className="boton-editar"
                                    onClick={() => editarReceta(receta)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="boton-eliminar"
                                    onClick={() => eliminarReceta(receta.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}

export default Recetas;
