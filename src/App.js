import { Col, Container, Row, Table } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {



  let [formData, setFormData] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''

    }
  );



  let [userData, setUserData] = useState([]);



  let getValue = (event) => {
    let oldData = { ...formData }
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  }



  let submitForm = (event) => {

    let currentUserFormData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,

    }

    if(formData.index===""){
    let checkFilterUser = userData.filter((v) => v.uemail == formData.uemail || v.uphone == formData.uphone)

    if (checkFilterUser.length == 1) {
      // alert("PhoneNumber or Email already exists")
      toast.error("phoneNumber or password already exists")
    } else {
      let oldUserData = [...userData, currentUserFormData];//old array + new array ele
      // let newUserData = [...userData]
      // newUserData.push(formData);
      setUserData(oldUserData);
      setFormData({
        uname: '',
        uemail: '',
        uphone: '',
        umessage: '',
        index: ''
      });
    }
    toast.success("Data Entered")
  }
  else{
    let editIndex = formData.index;
    let oldData = userData;
    let checkFilterUser = userData.filter((v,i) =>( v.uemail == formData.uemail || v.uphone == formData.uphone)&& i!=editIndex)
    
    
    if(checkFilterUser.length==0){
      oldData[editIndex]['uname']=formData.uname;
      oldData[editIndex]['uemail']=formData.uemail;
      oldData[editIndex]['uphone']=formData.uphone;
      oldData[editIndex]['umessage']=formData.umessage;
      
      setUserData(oldData);
      setFormData({
        uname: '',
        uemail: '',
        uphone: '',
        umessage: '',
        index: ''
      });
      toast.success("Update Data")
  }else{
    toast.error("phoneNumber or password already exists")
  }

  }
    event.preventDefault();

  };






  let deleteRow = (indexNumber) => {
    let filterDataAfterDelete = userData.filter((v, i) => i != indexNumber)
    toast.success("Successfully Deleted")
    setUserData(filterDataAfterDelete)
  }




  let editRow = (indexNumber) => {
    let editData = userData.filter((v, i) => i == indexNumber)[0]
    editData['index'] = indexNumber;
    setFormData(editData)
  }





  return (
    <Container fluid>
      <ToastContainer />
      <Container>
        <Row>
          <Col className='text-center py-5'>
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit={submitForm}>
              <div className='pb-3'>
                <label className='form-label'>Name</label>
                <input type='text' onChange={getValue} name='uname' value={formData.uname} className='form-control' placeholder='Enter your name' />
              </div>
              <div className='pb-3'>
                <label className='form-label'>Email</label>
                <input type='email' onChange={getValue} name='uemail' value={formData.uemail} className='form-control' placeholder='Enter your email' />
              </div>
              <div className='pb-3'>
                <label className='form-label'>Phone</label>
                <input type='text' onChange={getValue} name='uphone' value={formData.uphone} className='form-control' placeholder='Enter your phone' />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Message</label>
                <textarea className='form-control' onChange={getValue} value={formData.umessage} name="umessage" id="" rows={3}></textarea>
              </div>
              <button type='submit' className='btn btn-primary'>
                {formData.index !== "" ? 'Update' : 'Save'}
              </button>
            </form>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ?
                  userData.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td>
                          <button onClick={() => deleteRow(i)}>Delete</button>
                          <button onClick={() => editRow(i)}>Update</button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={6}>
                      No Data Found
                    </td>
                  </tr>
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
