
function CreateJob( {form, setForm, handleSubmit, loading, jobsLoading, jobs, data, error, jobIdRef, organisationRef, yearsRef} ) {
  return (
    <>
      <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Job ID"
        value={form.jobId}
        ref={jobIdRef}
        onChange={(e) => setForm({ ...form, jobId: e.target.value })}
      />
      <input
        placeholder="Organisation"
        value={form.organisation}
        ref={organisationRef}
        onChange={(e) => setForm({ ...form, organisation: e.target.value })}
      />
      <input
        placeholder="Years"
        type="number"
        value={form.years}
        ref={yearsRef}
        onChange={(e) => setForm({ ...form, years: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? "Creating..." : "Create Job"}
      </button>
      </form>
      <div style={{ marginTop: '12px' }}>
      <h3>Existing Jobs</h3>
      {jobsLoading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>Error loading jobs</p>
      ) : (
        jobs?.map(j => (
          <div key={j.jobId} style={{ border: '1px solid #eee', padding: '8px', marginTop: '6px' }}>
            <strong>{j.organisation}</strong>
            <div>Job ID: {j.jobId} • Years: {j.years}</div>
          </div>
        ))
      )}
      </div>
    </>
  );
}

export default CreateJob;
