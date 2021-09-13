import React, {useEffect, useState} from 'react';
import {db} from './firebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [idUsuario, setIdUsuario] =useState('');
  const [nombre, setNombre] =useState('');
  const [phone, setPhone] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [error, setError] = useState('');
  const [modoEdicion, setModoEdicion] = useState(null);


  useEffect(() => {
    const getUsuarios =  async() =>{
      const {docs} = await getDocs(collection(db, "agenda"));
      const array = docs.map(item => ({id : item.id, ...item.data()}));
      setUsuario(array)
    }
    getUsuarios();
  },[])

  const setUsuarios = async (e) => {
    e.preventDefault();
    if(!phone.trim() && !nombre.trim()) {
      setError('El campo nombre y número estan vacios')
    }
    else if(!phone.trim()) {
      setError('El campo número esta vacio')
    }
    else if(!nombre.trim()) {
      setError('El campo nombre esta vacio')
    }
    else{
    const user = {
      nombre,
      phone
    }

    try {
      const docRef = await addDoc(collection(db, "agenda"), user);
      const {docs} = await getDocs(collection(db, "agenda"));
      const array = docs.map(item => ({id : item.id, ...item.data()}));
      setUsuario(array)
      // console.log("Document written with ID: ", docRef.id);
      setNombre('');
      setPhone('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    }
    
  }

  const borrarUsuario = async(id) => {
    try {
      await deleteDoc(doc(db, "agenda", id));
      const {docs} = await getDocs(collection(db, "agenda"));
      const array = docs.map(item => ({id : item.id, ...item.data()}));
      setUsuario(array)
    } catch (er) {
        console.log(er);
    }
  }

  const pulsarAct = async (id) => {
    const data = await getDoc(doc(db, "agenda", id));
    console.log(data.data());
    const {nombre, phone} = data.data();
    setNombre(nombre);
    setPhone(phone);
    setIdUsuario(id);
    setModoEdicion(true);
    console.log(idUsuario);
  }

  const setUpdate = async (e) => {
    e.preventDefault();
    if(!phone.trim() && !nombre.trim()) {
      setError('El campo nombre y número estan vacios')
    }
    else if(!phone.trim()) {
      setError('El campo número esta vacio')
    }
    else if(!nombre.trim()) {
      setError('El campo nombre esta vacio')
    }else{
      const userUpdate = {
        nombre,
        phone
      }
      try {
        await setDoc(doc(db, "agenda", idUsuario), userUpdate);
        const {docs} = await getDocs(collection(db, "agenda"));
        const array = docs.map(item => ({id : item.id, ...item.data()}));
        setUsuario(array)
        setModoEdicion(false);
        setNombre('');
        setPhone('');
      } catch (er) {
        console.log(er)
      }
    }
  }


  return (
    <div className="container">
      <div className='row'>
        <div className='col me-5'>
          <h2 className='mt-3 text-center mb-3'>Formulario de usuarios</h2>
          <form onSubmit = {modoEdicion ? setUpdate : setUsuarios} className='form-group'>
            <input
            onChange = {e => setNombre(e.target.value)}
            className='form-control mb-3' type="text" placeholder='Introduce el nombre' value={nombre}/>
            <input 
            onChange = {e => setPhone(e.target.value)}
            className='form-control mb-3' type="text" placeholder='Introduce el numero' value={phone} />
            <div className='d-grid gap-2"'>
              {
                modoEdicion ?
                <input className='btn btn-outline-primary' type="submit" value='Editar' />
                :
                <input className='btn btn-outline-primary' type="submit" value='Registrar' />
              }
            
            </div>
          </form>
          {
            error ?
            <div>
              <p className='mt-3 text-center'>{error}</p>
            </div>
            :
            <span></span>
          }
        </div>

        <div className='col'>
          <h2 className='mt-3 text-center'>Lista de usuarios</h2>
          {
            usuario.length !==0 ?
            <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Télefono</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                usuario.map(item => 
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.phone}</td>
                  <td><button 
                  onClick={id => pulsarAct(item.id)}
                  className='btn btn-outline-info'>Act</button>
                  </td>
                  <td><button 
                  onClick={id => borrarUsuario(item.id)}
                  className='btn btn-outline-danger'>X</button>
                  </td>
                </tr>  
                  )
              }
              </tbody>
          </table>
          :
          <p>No hay usuarios</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
