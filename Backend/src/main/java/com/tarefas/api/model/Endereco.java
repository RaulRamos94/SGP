package com.tarefas.api.model;

import com.tarefas.api.dto.EnderecoDTO;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Endereco {
    
    private String cep;
    private String logradouro;
    private String numero;
    private String bairro;
    private String complemento;
    private String cidade;
    private String estado;

    public EnderecoDTO toDTO(){
        EnderecoDTO dto = new EnderecoDTO();

        dto.setCep(cep);
        dto.setLogradouro(logradouro);
        dto.setNumero(numero);
        dto.setBairro(bairro);
        dto.setComplemento(complemento);
        dto.setCidade(cidade);
        dto.setEstado(estado);

        return dto;
    }
}
