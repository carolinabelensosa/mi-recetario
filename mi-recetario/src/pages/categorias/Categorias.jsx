import { useState, useEffect } from "react";

function Categorias() {
    const [categorias, setCategorias] = useState(() => {
        const guardadas = localStorage.getItem("categorias");

        return guardadas ? JSON.parse(guardadas) : [];
    });

    const [nombre, setNombre] = useState("");
    const [categoriaEditando, setCategoriaEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem("categorias", JSON.stringify(categorias));
    }, [categorias]);

    function guardarCategoria(event) {
        event.preventDefault();

        if (categoriaEditando !== null) {
            setCategorias(
                categorias.map((categoria) =>
                    categoria.id === categoriaEditando
                        ? { ...categoria, nombre: nombre }
                        : categoria
                )
            );
        } else {
            const nuevaCategoria = {
                id: Date.now(),
                nombre: nombre
            };

            setCategorias([...categorias, nuevaCategoria]);
        }

        setNombre("");
        setCategoriaEditando(null);
    }

    function editarCategoria(categoria) {
        setNombre(categoria.nombre);
        setCategoriaEditando(categoria.id);
    }

    function eliminarCategoria(id) {
        setCategorias(
            categorias.filter((categoria) => categoria.id !== id)
        );
    }

    function cancelarEdicion() {
        setNombre("");
        setCategoriaEditando(null);
    }

    return (
        <main className="home">
            <header className="home-header">
                <h1>📚 Mis categorías</h1>
                <p>Organizá tus recetas por categoría.</p>
            </header>

            <section className="home-bienvenida">
                <h2>
                    {categoriaEditando !== null
                        ? "Editar categoría"
                        : "Agregar categoría"}
                </h2>

                <form className="formulario-categoria" onSubmit={guardarCategoria}>
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        required
                    />

                    <button className="boton-login" type="submit">
                        {categoriaEditando !== null
                            ? "Guardar cambios"
                            : "Agregar categoría"}
                    </button>

                    {categoriaEditando !== null && (
                        <button
                            type="button"
                            className="boton-cerrar-sesion"
                            onClick={cancelarEdicion}
                        >
                            Cancelar edición
                        </button>
                    )}
                </form>
            </section>

            <section className="home-secciones">
                <h2>Mis categorías guardadas</h2>

                {categorias.length === 0 ? (
                    <p>Todavía no agregaste categorías.</p>
                ) : (
                    <div className="lista-categorias">
                        {categorias.map((categoria) => (
                            <article
                                className="home-tarjeta tarjeta-categoria"
                                key={categoria.id}
                            >
                                <h3>📁 {categoria.nombre}</h3>

                                <div className="botones-receta">
                                    <button
                                        className="boton-editar"
                                        onClick={() => editarCategoria(categoria)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="boton-eliminar"
                                        onClick={() => eliminarCategoria(categoria.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Categorias;
