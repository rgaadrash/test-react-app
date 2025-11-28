import { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client/index.js";
import client from "./apollo-client";

import {GET_JOBS, CREATE_JOB, CREATE_USER, GET_USERS} from "./gql-query.js";

import CreateJob from "./components/CreateJob.jsx";
import CreateUser from "./components/CreateUser.jsx";
import Toast from "./components/Toast.jsx";


function App() {
  const [tabState, setTabState] = useState("jobs");
  const [toast, setToast] = useState({ message: "", type: "" });

  function handleTabs(state) {
    setTabState(state);
  }

  function showToast(message, type = "info") {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  }

  /******************* Create Job Logic **********************/

  // CreateJOB
  const [form, setForm] = useState({
    jobId: "",
    organisation: "",
    years: ""
  });

  // refs for clearing inputs after successful creation
  const jobIdRef = useRef(null);
  const organisationRef = useRef(null);
  const yearsRef = useRef(null);

  const { data, loading: jobsLoading, error } = useQuery(GET_JOBS);

  const [createJob, { loading }] = useMutation(CREATE_JOB, {
    refetchQueries: ["GetJobs"]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createJob({
      variables: {
        jobId: form.jobId,
        organisation: form.organisation,
        years: Number(form.years)
      }
    });

    console.info("Job created");
    showToast("Job created successfully", "success");

    // reset the form state and clear the DOM inputs using refs
    setForm({ jobId: "", organisation: "", years: "" });
    if (jobIdRef.current) jobIdRef.current.value = "";
    if (organisationRef.current) organisationRef.current.value = "";
    if (yearsRef.current) yearsRef.current.value = "";
    if (jobIdRef.current) jobIdRef.current.focus();
  };

  /******************* Create User Logic **********************/
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    age: "",
    jobId: ""
  });

  // refs for clearing inputs after successful creation
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const jobRef = useRef(null);

  const [createUser, { userLoading }] = useMutation(CREATE_USER, {
    refetchQueries: ["GetUsers"]
  });

  const { data: jobs, loading: userJobsLoading } = useQuery(GET_JOBS);

  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    await createUser({
      variables: {
        id: userForm.id,
        name: userForm.name,
        age: Number(userForm.age),
        jobId: userForm.jobId || null
      }
    });

    console.info("User created");
    showToast("User created successfully", "success");

    // reset the form state and clear DOM inputs via refs
    setUserForm({ id: "", name: "", age: "", jobId: "" });
    if (idRef.current) idRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
    if (ageRef.current) ageRef.current.value = "";
    if (jobRef.current) jobRef.current.value = "";
    if (idRef.current) idRef.current.focus();
  };



  return (
    <>
      <Toast message={toast.message} type={toast.type}/>

      <div style={{ padding: "20px" }}>
        <h1>GraphQL React Test</h1>
        <ul>
          <li><button onClick={() => handleTabs('jobs')}>Jobs</button></li>
          <li><button onClick={() => handleTabs('users')}>Users</button></li>
        </ul>

        {tabState === 'jobs' && (
          /* CREATE JOB */
          <div>
            <h2>Create Job</h2>
            <div style={{ marginBottom: "30px" }}>
              <CreateJob 
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                loading={loading}
                jobsLoading={jobsLoading}
                data={data}
                error={error}
                jobs={data?.jobs}
                jobIdRef={jobIdRef}
                organisationRef={organisationRef}
                yearsRef={yearsRef}
              />
            </div>
          </div>
        )}

        {tabState === 'users' && (
          /* CREATE USER */
          <div>
            <h2>Create User</h2>
            <div style={{ marginBottom: "30px" }}>
              <CreateUser
                handleSubmit={handleSubmitUser}
                form={userForm}
                idRef={idRef}
                setForm={setUserForm}
                nameRef={nameRef}
                ageRef={ageRef}
                jobRef={jobRef}
                jobs={jobs}
                jobsLoading={userJobsLoading}
                loading={userLoading}
                usersLoading={usersLoading}
                error={usersError}
                data={usersData}
              />
            </div>
          </div>
        )}

        {/* List displays now handled by the components */}
      </div>
    </>
  );
}

export default App;
