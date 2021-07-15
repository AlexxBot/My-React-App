const Selector = ({categorias, titulo, ...res}) => {
    console.log(res)
    return (
        <>
            <label>{titulo}</label>
            <select {...res}>
                {
                    categorias.map((cat) => {
                        return <option value = {cat.value} >{cat.label}</option>
                    })
                }
            </select>
        </>
    )
}

export default Selector