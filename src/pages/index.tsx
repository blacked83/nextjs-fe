import type { NextPage } from 'next'
import { getTasks, deleteTask, completeTask } from './api/tasks'
import Layout from '../components/layout'

const IndexPage: NextPage = (props: { tasks } ) => {

  async function sendDeleteTask(){
    let btn = document.getElementById('modalAction')
    btn.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>'
    let id = document.getElementById('staticBackdrop').dataset.taskId
    try{
      let del = await deleteTask(id)
      btn.innerHTML = 'Delete'
      if(!del)
        throw new Error('Failed to fetch API')
      location.reload()
    }catch(e){
      document.querySelector('.modal-footer span').innerHTML = 'Fail process, try again!'
      btn.innerHTML = 'Delete'
    }
  }

  async function sendCompleteTask(){
    let btn = document.getElementById('modalAction')
    btn.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>'
    let id = document.getElementById('staticBackdrop').dataset.taskId
    try{
      let complete = await completeTask(id)
      btn.innerHTML = 'Complete'
      if(!complete)
        throw new Error('Failed to fetch API')
      location.reload()
    }catch(e){
      document.querySelector('.modal-footer span').innerHTML = 'Fail process, try again'
      btn.innerHTML = 'Complete'
    }
  }

  function modalDeleteTask(id){
    document.getElementById('staticBackdrop').dataset.taskId = id
    let name = document.getElementById(`task${id}`).children[1].innerHTML;
    document.getElementsByClassName('modal-title')[0].innerHTML = 'Delete Task';
    document.getElementsByClassName('modal-body')[0].innerHTML = `Do you want to delete the task "${name}"?`;
    document.getElementById('modalAction').className = 'btn btn-danger';
    document.getElementById('modalAction').innerHTML = 'Delete';
    document.getElementById('modalAction').removeEventListener('click', sendCompleteTask);
    document.getElementById('modalAction').addEventListener('click', sendDeleteTask);
  }

  function modalCompleteTask(id){
    document.getElementById('staticBackdrop').dataset.taskId = id
    let name = document.getElementById(`task${id}`).children[1].innerHTML;
    document.getElementsByClassName('modal-title')[0].innerHTML = 'Complete Task';
    document.getElementsByClassName('modal-body')[0].innerHTML = `Do you want to complete the task "${name}"?`;
    document.getElementById('modalAction').className = 'btn btn-success';
    document.getElementById('modalAction').innerHTML = 'Complete';
    document.getElementById('modalAction').removeEventListener('click', sendDeleteTask);
    document.getElementById('modalAction').addEventListener('click', sendCompleteTask);
  }

  return (
    <Layout>
      <div className='text-end mb-5'>
        <button type="button" className="btn btn-primary" onClick={ () => { location.href = '/task'} }>
          <i className="fa fa-plus" aria-hidden="true" title="Add"></i>
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <caption>List of Tasks</caption>
          <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Author</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            { props.tasks && props.tasks.length > 0 ? props.tasks.map((task) => { 
            let created = new Date(task.createdAt); 
            return (
              <tr id={'task'+task.id} key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.author}</td>
                <td className={ task.isComplete === true ? 'text-success fw-bold' : 'text-danger fw-bold' }>{task.isComplete === true ? 'Completed' : 'Pending'}</td>
                <td>{ created.getFullYear() + '-' + (created.getMonth() + 1) + '-' + created.getDate() }</td>
                <td>
                  <button type="button" className="btn btn-primary">
                    <i className="fa fa-pencil" aria-hidden="true" title="Edit" onClick={ () => { location.href = `task/${ task.id }` } }></i>
                  </button>
                  <button type="button" typeof='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={ () => modalCompleteTask(task.id) } className="btn btn-success mx-2" disabled={task.isComplete}>
                    <i className="fa fa-check-square-o" aria-hidden="true" title="Complete"></i>
                  </button>
                  <button type="button" typeof='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={ () => modalDeleteTask(task.id) } className="btn btn-danger">
                    <i className="fa fa-trash-o" aria-hidden="true" title="Delete"></i>
                  </button>
                </td>
              </tr>
            ) }) : !props.tasks ? <tr><td colSpan={6} className="text-danger fw-bold">Http request failure</td></tr>  : <tr><td colSpan={6} className="fw-bold">No records to show</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Remove Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Do you want to delete the task?
            </div>
            <div className="modal-footer">
              <span className='text-danger fs-6'></span>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" id='modalAction' className="btn btn-danger" >Delete</button>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  let tasks = await getTasks()
  return {
    props: {
      tasks
    },
  }
}

export default IndexPage
