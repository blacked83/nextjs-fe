import { useRouter } from "next/router";
import { addTask, getTaskById, getTasks, putTask } from "../pages/api/tasks";

export default function FormTask({ action = 'Add', task = null }) {

    const validateForm = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById('formtask').classList.add('was-validated')
        let id = event.target.id.value.length > 0 ? parseInt(event.target.id.value) : undefined
        let name = event.target.name.value.trim();
        let description = event.target.description.value.trim();
        let author = event.target.author.value.trim();
        let isComplete = event.target.isComplete.value == 'false' ? false : true;
        if(name.length > 0 && description.length > 0 && author.length > 0){
            document.getElementById('btnAction').innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>'
            let resp
            if(id){
                resp = await putTask(id, { name, description, author, isComplete })
            }else{
                resp = await addTask({ name, description, author, isComplete })
            }
            document.getElementById('btnAction').innerHTML = 'Save'
            if(!resp)
                return document.getElementById('formerror').innerHTML = "Fail process, try again!";
            location.href = '/'
        }
    }

    return (
        <>
        <div className="my-5 fs-1 fw-bold">{ action } Task</div>
        <form name="formtask" id="formtask" className="needs-validation" onSubmit={validateForm} noValidate>
            <input type="hidden" id="id" value={ task?.id } />
            <div className="mb-3 row">
                <label htmlFor="name" className="col-form-label col-3 text-end"><b>Name:</b></label>
                <div className="col-9">
                    <input type="text" className="form-control" name="name" id="name" maxLength={20} value={ task?.name } required />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="description" className="col-form-label col-3 text-end"><b>Description:</b></label>
                <div className="col-9">
                    <textarea className="form-control" name="description" id="description" required>{ task?.description }</textarea>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="author" className="col-form-label col-3 text-end"><b>Author:</b></label>
                <div className="col-9">
                    <input type="text" className="form-control" name="author" id="author" maxLength={20} value={ task?.author } required />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="isComplete" className="col-form-label col-3 text-end"><b>Status:</b></label>
                <div className="col-9">
                    <select className="form-select" name="isComplete" id="isComplete">
                        <option selected={ !task?.isComplete } value="false">Pending</option>
                        <option selected={ task?.isComplete } value="true">Completed</option>
                    </select>
                </div>
            </div>
            <div className="fs-6 fw-bold text-end text-danger" id="formerror"></div>
            <div className="mt-5">
                <button type="button" className="btn btn-secondary me-3" onClick={() => { location.href = "/" }}>Cancel</button>
                <button type="submit" id="btnAction" className="btn btn-primary">Save</button>
            </div>
        </form>
        </>
    )
}