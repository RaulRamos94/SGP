package com.tarefas.api.model;

import lombok.Data;

@Data
public class ViaCepResponse {
    private String cep;
    private String logradouro;
    // private String complemento;
    private String bairro;
    private String localidade;
    private String estado;
}
