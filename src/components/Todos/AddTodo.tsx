import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import useForm from '../../hooks/userForm'
import status from '../../services/controllers/status'
import todo from '../../services/controllers/todo'


interface IAddTodoProps {
    categoryList: any
    onSave: any
}

const AddTodo: React.FC<IAddTodoProps> = (props) => {
    const form = useForm();
    const [statusList, setStatusList] = React.useState<Array<any>>([]);

    useEffect(() => {
        if (form.values?.categoryId) {
            status
                .list({ categoryId: form.values?.categoryId })
                .then(({ data }) => { setStatusList(data) })
        } else {
            setStatusList([]);
        }
    }, [form.values?.categoryId]);

    const clickAddTodo = () => {
        todo
            .create({
                title: form.values.newTodo,
                categoryId: form.values.categoryId,
                statusId: form.values.statusId
            }).then(({ data }) => {
                props.onSave?.(data)
            })
    }

    return (
        <Form>
            <Row className="my-3">
                <Form.Group as={Col} controlId="formGridTodo">
                    <Form.Control type="text" placeholder="Enter Todo" onChange={form.handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Select defaultValue="Choose..." onChange={form.handleSelectChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus" >
                    <Form.Select defaultValue="Choose..." onChange={form.handleSelectChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGrid">
                    <Button type="submit" variant="primary" onClick={clickAddTodo}>Add</Button>
                </Form.Group>
            </Row>
        </Form>
    )
}

export default AddTodo;