import React, { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import userForm from '../../hooks/userForm'
import status from '../../services/controllers/status'
import todo from '../../services/controllers/todo'

interface TodoItemProps {
    data: any
    categoryList: any
    onUpdate: (data: any) => void
}
const Todo: React.FC<TodoItemProps> = (props) => {
    const form = userForm({
        categoryId: props.data.categoryId,
        statusId: props.data.statusId,
        title: props.data.title,
    })
    const [statusList, setStatusList] = useState<Array<any>>([]);
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        status.list({ categoryId: form.values?.categoryId }).then(({ data }) => { setStatusList(data) })
    }, [form.values?.categoryId])

    useEffect(() => {
        status.getById(form.values?.statusId).then(({ data }) => { setColor(data.color) })
    }, [form.values?.statusId])

    const handleUpate = () => {
        todo.update(props.data.id, form.values).then(({ data }) => {
            props.onUpdate?.(data)
        })
    }

    return (
        <ListGroup.Item variant={color}>
            <Row className="my-3">
                <Form.Group as={Col} controlId="formGridTodo">
                    <Form.Control type="text" placeholder="Enter Todo" value={props.data.title} onChange={form.handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Select defaultValue="Choose..." onChange={form.handleSelectChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus" >
                    <Form.Select defaultValue="Choose..." onChange={form.handleSelectChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGrid">
                    <Button type="submit" variant="primary" onClick={handleUpate}>Save</Button>
                </Form.Group>
            </Row>
        </ListGroup.Item>
    )
}

export default Todo;