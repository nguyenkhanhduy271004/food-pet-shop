import React, { useState } from 'react';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { Image, Upload, Button, Modal } from 'antd';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import './Add.scss';

const { Dragger } = Upload;

function Add({ url }) {
    const [fileList, setFileList] = useState([]);
    const [data, setData] = useState({
        name: '',
        brand: '',
        price: '',
        category: 'dog',
        subCategory: '',
        stockQuantity: ''
    });

    const props = {
        name: 'file',
        multiple: true,
        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        },
        onChange(info) {
            let newFileList = [...info.fileList];

            if (info.file.status === 'done') {
                toast.success(`${info.file.name} file uploaded successfully.`);
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} file upload failed.`);
            }

            setFileList(newFileList);
        },
        onRemove(file) {
            setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (fileList.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("brand", data.brand);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append('subCategory', data.subCategory);
        formData.append('stockQuantity', data.stockQuantity);

        fileList.forEach((file, index) => {
            formData.append(`images`, file.originFileObj);
        });

        try {
            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                setData({
                    name: '',
                    brand: '',
                    price: '',
                    category: 'dog',
                    subCategory: ''
                });
                setFileList([]);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || "Failed to add product");
            }
        } catch (error) {
            console.error('Network Error:', error);
            toast.error(error.response?.data?.message || "Network error occurred");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p>Upload Image</p>
                        <div>
                            {fileList.map((file, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={URL.createObjectURL(file.originFileObj)}
                                    />
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        style={{ position: 'absolute', top: '0', right: '0' }}
                                        onClick={() => {
                                            setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Dragger {...props} style={{ width: '400px' }} fileList={fileList}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Upload more images</p>
                        </Dragger>
                    </div>
                </div>
                <div className="add-product-name flex-col">
                    <p>Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Type here'
                        required
                    />
                </div>
                <div className="add-product-brand flex-col">
                    <p>Brand</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.brand}
                        name="brand"
                        placeholder='Type here'
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            required
                        >
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="turtle-and-fish">Turtle and Fish</option>
                        </select>
                    </div>
                    <div className="sub-category-price flex-col">
                        <p>Subcategory</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.subCategory}
                            type="text"
                            name='subCategory'
                            placeholder='Food'
                            required
                        />
                    </div>
                    <div className="stock-quantity flex-col">
                        <p>Stock Quantity</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.stockQuantity}
                            type="text"
                            name='stockQuantity'
                            placeholder='1000'
                            required
                        />
                    </div>
                    <div className="add-price flex-col">
                        <p>Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='15'
                            min={0}
                            required
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form >
        </div >
    );
}

export default Add;
