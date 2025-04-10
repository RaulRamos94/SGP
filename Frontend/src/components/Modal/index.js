function Modal({
    titulo,
    texto,
    textoBotao1 = "Salvar",
    textoBotao2 = "Cancelar",
    onClickBotao1,
    onClickBotao2,
    onClickBtnClose
}) {
    return (
        <div className="modal modal-dialog-centered" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titulo}</h5>
                        {onClickBtnClose && (
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClickBtnClose}
                            ></button>
                        )}
                    </div>
                    <div className="modal-body">
                        <p>{texto}</p>
                    </div>
                    <div className="modal-footer">
                        {onClickBotao2 && textoBotao2 && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onClickBotao2}
                            >
                                {textoBotao2}
                            </button>
                        )}
                        {onClickBotao1 && textoBotao1 && (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onClickBotao1}
                            >
                                {textoBotao1}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;