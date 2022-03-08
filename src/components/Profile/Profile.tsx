import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Tab } from 'react-bootstrap';
import { getCurrentUser } from '../../services/auth.service'
import { getCategoryList } from '../../services/controllers/category/category.service';


const Profile = () => {
    const [currentUser, setCurrentUser] = useState<any>(undefined);
    const [categoryList, setCategoryList] = useState<any[]>([]);

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <div>
            <h1 className="text-center">Profile</h1>
            <div className="container">

                {currentUser ? (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="text-center">{currentUser.username.toUpperCase()}</Card.Title>
                            <Card.Text>
                                {currentUser.token}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : 'Please login to continue'}

            </div>

        </div>
    )
}

export default Profile