import React, { useState, useEffect } from 'react'
import Main from '../templete/Main'
import axios from 'axios'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

export default function UserCrud() {

  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [dividas, setDividas] = useState([]);
  const [desc_divida, setDescDivida] = useState('');
  const [valor_divida, setValorDivida] = useState('');
  const [editing, setEditing] = useState(false);
  const [idDivida, setIdDivida] = useState('');

 async function getUserId(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data.name;
  }

  const loadDivida = async () => {
    const response = await axios.get('https://provadev.xlab.digital/api/v1/divida?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5')
    const { result: dividas } = response.data;

    const dividasWithUser = await Promise.all(dividas.map(async item => {
      const username = await getUserId(item.idUsuario);
      return {
        ...item,
        username,
        valorFormatted: Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(item.valor),
        criado: new Date(item.criado).toLocaleDateString('pt-BR', 'dd/mm/YYYY')
      }
    })
   );
    setDividas(dividasWithUser)
 }

 const loadUsers = async () => {
   const response = await axios.get('https://jsonplaceholder.typicode.com/users');
   setUsers(response.data);
 }

 useEffect(() => {
   loadUsers();
    loadDivida();
 },[]);

  function salvar() {
    if(editing) {
      axios.put(`https://provadev.xlab.digital/api/v1/divida/${idDivida}?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5`,{
        idUsuario: id,
        motivo: desc_divida,
        valor: valor_divida
      }).then(() => {
        clear();
        loadDivida()
      });
    } else {
      axios.post('https://provadev.xlab.digital/api/v1/divida?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5', 
      {
        idUsuario: id,
        motivo: desc_divida,
        valor: valor_divida
      }).then(resp => {
        setDividas([ ...dividas, resp.data ]);
        clear();
        loadDivida();
      });
    }
  }

  function remove(id) {
    axios.delete(`https:provadev.xlab.digital/api/v1/divida/${id}?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5`)
    .then(() => {
      const dividasFilter = dividas.filter(divida => divida._id !== id)
      setDividas(dividasFilter)
    })
  }

  function clear() {
    setEditing(false)
    setIdDivida('')
    setId('')
    setDescDivida('')
    setValorDivida('')
  }

  function update(divida) {
    setEditing(true)
    setIdDivida(divida._id)
    setId(divida.idUsuario)
    setDescDivida(divida.motivo)
    setValorDivida(divida.valor);
  }

    return (
      <>
      <Main { ...headerProps }>
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group mt-2">
              <label>Cliente</label>
              <select 
                className="form-control" 
                onChange={e => setId(e.target.value)} 
              >
                 { 
                  users.map(user => 
                   (
                      <option key={user.id} className="form-control" 
                        name="name"
                        value={user.id}>
                        {user.name}
                      </option>
                    ))
                  }
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group mt-2">
              <label>Motivo</label>
              <input type="text" className="form-control"
                name="divida"
                value={desc_divida}
                onChange={e => setDescDivida(e.target.value)}
                placeholder="Ex: dívida cartão de crédito" />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Valor</label>
              <input type="text" className="form-control"
                name="valor"
                value={valor_divida}
                onChange={e => setValorDivida(e.target.value)}
                placeholder="Ex: R$ 500,00" />
            </div>
          </div>

        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary m-2"
              onClick={ () => salvar() }>
              {editing ? 'Atualizar' : 'Salvar'}
            </button>

            <button className="btn btn-secondary m-2"
              onClick={ clear }>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <table className="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Motivo</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          dividas.map(user => 
             (
              <tr key={user.id}>
                <td>{user.idUsuario}</td>
                <td>{user.username}</td>
                <td>{user.motivo}</td>
                <td>{user.valorFormatted}</td>
                <td>{user.criado}</td>
                <td>
                  <button className="btn btn-warning m-2"
                    onClick={() => update(user)}>
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button className="btn btn-danger m-2"
                    onClick={() => remove(user._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
      </Main>
      
    </>
    )


}