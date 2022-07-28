// import RichTextEditor from './utill/RichTextEditor'
// const Popup = () => {
//   return (
//     <div className="popup-form fixed w-full h-screen top-0 bg-[#57535380] to-transparent overflow-scroll">
//       <div className="popup-form-content bg-white rounded-sm m-auto w-full md:w-2/3 p-5  flex-col flex md:mt-[5%] space-y-4 relative">
//         <button
//           onClick={() => {
//             closePopUp()
//           }}
//           className="absolute top-1 right-3"
//         >
//           <i className="fa-solid fa-xmark"></i>
//         </button>
//         <h2 className="text-lg text-center">Edit Product</h2>
//         <form
//           encType="multipart/form-data"
//           onSubmit={(e) => formHandler(e)}
//           className="flex flex-col space-y-4"
//           id="editForm"
//         >
//           <input type="hidden" value={ProductId} />
//           <div className="flex flex-col space-y-1">
//             <label htmlFor="name">Name *</label>
//             <input
//               type="text"
//               placeholder="Name"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex flex-col space-y-1">
//             <label htmlFor="description">Description *</label>
//             <RichTextEditor setValue={setDescription} content={description} />
//           </div>
//           <div className="flex space-x-4">
//             <div className="flex flex-col space-y-1 w-full">
//               <label htmlFor="email">Price *</label>
//               <input
//                 type="number"
//                 placeholder="Price"
//                 id="price"
//                 value={price}
//                 required
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col space-y-1 w-full">
//               <label htmlFor="email">Stock *</label>
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 id="stock"
//                 value={stock}
//                 required
//                 onChange={(e) => setStock(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label htmlFor="category">Category *</label>
//             <select
//               id="category"
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option disabled> Select Category</option>
//               <option> Category 1</option>
//             </select>
//           </div>
//           <div className="flex flex-col space-y-1">
//             <label htmlFor="brand">Brand *</label>
//             <select
//               id="brand"
//               onChange={(e) => setBrand(e.target.value)}
//               required
//             >
//               <option disabled> Select Brand</option>
//               <option> Brand 1</option>
//             </select>
//           </div>
//           <div className="flex space-x-4">
//             <div className="flex flex-col space-y-1 w-full">
//               <label htmlFor="image">Image *</label>
//               <input
//                 type={'file'}
//                 id="image"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </div>
//             <div className="flex w-full">
//               <img src={image} className="w-20 h-20" alt="" />
//             </div>
//           </div>
//           <div className="flex space-x-4 justify-center">
//             <button
//               type="submit"
//               className="bg-[#32CD32] text-white px-6 py-2"
//               disabled={loadingEdit}
//             >
//               {loadingEdit ? 'Saving...' : 'Save'}
//             </button>
//             <button
//               onClick={() => {
//                 closePopUp()
//               }}
//               type="button"
//               className="bg-black text-white px-6 py-2"
//             >
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Popup
