import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from "@mui/material";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import ShowMsg from "../Shared/ShowMsg";
import moment from "moment";
import AssignModal from "../Shared/AssignModal";
import EditLeadModal from "../Shared/EditLeadModal";
import AddToTrashModal from "../Shared/AddToTrashModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FollowUpModal from "../Shared/FollowUpModal";

const LeadPage = () => {
  const { showLeads, leadsError, pending } = useSelector(
    (state) => state.leads
  );
  const { theme } = useSelector(
    (state) => state.app
  );
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState("");
  const [ID, setID] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    setError(null);
    setLoading(true);
    axios
      .get(`${siteInfo.api}/leads/getOneLeadByLeadsNo/${id}`)
      .then((res) => {
        if(res.data){
          setLead(res.data);
          setLoading(false);
        }else{
          setError(ture);
          setLoading(false);
      }})
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id, showLeads]);

  const style = {
    background: "#5f9ea069",
    borderRadius: "4px",
  };

  const handleTrashModal = () => {
    setID(null);
    navigate(-1);
  };

  const handleDltRemark = async (remark) => {
    try {
      await axios
        .patch(`${siteInfo.api}/leads/deleteRemark/${lead.id}`, remark)
        .then((res) => {
          setLead(res.data);
          toast.success("Remark Deleted");
        });
    } catch (error) {
      toast.error(error.massage);
    }
  };

  const handleChangeLead = (e) => {
    navigate(`/leads/${e.target.value}`)
    // setError(null);
    // setLoading(true);
    // axios
    //   .get(`${siteInfo.api}/leads/getOneLeadByLeadsNo/${e.target.value}`)
    //   .then((res) => {
    //     if(res?.data?.id){
    //       setLead(res.data);
    //       setLoading(false);
    //     }else{
    //       setError({massage: "Lead Not Found"});
    //       setLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     setLoading(false);
    //   });
  }

  const isShow = () => {
    return currentUser.id == lead.followerID || currentUser.role == "ADMIN";
  };

  const isFollow = () => {
    if(currentUser.role != "ADMIN"){
      return lead.followerID == currentUser.id || lead.followerID == null;
    }
    
  };

  const setUrl = (url) => {

    const urlPattern = /^(http|https):\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-z]{2,6}(\:[0-9]+)?(\/.*)?$/;
    if(urlPattern.test(url)){
      const domain = new URL(url).hostname.replace(/^www\./, '');
      return domain;
    }
    else{
      return url;
    }
}

  const leadNoStyle = {
    marginLeft: "20px",
    border: "none",
    background: theme == "DARK" ? "#2d505a" : "#bdd7d8",
    textAlign: "center",
    fontSize: "26px",
    padding: "10px",
    outline: "none",
    borderRadius: "10px",
    letterSpacing: "4px",
  }

  return (
    <Layout>
      {loading && <ShowMsg>Lead loading...</ShowMsg>}
      {error && <ShowMsg><h1>Lead Not Found</h1></ShowMsg>}
      {!loading && !error && (
        <div>
          <div className="flex justify-between my-4 px-3 gap-4">
            <h2 className="font-bold my-3">Showing Lead 
            <input style={leadNoStyle} onChange={handleChangeLead} defaultValue={lead.leadsNo} type="number" />
            </h2>
            <div>
              {isFollow() && (
                <Button
                  variant="text"
                  color="info"
                  onClick={() => setID(lead.id)}
                >
                  <label htmlFor="folloUP-modal" className="cursor-pointer">
                    <ReplyIcon />
                  </label>
                </Button>
              )}
              {currentUser?.role == "ADMIN" && (
                <Button
                  variant="text"
                  color="info"
                  onClick={() => setID(lead.id)}
                >
                  <label htmlFor="assign-lead-modal" className="cursor-pointer">
                    <AssignmentReturnedIcon />
                  </label>
                </Button>
              )}
              {isShow() && (
                <Button
                  onClick={() => setID(lead.id)}
                  variant="text"
                  color="warning"
                >
                  <label htmlFor="edit-lead-modal" className="cursor-pointer">
                    <EditCalendarIcon />
                  </label>
                </Button>
              )}
              {isShow() && (
                <Button
                  onClick={() => setID(lead.id)}
                  variant="text"
                  color="error"
                >
                  <label htmlFor="addToTrashModal" className="cursor-pointer">
                    <DeleteIcon />
                  </label>
                </Button>
              )}
            </div>
          </div>

          {ID && <FollowUpModal id={ID} setFollowUp={setID} />}
          {ID && <AssignModal id={ID} setAssignItem={setID}></AssignModal>}
          {ID && <EditLeadModal id={ID}></EditLeadModal>}
          {ID && (
            <AddToTrashModal
              item={lead}
              handleTrashModal={handleTrashModal}
            ></AddToTrashModal>
          )}

          <div className="flex justify-between px-3 gap-4">
            <div className=" capitalize border-1 w-full">
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Company :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.company}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Website :
                </h3>
                <h3 className="text-center w-full lowercase  p-2 ">
                  <a
                    className="text-blue-400"
                    target="_blank"
                    href={"https://" + setUrl(lead.website)}
                  >
                    {setUrl(lead.website)}
                  </a>
                </h3>
              </div>
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Country :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.country}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Category :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.category}
                </h3>
              </div>
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  possibility :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.possibility}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Created :
                </h3>
                <h3 className="text-center w-full  p-2 ">
                  {moment(lead.createdOn).format("D MMM YYYY hh:mm A")}
                </h3>
              </div>
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Minor :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.minor}
                </h3>
              </div>
            </div>
            <div className=" capitalize border-1 w-full">
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Contact Parson :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.contactParson}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Designation :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.designation}
                </h3>
              </div>
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Phone :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.phone}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Email :
                </h3>
                <h3 className="text-center lowercase w-full p-2 ">
                  {lead.email}
                </h3>
              </div>
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Status :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.status}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Updated :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {moment(lead.updated).format("D MMM YYYY hh:mm A")}
                </h3>
              </div>
              <div style={style} className="flex justify-between">
                <h3 className="text-center w-full capitalize p-2 font-black">
                  Follower :
                </h3>
                <h3 className="text-center w-full capitalize p-2 ">
                  {lead.followerName}
                </h3>
              </div>
            </div>
          </div>
          <div className="px-3 my-3">
            <p>
              <span className="font-bold">Description: </span>
              <span className="text-orange-700">{lead.description}</span>
            </p>
          </div>
          <div className="px-3 my-4">
            <h2 className="text-center font-bold mb-4 border-b-2 py-3">
            All follow-up remarks show here
            </h2>
            {lead?.remarks?.map((remark) => (
              <div key={remark.id}>
               
                <div className="flex justify-between items-center px-3 border-b-2 py-3">
                  <div>
                    <h3>
                      <span className="font-bold">Status : </span>
                      {remark.status}
                    </h3>{" "}
                    <h3>
                      <span className="font-bold">Next Poke : </span>
                      {moment(remark.nextPoke).format("DD MMM YYYY")}
                    </h3>{" "}
                  </div>
                  <div className="text-center">
                    <p>{remark.desc}</p>
                    {currentUser?.role == "ADMIN" && <Button
                      onClick={()=> handleDltRemark(remark)}
                      sx={{
                        background: "#2d505a"
                      }}
                      variant="text"
                      color="error"
                    >
                      <DeleteIcon /> Delete Remark
                    </Button>}
                  </div>
                  <div className="">
                    <h3 className="capitalize ">
                      <span className="font-bold capitalize">Follower : </span>
                      {remark.follower}
                    </h3>{" "}
                    <span>
                      {moment(remark.date).format("DD MMM YYYY h:m A")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LeadPage;
