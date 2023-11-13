import axios from "axios";
import React, { useState } from "react";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "../../store/reducers/leadsReducers";
import categories from "../../assets/category";
import countries from "../../assets/country";

const CreateNewLeadModal = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [disable, setDisable] = useState(false);
  const [msg, setMsg] = useState(null);
  const state = useSelector((state) => state.app);
  const {theme} = useSelector((state) => state.app);

  const { currentUser } = useSelector(
    (state) => state.users
  );


  const alert = {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const reset = (event) => {
    event.target.description.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
    event.target.designation.value = "";
    event.target.contactParson.value = "";
    event.target.category.value = "";
    event.target.country.value = "";
    event.target.website.value = "";
    event.target.company.value = "";
  };

  const handleCreateNewLead = async (event) => {
    event.preventDefault();
    setPending(true);
    const data = {
      description: event.target.description.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      designation: event.target.designation.value,
      contactParson: event.target.contactParson.value,
      category: event.target.category.value,
      country: event.target.country.value,
      website: event.target.website.value,
      company: event.target.company.value,
      minor: currentUser.role == "ADMIN" ? "Admin": currentUser.name,
    };

    await axios
      .post(`${siteInfo.api}/leads`, data)
      .then((res) => {
        toast.success("New Lead Added", alert);
        dispatch(addLead(res.data));
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
      });

    reset(event);
    setPending(false);
  };

  const handleValueCheck = async (e,item) => {
    const params = { value: e.target.value, path: item };
    
    try {
      const res = await axios.get(`${siteInfo.api}/leads/checkValue`, {
        params,
      });
      if(res.data != null){
        setMsg(`this ${item} is already exist`)
        setDisable(true);
      }else{
        setMsg(null)
        setDisable(false)
      }
    } catch (error) {
      toast.error(`Getting error while check the ${item} value is exist or not! pls try again letter`);
    }
  }

  

  const inputStyle = ()  => {
    if(theme == "DARK"){
      return {
        background: "#0a1929",
        border: "1px solid #93c5fd",
        color: "#f5f5f5",
       }
    }else{
      return {
      }
    }
  }

  return (
    <div className={`  px-2 py-4`}>
      <input
        type="checkbox"
        id="create_newlead_modal"
        className="modal-toggle"
      />
      <div className={`  modal px-2 py-4`}>
        <div className={` modal-box  ${state.theme == "DARK" ? 'dark': 'light'} max-w-3xl h-[75vh] overflow-y-scroll`}>
          <form
            onReset={reset}
            onSubmit={handleCreateNewLead}
            className=" w-10/12 mx-auto"
          >
            <h1 className="text-3xl font-semibold   mb-2">
              Create New Lead{" "}
            </h1>

            {msg && <h1 className="text-2xl text-center font-semibold text-red-600 my-2">
              {msg}
            </h1>}

            <section className="  ">
              <div className=" flex  justify-between">
                {/* Left side of form  */}
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="text-lg font-medium  "
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      style={inputStyle()}
                      required
                      className="mt-1 block w-72 h-10 border border-gray-300 rounded-md mr-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="text-lg font-medium  ">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      style={inputStyle()}
                      onChange={(e)=> handleValueCheck(e,'website')}
                      required
                      className="mt-1 block w-72 h-10 border border-gray-300 rounded-md mr-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-3 flex flex-col">
                    <label className="text-lg font-medium  ">
                      Country
                    </label>
                    <select
                      name="country"
                      style={inputStyle()}
                      required
                      className=" select-bordered  border border-gray-300  w-72 ml-0 mr-2 h-10 rounded-md"
                    >
                      <option>
                      </option>
                      {countries.map(country=>{
                        return <option className="capitalize" key={country}> {country} </option>
                      })}
                    </select>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-lg font-medium  "
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      style={inputStyle()}
                      required
                      className=" select-bordered  border border-gray-300  w-72 ml-0 mr-2 h-10 rounded-md"
                    >
                      <option>
                      </option>
                      {categories.map(category=>{
                        return <option className="capitalize" key={category}> {category} </option>
                      })}
                    </select>
                  </div>
                  {/* Left side of form end  */}
                </div>

                {/* Right side of form start  */}
                <div>
                  <div className="mb-3">
                    <label className="text-lg font-medium  ">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      style={inputStyle()}
                      name="contactParson"
                      className="mt-1 block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="text-lg font-medium  ">
                      Designation
                    </label>
                    <input
                      type="text"
                      style={inputStyle()}
                      name="designation"
                      className="mt-1 block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="text-lg font-medium  ">
                      Phone
                    </label>
                    <input
                    style={inputStyle()}
                      type="number"
                      onChange={(e)=> handleValueCheck(e,'phone')}
                      name="phone"
                      className=" block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="text-lg font-medium  "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      style={inputStyle()}
                      onChange={(e)=> handleValueCheck(e,'email')}
                      name="email"
                      className=" block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Right side of form end   */}
              </div>

              {/* Text area for  description   */}
              <div className="w-full mx-auto">
                <label className="text-lg font-medium  ">
                  {" "}
                  Description{" "}
                </label>
                <textarea
                  placeholder=" "
                  style={inputStyle()}
                  name="description"
                  className="textarea textarea-bordered textarea-lg w-full mt-2  "
                ></textarea>
              </div>
            </section>
            <div className="">
              <div className="modal-action">
                <label
                  htmlFor="create_newlead_modal"
                  className="h-10 flex items-center text-white rounded-sm px-6 py-0 border-none bg-rose-600 hover:bg-rose-700"
                >
                  {" "}
                  Close
                </label>
                <button
                  type="reset"
                  disabled={pending}
                  className="  px-6 py-0   rounded-sm h-10 text-white bg-yellow-500 hover:bg-yellow-700   "
                >
                  {"Reset"}
                </button>
                <button
                  type="submit"
                  disabled={pending || disable}
                  className="  px-6 py-0   rounded-sm h-10 text-white bg-green-500 hover:bg-green-700   "
                >
                  {pending ? "Pending..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewLeadModal;
