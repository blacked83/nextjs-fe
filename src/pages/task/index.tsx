import { NextPage } from "next";
import Layout from "../../components/layout";
import FormTask from "../../components/form";


const TaskPage: NextPage = () => {
    return (
        <Layout>
            <FormTask></FormTask>
        </Layout>
    )
}

export default TaskPage