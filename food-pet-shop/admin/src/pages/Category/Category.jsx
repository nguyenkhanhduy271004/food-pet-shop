import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Upload, message, Modal } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;

function Category({ url }) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingCategory, setEditingCategory] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${url}/api/category/list-category`);
            if (response.data.success) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        newImages.forEach((image) => formData.append('images', image));

        try {
            const response = await axios.post(`${url}/api/category/add-category`, formData);
            if (response.data.success) {
                message.success('Category added successfully');
                fetchCategories();
                setNewCategory({ name: '', description: '' });
                setNewImages([]);
                setIsAddModalVisible(false);
            }
        } catch (error) {
            console.error('Error adding category:', error);
            message.error('Failed to add category');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`${url}/api/category/delete-category/${categoryId}`);
            if (response.data.success) {
                message.success('Category deleted successfully');
                fetchCategories();
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            message.error('Failed to delete category');
        }
    };

    const showEditModal = (category) => {
        setEditingCategory(category);
        setOldImages(category.images || []);
        setNewImages([]);
        setDeletedImages([]);
        setIsEditModalVisible(true);
    };

    const handleUpdateCategory = async () => {
        const formData = new FormData();
        formData.append('data[id]', editingCategory._id);
        formData.append('data[name]', editingCategory.name);
        formData.append('data[description]', editingCategory.description);

        newImages.forEach((image) => formData.append('images', image));
        formData.append('deletedImages', JSON.stringify(deletedImages));

        try {
            const response = await axios.put(`${url}/api/category/update-category/${editingCategory._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                message.success('Category updated successfully');
                fetchCategories();
                setEditingCategory(null);
                setNewImages([]);
                setDeletedImages([]);
                setIsEditModalVisible(false);
            } else {
                message.error('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            message.error('Failed to update category');
        }
    };

    const columns = [
        { title: 'Category Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Images',
            key: 'images',
            render: (text, record) => (
                <div>
                    {record.images && record.images.map((image, index) => (
                        <img
                            key={index}
                            src={`${url}/images/${image}`}
                            alt={record.name}
                            style={{ width: '50px', height: '50px', marginRight: '8px' }}
                        />
                    ))}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                        style={{ marginRight: '4px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteCategory(record._id)}
                        danger
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="category">
            <div style={{ marginBottom: '10px' }}><h2>Manage Categories</h2></div>

            <Button
                type="primary"
                onClick={() => setIsAddModalVisible(true)}
                style={{ marginBottom: '16px' }}
            >
                Add Category
            </Button>

            <Table dataSource={categories} columns={columns} rowKey="_id" />

            <Modal
                title="Add Category"
                open={isAddModalVisible}
                onOk={handleAddCategory}
                onCancel={() => setIsAddModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Category Name">
                        <Input
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Images">
                        <Upload
                            beforeUpload={(file) => {
                                setNewImages([...newImages, file]);
                                return false;
                            }}
                            onRemove={(file) => setNewImages(newImages.filter((img) => img.uid !== file.uid))}
                            fileList={newImages.map((img, index) => ({
                                uid: index,
                                name: img.name || img.url,
                                status: 'done',
                                url: img.url || `${url}/images/${img}`,
                                originFileObj: img,
                            }))}
                        >
                            <Button icon={<UploadOutlined />}>Select Images</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Category"
                open={isEditModalVisible}
                onOk={handleUpdateCategory}
                onCancel={() => setIsEditModalVisible(false)}
            >
                {editingCategory && (
                    <Form layout="vertical">
                        <Form.Item label="Category Name">
                            <Input
                                value={editingCategory.name}
                                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input
                                value={editingCategory.description}
                                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Images">
                            <Dragger
                                multiple
                                beforeUpload={(file) => {
                                    setNewImages([...newImages, file]);
                                    return false;
                                }}
                                fileList={[
                                    ...oldImages.map((img, index) => ({
                                        uid: index,
                                        name: img,
                                        status: 'done',
                                        url: `${url}/images/${img}`,
                                    })),
                                    ...newImages.map((img, index) => ({
                                        uid: `new-${index}`,
                                        name: img.name,
                                        status: 'done',
                                        originFileObj: img,
                                    })),
                                ]}
                                onRemove={(file) => {
                                    if (file.uid.startsWith('new')) {
                                        setNewImages(newImages.filter((img) => img.uid !== file.uid));
                                    } else {
                                        setOldImages(oldImages.filter((img) => img !== file.name));
                                        setDeletedImages([...deletedImages, file.name]);
                                    }
                                }}
                                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                            >
                                <p className="ant-upload-drag-icon">
                                    <UploadOutlined />
                                </p>
                                <p className="ant-upload-text">Drag and drop images here, or click to select images</p>
                            </Dragger>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}

export default Category;
