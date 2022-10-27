import { NextPage } from "next";
import Layout from "../../components/layout";
import FormTask from "../../components/form";
import { getTaskById } from "../api/tasks";


const TaskPage: NextPage = (props: { task }) => {
    return (
        <Layout>
            <FormTask action="Modify" task={ props.task  }></FormTask>
        </Layout>
    )
}

export async function getServerSideProps({ query: { id } }) {
    let task = await getTaskById(id)
    if(!task) return { notFound: true }
    return {
        props: {
            task
        },
    }
}

export default TaskPage