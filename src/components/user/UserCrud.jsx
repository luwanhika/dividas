import React, { useState, useEffect } from 'react' 
import axios from 'axios'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}



export default function UserCrud() {

  const[id, setId] = useState('');

  const[users, setUsers] = useState([]);
  const[dividas, setDividas] = useState([]);

  const[desc_divida, setDescDivida] = useState('');
  const[valor_divida, setValorDivida] = useState('');

  const[editing, setEditing] = useState(false);
  const[userEditing, setUserEditing] = useState([])
  const [idDivida, setIdDivida] = useState("")


 useEffect(() => {
   axios.get('https://provadev.xlab.digital/api/v1/divida?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5')
   .then(resp => {
      setDividas(resp.data.result)
   })
 }, []);


 useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp => {
      setUsers(resp.data)
   })
 }, []);

  function salvar() {
    if(editing) {
      axios.put(`https://provadev.xlab.digital/api/v1/divida/${idDivida}?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5`,{
        idUsuario: id,
        motivo: desc_divida,
        valor: valor_divida
      }).then(resp => console.log(resp.data));
    } else {
      axios.post('https://provadev.xlab.digital/api/v1/divida?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5', 
      {
        idUsuario: id,
        motivo: desc_divida,
        valor: valor_divida
      }).then(resp => setDividas([ ...dividas, resp.data ]));
    }
   
  }

  function del(id) {
    axios.delete(`https:provadev.xlab.digital/api/v1/divida/${id}?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5`)
    .then(resp => {
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

  function upDate(divida) {
    setUserEditing(divida)
    setEditing(true)
    setIdDivida(divida._id)
    setId(divida.idUsuario)
    setDescDivida(divida.motivo)
    setValorDivida(divida.valor)
  }


//  getDivida() {
//   axios.get('https://provadev.xlab.digital/api/v1?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5/divida')
//     .then(resp => {
//       this.setState({ divida: resp.data })
//     })
//  }


  // save() {
  //   const user = this.state.user
  //   const method = user.id ? 'put' : 'post'
  //   const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
  //   axios[method](url, user)
  //   .then(resp => {
  //     const list = this.getUpdatedList(resp.data)
  //     this.setState({ user: initialState.user, list })
  //   })
  // }

  // getUpdatedList(user, add = true) {
  //   const list = this.state.list.filter(u => u.id !== user.id)
  //   if(add) list.unshift(user)
  //   return list
  // }

  // updateField(event) {
  //   const user = { ...this.state.user }
  //   user[event.target.name] = event.target.value
  //   this.setState({ user })
  // }

  // handleChange(event) {
  //   this.setState({iduser: event.target.value})
  // }

  // remove(user) {
  //   axios.delete(`${baseUrl}/${user.id}`).then(resp => {
  //     const list = this.getUpdatedList(user, false)
  //     this.setState({ list })
  //   })
  // }


    return (
      <>
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group mt-2">
              <label>Cliente</label>
              <select className="form-control" onChange={e => 
                setId(e.target.value)} >
                 { users.map(user => 
                   (
                      <option key={user.id} className="form-control" 
                        name="name"
                        value={user.id}>
                        {user.name}
                      </option>
                    ))
                  }
                  
              </select>
              {/* <input type="text" className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={e => this.updateField(e)}
                placeholder="Usuário do JSONPlaceholder" /> */}
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
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          dividas.map(user => 
             (
              <tr key={user.id}>
                <td>{user.idUsuario}</td>
                <td>{user.nome}</td>
                <td>{user.motivo}</td>
                <td>{user.valor}</td>
                <td>
                  <button className="btn btn-warning m-2"
                    onClick={() => upDate(user)}>
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button className="btn btn-danger m-2"
                    onClick={() => del(user._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
    </>
    )


}