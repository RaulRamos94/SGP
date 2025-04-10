function Alert({ texto }) {
    return (
        <>
            <div className="alert alert-warning" role="alert">
                {texto}
            </div>
        </>
    )
}

export default Alert;