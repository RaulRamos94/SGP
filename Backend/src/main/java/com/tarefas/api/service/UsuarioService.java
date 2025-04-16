package com.tarefas.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.tarefas.api.dto.EnderecoDTO;
import com.tarefas.api.dto.UsuarioDTO;
import com.tarefas.api.exception.CpfJaCadastradoException;
import com.tarefas.api.exception.EmailJaCadastradoException;
import com.tarefas.api.model.Endereco;
import com.tarefas.api.model.Usuario;
import com.tarefas.api.model.ViaCepResponse;
import com.tarefas.api.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RestTemplate restTemplate;

    public Usuario salvarUsuario(Usuario usuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf(usuario.getCpf());
        Endereco endereco = usuario.getEndereco();
        if (usuarioOpt.isPresent()) {
            throw new CpfJaCadastradoException("Já existe usuário com o CPF informado.");
        }

        usuarioOpt = usuarioRepository.findByEmail(usuario.getEmail());

        if (usuarioOpt.isPresent()) {
            throw new EmailJaCadastradoException("Já existe usuário com o e-mail informado.");
        }

        if (endereco != null) {
            usuario.setEndereco(preencherEnderecoViaCep(endereco));
        }

        return usuarioRepository.save(usuario);
    }

    public Page<UsuarioDTO> listarUsuarios(Pageable paginacao) {
        return usuarioRepository.findAll(paginacao).map(usuario -> usuario.toDTO());
    }

    public UsuarioDTO buscarUsuarioPeloId(Long id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);

        if (usuarioOpt.isPresent()) {
            return usuarioOpt.get().toDTO();
        }

        return null;
    }

    public UsuarioDTO buscarUsuarioPeloCpf(String cpf) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf(cpf);

        if (usuarioOpt.isPresent()) {
            return usuarioOpt.get().toDTO();
        }

        return null;
    }

    public List<UsuarioDTO> filtrarUsuariosPeloNome(String nome) {
        List<Usuario> usuarios = usuarioRepository.findByNomeContains(nome);

        return usuarios.stream().map(Usuario::toDTO).toList();
    }

    public List<UsuarioDTO> filtrarUsuariosCujoNomeComecamCom(String nome) {
        List<Usuario> usuarios = usuarioRepository.findByNomeLike(nome + "%");

        return usuarios.stream().map(Usuario::toDTO).toList();
    }

    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario atualizarUsuario(Long id, Usuario dadosUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        Endereco endereco = dadosUsuario.getEndereco();

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            usuario.setNome(dadosUsuario.getNome());
            usuario.setCpf(dadosUsuario.getCpf());
            usuario.setDataNascimento(dadosUsuario.getDataNascimento());
            usuario.setEmail(dadosUsuario.getEmail());
            usuario.setSenha(dadosUsuario.getSenha());
            usuario.setStatus(dadosUsuario.getStatus());
            usuario.setEndereco(preencherEnderecoViaCep(endereco));

            return usuarioRepository.save(usuario);
        }

        return null;
    }

    private Endereco preencherEnderecoViaCep(Endereco endereco) {
    String cep = endereco.getCep();
    if (cep == null || cep.isEmpty()) return endereco;

    try {
        ViaCepResponse response = restTemplate.getForObject(
            "https://viacep.com.br/ws/" + cep + "/json/", ViaCepResponse.class);

        if (response != null && response.getLogradouro() != null) {
            endereco.setLogradouro(response.getLogradouro());
            // endereco.setComplemento(response.getComplemento());
            endereco.setBairro(response.getBairro());
            endereco.setCidade(response.getLocalidade());
            endereco.setEstado(response.getEstado());
        }
    } catch (Exception e) {
        System.out.println("Erro ao consultar o ViaCEP: " + e.getMessage());
    }

    return endereco;
}

}
