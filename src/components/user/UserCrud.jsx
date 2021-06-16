import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import Main from '../templete/Main'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}



export default function UserCrud() {

 const[users, setUsers] = useState([]);
 const[dividas, setDividas] = useState([]);

 const[desc_divida, setDescDivida] = useState('');
 const[valor_divida, setValorDivida] = useState('');

 const[id, setId] = useState('');

 useEffect(() => {
   axios.get('https://provadev.xlab.digital/api/v1/divida?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5')
   .then(resp => {
      setDividas(resp.data.result)
      console.log(resp.data)
   })
 }, []);


 useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp => {
      setUsers(resp.data)
   })
 }, []);

  function salvar() {
    axios.post('https://provadev.xlab.digital/api/v1/divida?uuid=bad2fe24-5b1d-44e2-93e5-a7c958b414d5', 
    {
      idUsuario: id,
      motivo: desc_divida,
      valor: valor_divida
    }).then(resp => console.log(resp.data));
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
            <div className="form-group">
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
            <div className="form-group">
              <label>Motivo</label>
              <input type="text" className="form-control"
                name="email"
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
              onClick={ salvar }>
              Salvar
            </button>

            <button className="btn btn-secondary m-2"
              onClick={e => this.clear(e) }>
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
                    onClick={() => this.load(user.email)}>
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button className="btn btn-danger m-2"
                    onClick={() => this.remove(user)}>
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