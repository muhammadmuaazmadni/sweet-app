import React from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import Url from '../../baseUrl/BaseUrl'
function AddProducts() {

    function addProduct(e) {
        e.preventDefault()
        var fileInput = document.getElementById("customFile");
        var productName = document.getElementById("pName");
        var price = document.getElementById("price");
        var description = document.getElementById("description");
        var stock = document.getElementById("stock");
        let formData = new FormData();
        formData.append("myFile", fileInput.files[0]);
        formData.append("productName", productName.value);
        formData.append("price", price.value);
        formData.append("description", description.value);
        formData.append("stock", stock.value);

        axios({
            method: 'post',
            url: Url + "/addProduct",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(response => {
                console.log("response data=> ", response);
            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <div>
            <Navbar />
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome Admin</h2>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <form onSubmit={addProduct}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Product Name</label>
                                    <input type="text" className="form-control" id="pName" placeholder="Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Price</label>
                                    <input type="number" className="form-control" id="price" placeholder="Price" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Stock</label>
                                    <input type="text" className="form-control" id="stock" placeholder="Stock" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Description</label>
                                    <input type="text" className="form-control" id="description" placeholder="Description" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" />
                                    <label className="custom-file-label" for="customFile">Choose Image</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Confirm Order</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts;