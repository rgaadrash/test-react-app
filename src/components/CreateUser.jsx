
function CreateUser({
  handleSubmit,
  form,
  idRef,
  setForm,
  nameRef,
  ageRef,
  jobRef,
  jobs,
  jobsLoading,
  loading,
  usersLoading,
  error,
  data
}) {

  console.log("handleSubmit: "+ handleSubmit);
  console.log("form: "+ form);
  console.log("idRef: "+ idRef);
  console.log("setForm: "+ setForm);
  console.log("nameRef: "+ nameRef);
  console.log("ageRef: "+ ageRef);
  console.log("jobRef: "+ jobRef);
  console.log("jobs: "+ jobs);
  console.log("jobsLoading: "+ jobsLoading);
  console.log("loading: "+ loading);
  console.log("usersLoading: "+ usersLoading);
  console.log("error: "+ error);
  console.log("data: "+ data);
  
  return (
    <>
      <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="ID"
        value={form.id}
        ref={idRef}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />
      <input
        placeholder="Name"
        value={form.name}
        ref={nameRef}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Age"
        type="number"
        value={form.age}
        ref={ageRef}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      {
        jobsLoading ? (
          <p>Loading jobs...</p>
        ) : (
          <select
            value={form.jobId}
            ref={jobRef}
            onChange={(e) => setForm({ ...form, jobId: e.target.value })}
          >
            <option value="">No job</option>
            {jobs?.jobs?.map(j => (
              <option key={j.jobId} value={j.jobId}>{j.organisation} ({j.jobId})</option>
            ))}
          </select>
        )
      }

      <button disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
      </form>
    <div style={{ marginTop: '12px' }}>
      <h3>Existing Users</h3>
      {usersLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error loading users</p>
      ) : (
        data?.users?.map((u,k) => (
          <div key={k} style={{ border: '1px solid #eee', padding: '8px', marginTop: '6px' }}>
            <strong>{u.name}</strong>
            <div>Age: {u.age} • Job: {u.job?.organisation || 'No job'}</div>
          </div>
        ))
      )}
      </div>
    </>
  );
}

export default CreateUser;
