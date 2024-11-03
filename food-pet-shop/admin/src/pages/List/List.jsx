import React, { useState, useContext, useEffect } from 'react';
import { Space, Table, Button, Popconfirm, message, Input, Modal, Form, Upload, Image } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import './List.scss';
import { StoreContext } from '../../context/StoreContext';

const { Search } = Input;
const { Dragger } = Upload;

function List() {
    const { productList, fetchList, url, token } = useContext(StoreContext);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [images, setImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    useEffect(() => {
        setFilteredProductList(productList);
    }, [productList]);

    const showModal = (product) => {
        setEditingProduct(product);
        setImages(product.image || []);
        setDeletedImages([]);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setEditingProduct(null);
        setImages([]);
        setDeletedImages([]);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = ({ fileList }) => {
        setImages(fileList.map(file => ({
            ...file,
            url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : `${url}/images/${file.response?.filename}`
        })));
    };

    const handleRemoveImage = (image) => {
        setDeletedImages(prev => [...prev, image]);
        setImages(prev => prev.filter(img => img !== image));
    };

    const saveEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('id', editingProduct._id);
            Object.keys(editingProduct).forEach(key => {
                if (key !== 'image') {
                    formData.append(`data[${key}]`, editingProduct[key]);
                }
            });

            images.forEach(image => {
                if (image.originFileObj) {
                    formData.append('images', image.originFileObj);
                }
            });

            formData.append('deletedImages', JSON.stringify(deletedImages));
            formData.append('existingImages', JSON.stringify(editingProduct.image || []));

            const response = await axios.post(`${url}/api/product/update`, formData, {
                headers: { token },
                withCredentials: true
            });

            if (response.data.success) {
                message.success('Product updated successfully');
                fetchList();
                setEditingProduct(null);
                setOpen(false);
                setImages([]);
                setDeletedImages([]);
            } else {
                message.error('Failed to update product');
                console.log(response.data.message);
            }
        } catch (err) {
            console.error('Error updating product:', err);
            message.error('Failed to update product');
        }
    };

    const removeProduct = async (productID) => {
        try {
            const response = await axios.post(`${url}/api/product/remove`, { id: productID });
            if (response.data.success) {
                message.success('Product is removed successfully');
                fetchList();
            } else {
                message.error('Failed to remove product');
                console.log(response.data.message);
            }
        } catch (err) {
            console.error('Error removing product:', err);
            message.error('Failed to remove product');
        }
    };

    const onSearch = (value) => {
        if (value) {
            const filtered = productList.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredProductList(filtered);
        } else {
            setFilteredProductList(productList);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Brand', dataIndex: 'brand', key: 'brand' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Subcategory', dataIndex: 'subCategory', key: 'subCategory' },
        { title: 'Stock Quantity', dataIndex: 'stockQuantity', key: 'stockQuantity' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(record)}><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete the product"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => removeProduct(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='title'>
                <h3>List Product</h3>
                <Search placeholder="input search text" onSearch={onSearch} allowClear style={{ width: 200 }} />
            </div>
            <Table columns={columns} dataSource={filteredProductList} rowKey="_id" />
            <Modal
                title="Edit Product"
                open={open}
                onOk={saveEdit}
                onCancel={handleCancel}
            >
                {editingProduct && (
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            <Input value={editingProduct.name} name="name" onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Brand">
                            <Input value={editingProduct.brand} name="brand" onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input value={editingProduct.price} name="price" onChange={handleEditChange} type="number" />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Input value={editingProduct.category} name="category" onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Subcategory">
                            <Input value={editingProduct.subCategory} name="subCategory" onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Stock Quantity">
                            <Input value={editingProduct.stockQuantity} name="stockQuantity" onChange={handleEditChange} type="number" />
                        </Form.Item>
                        <Form.Item label="Quantity Sold">
                            <Input value={editingProduct.quantitySold} name="quantitySold" onChange={handleEditChange} type="number" />
                        </Form.Item>
                        <Form.Item label="Point">
                            <Input value={editingProduct.point} name="point" onChange={handleEditChange} type="number" />
                        </Form.Item>
                        <Form.Item label="Rate">
                            <Input value={editingProduct.rate} name="rate" onChange={handleEditChange} type="number" />
                        </Form.Item>
                        <Form.Item label="Options">
                            <Input value={editingProduct.options.join(', ')} name="options" onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Images">
                            <Dragger
                                multiple
                                fileList={images.map((img, index) => ({
                                    uid: index,
                                    name: `image-${index + 1}`,
                                    status: 'done',
                                    url: img.url ? img.url : `${url}/images/${img}`,
                                    originFileObj: img.originFileObj,
                                }))}
                                listType="picture"
                                onChange={handleImageUpload}
                                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Drag and drop images here, or click to select images</p>
                            </Dragger>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                {images.map((image, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <Image
                                            src={image.url ? image.url : `${url}/images/${image}`}
                                            alt={`image-${index + 1}`}
                                            width={100}
                                            height={100}
                                        />
                                        <Button
                                            type="primary"
                                            danger
                                            size="small"
                                            style={{ position: 'absolute', top: 5, right: 5 }}
                                            onClick={() => handleRemoveImage(image)}
                                        >
                                            X
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
}

export default List;
